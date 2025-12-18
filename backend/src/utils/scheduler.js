// Scheduler for CRON events and event expiry

const cron = require("node-cron");
const Event = require("../models/event");
const User = require("../models/user");
const makeCsv = require("./createCsv");
const sendEmail = require("./sendEmail");

function startScheduler() {
  // runs every minute
  cron.schedule("* * * * *", async () => {
    const now = new Date();

    const events = await Event.find({
      status: "open",
      deadline: { $lte: now },
    }).populate("registeredStudents", "name email");

    for (const ev of events) {
      const moderator = await User.findById(ev.createdBy);
      const students = ev.registeredStudents;

      const { filepath } = await makeCsv(students);

      const html = deadlineReachedTemplate(ev.title);
      await sendEmail(
        moderator.email,
        `Event Deadline Reached – ${ev.title}`,
        html,
        true,
        [{ filename: `${ev.title}.csv`, path: filepath }]
      );

      ev.status = "closed";
      ev.closedAt = new Date();
      await ev.save();
    }
  });
}

module.exports = startScheduler;
