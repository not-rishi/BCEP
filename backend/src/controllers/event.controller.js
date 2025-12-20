// all event routes logic here

const Event = require("../models/event");
const cloudinary = require("../config/cloudinary");
const {
  registrationSuccessTemplate,
  moderatorCSVTemplate,
  deadlineReachedTemplate,
  registrationCancelledTemplate,
} = require("../utils/emailTemplates");

const makeCsv = require("../utils/createCsv");
const sendEmail = require("../utils/sendEmail");
const User = require("../models/user");
const branchMap = require("../utils/branchMap");

exports.createEvent = async (req, res) => {
  const { title, description, club, tags, deadline, venue, eventDateTime } =
    req.body;

  if (!title || !description || !club || !deadline || !venue || !eventDateTime)
    return res.status(400).json({ msg: "Missing fields" });

  let posterUrl = null;

  if (req.file) {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "event_posters" },
      async (error, result) => {
        if (error) return res.status(500).json({ msg: "Upload error" });

        posterUrl = result.secure_url;

        const event = await Event.create({
          title,
          description,
          club,
          tags: tags ? tags.split(",") : [],
          posterUrl,
          createdBy: req.user.id,
          deadline,
          venue,
          eventDateTime,
        });

        return res.json(event);
      }
    );

    stream.end(req.file.buffer);
  } else {
    const event = await Event.create({
      title,
      description,
      club,
      tags: tags ? tags.split(",") : [],
      createdBy: req.user.id,
      deadline,
      eventDateTime,
    });

    res.json(event);
  }
};

exports.registerForEvent = async (req, res) => {
  const eventId = req.params.id;

  const event = await Event.findById(eventId);
  if (!event) return res.status(404).json({ msg: "Event not found" });

  if (event.registeredStudents.includes(req.user.id))
    return res.status(400).json({ msg: "Already registered" });

  event.registeredStudents.push(req.user.id);
  await event.save();

  const html = registrationSuccessTemplate(
    event.title,
    event.club,
    event.posterUrl,
    event.venue,
    event.deadline,
    event.eventDateTime
  );

  sendEmail(
    req.user.email,
    `Registration Confirmed – ${event.title}`,
    html,
    true
  ).catch((err) => console.log("Background email error:", err));

  return res.json({ msg: "Registered successfully!" });
};

exports.getAllEvents = async (req, res) => {
  const events = await Event.find().sort({ createdAt: -1 });
  res.json(events);
};

exports.getRegistrations = async (req, res) => {
  const eventId = req.params.id;

  const event = await Event.findById(eventId).populate(
    "registeredStudents",
    "name email usn"
  );

  if (!event) return res.status(404).json({ msg: "Event not found" });

  if (event.createdBy.toString() !== req.user.id.toString())
    return res.status(403).json({ msg: "Not your event" });

  const data = event.registeredStudents.map((student) => {
    const code = student.usn ? student.usn.substring(5, 7).toUpperCase() : null;

    return {
      name: student.name,
      email: student.email,
      usn: student.usn || "-",
      branch: branchMap[code] || "Unknown Branch",
    };
  });

  res.json(data);
};

const { format } = require("@fast-csv/format");

exports.exportRegistrations = async (req, res) => {
  const eventId = req.params.id;

  const event = await Event.findById(eventId).populate(
    "registeredStudents",
    "name email usn"
  );

  if (!event) return res.status(404).json({ msg: "Event not found" });

  if (event.createdBy.toString() !== req.user.id.toString())
    return res.status(403).json({ msg: "Not your event" });

  res.setHeader("Content-Type", "text/csv");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${event.title}-registrations.csv"`
  );

  const csvStream = format({ headers: true });
  csvStream.pipe(res);

  event.registeredStudents.forEach((s) => {
    const code = s.usn ? s.usn.substring(5, 7).toUpperCase() : null;

    csvStream.write({
      name: s.name,
      email: s.email,
      usn: s.usn || "-",
      branch: branchMap[code] || "Unknown Branch",
    });
  });

  csvStream.end();
};

exports.manualEmail = async (req, res) => {
  const event = await Event.findById(req.params.id).populate(
    "registeredStudents",
    "name email usn"
  );

  if (!event) return res.status(404).json({ msg: "Event not found" });
  if (event.createdBy.toString() !== req.user.id.toString())
    return res.status(403).json({ msg: "Not your event" });

  const moderator = await User.findById(req.user.id);

  const formattedStudents = event.registeredStudents.map((s) => {
    const code = s.usn ? s.usn.substring(5, 7).toUpperCase() : null;
    return {
      name: s.name,
      email: s.email,
      usn: s.usn || "-",
      branch: branchMap[code] || "Unknown Branch",
    };
  });

  const { buffer, filename } = await makeCsv(formattedStudents);

  const html = moderatorCSVTemplate(event.title);

  await sendEmail(
    moderator.email,
    `Registered Students – ${event.title}`,
    html,
    true,
    [
      {
        filename: filename, 
        content: buffer,    
      },
    ]
  );

  res.json({ msg: "Email sent to moderator" });
};


exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ msg: "Event not found" });

    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.getModeratorEvents = async (req, res) => {
  try {
    const events = await Event.find({ createdBy: req.user.id }).sort({
      createdAt: -1,
    });

    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.checkRegistrationStatus = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ msg: "Event not found" });

    const isRegistered = event.registeredStudents.includes(req.user.id);

    res.json({ isRegistered });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.unregisterFromEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ msg: "Event not found" });

    if (!event.registeredStudents.includes(req.user.id)) {
      return res
        .status(400)
        .json({ msg: "You are not registered for this event" });
    }

    event.registeredStudents.pull(req.user.id);
    await event.save();

    const html = registrationCancelledTemplate(event.title);
    await sendEmail(
      req.user.email,
      `Registration Cancelled – ${event.title}`,
      html,
      true
    );

    res.json({ msg: "Successfully unregistered" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

const { eventDeletionTemplate } = require("../utils/emailTemplates");

exports.deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;

    const event = await Event.findById(eventId).populate("registeredStudents");

    if (!event) return res.status(404).json({ msg: "Event not found" });

    if (event.createdBy.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ msg: "Not authorized to delete this event" });
    }

    const studentEmails = event.registeredStudents.map((s) => s.email);
    const html = eventDeletionTemplate(event.title, event.club);

    if (studentEmails.length > 0) {
      const emailPromises = studentEmails.map((email) =>
        sendEmail(email, `Event Cancelled - ${event.title}`, html, true)
      );
      await Promise.all(emailPromises);
    }

    await sendEmail(
      req.user.email,
      `Deletion Confirmed - ${event.title}`,
      `<p>You have successfully deleted the event <b>${event.title}</b>. All registered students have been notified.</p>`,
      true
    );

    await Event.findByIdAndDelete(eventId);

    res.json({ msg: "Event deleted and participants notified." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error during deletion" });
  }
};

