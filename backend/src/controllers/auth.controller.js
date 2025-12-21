// Auth routes logic 

const User = require("../models/user");
const Event = require("../models/event");
const sendEmail = require("../utils/sendEmail");
const checkEmailRateLimit = require("../utils/emailRateLimit");
const jwt = require("jsonwebtoken");
const { otpTemplate, resetOtpTemplate } = require("../utils/emailTemplates");

function genOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const BRANCH_MAP = {
  CS: "Computer Science and Engineering",
  IS: "Information Science and Engineering",
  EC: "Electronics and Communication Engineering",
  CI: "Computer Science (AIML)",
  AI: "Artificial Intelligence and Machine Learning (AIML)",
  CD: "Computer Science Data Science",
  AD: "Artificial Intelligence and Data Science (AIDS)",
  IC: "Computer Science (IOT and Cybersecurity)",
  CY: "Computer Science & Engineering (Cyber Security)",
  BT: "Biotechnology",
  ME: "Mechanical Engineering",
  AE: "Aerospace Engineering",
  EE: "Electrical and Electronics Engineering",
  CV: "Civil Engineering",
  CH: "Chemical Engineering",
  RI: "Robotics and Artificial Intelligence",
  VD: "Electronics Engineering (VLSI Design & Technology)",
  ET: "Electronics and Telecommunication Engineering",
  EI: "Electronics and Instrumentation Engineering",
  CB: "Computer Science and Business System (CSBS)",
  CG: "Computer Science & Design",
  MD: "Medical Electronics Engineering",
  AU: "Automobile Engineering",
  IM: "Industrial Engineering & Management",
};

const tempOtp = {};

exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ msg: "Missing email" });

    checkEmailRateLimit(email); 

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ msg: "Email already registered" });

    const otp = genOtp();
    tempOtp[email] = { otp, expires: Date.now() + 15 * 60 * 1000 };

    await sendEmail(email, "Your OTP for Verification", otpTemplate(otp), true);

    res.json({ msg: "OTP sent to email" });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ msg: err.message });
  }
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  const entry = tempOtp[email];
  if (!entry) return res.status(400).json({ msg: "OTP not found" });

  if (Date.now() > entry.expires)
    return res.status(400).json({ msg: "OTP expired" });

  if (entry.otp !== otp) return res.status(400).json({ msg: "Invalid OTP" });

  res.json({ msg: "OTP verified" });
};

exports.register = async (req, res) => {
  const { name, email, password, usn } = req.body;

  if (!name || !email || !password || !usn)
    return res.status(400).json({ msg: "Missing fields" });

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ msg: "Email already registered" });

  const user = new User({
    name,
    email,
    usn,
    role: "student",
    passwordHash: password,
    verified: true,
  });

  await user.save();

  res.json({ msg: "Account created" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: "Invalid credentials" });

  const ok = await user.comparePassword(password);
  if (!ok) return res.status(400).json({ msg: "Invalid credentials" });

  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({
    token,
    user: { name: user.name, email: user.email, role: user.role },
  });
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ msg: "Missing email" });
    checkEmailRateLimit(email);
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const otp = genOtp();
    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 15 * 60 * 1000);
    await user.save();

    await sendEmail(email, "Password Reset OTP", resetOtpTemplate(otp), true);

    res.json({ msg: "OTP sent to email" });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ msg: err.message });
  }
};

exports.verifyForgotPassword = async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: "User not found" });

  if (user.otp !== otp || user.otpExpires < new Date())
    return res.status(400).json({ msg: "Invalid or expired OTP" });

  res.json({ msg: "OTP verified" });
};

exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: "User not found" });

  if (user.otp !== otp || user.otpExpires < new Date())
    return res.status(400).json({ msg: "Invalid or expired OTP" });

  user.passwordHash = newPassword;
  user.otp = undefined;
  user.otpExpires = undefined;

  await user.save();

  res.json({ msg: "Password reset successful" });
};

exports.profile = async (req, res) => {
  const user = await User.findById(req.userId);

  if (!user) return res.status(404).json({ msg: "User not found" });

  const code = user.usn?.substring(5, 7)?.toUpperCase();
  const branchFull = BRANCH_MAP[code] || "Unknown Branch";

  res.json({
    name: user.name,
    email: user.email,
    usn: user.usn,
    branchFull,
  });
};

exports.registeredEvents = async (req, res) => {
  const events = await Event.find({
    registeredStudents: req.userId,
  }).select("title deadline venue eventDateTime");

  res.json(events);
};

exports.createModerator = async (req, res) => {
  const { name, email, password, adminSecret } = req.body;

  if (!name || !email || !password || !adminSecret)
    return res.status(400).json({ msg: "Missing fields" });

  if (adminSecret !== "rishi_is_so_cool") {
    return res.status(403).json({ msg: "Invalid Admin Secret" });
  }

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ msg: "Email already registered" });

  const user = new User({
    name,
    email,
    usn: "MOD-" + Date.now(),
    role: "moderator",
    passwordHash: password,
    verified: true,
  });

  await user.save();

  res.json({ msg: "Moderator created successfully!" });
};
