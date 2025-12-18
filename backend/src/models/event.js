// Database model for events
// 11 attributes per event
const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  club: { type: String, required: true },
  tags: [{ type: String }],
  posterUrl: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  registeredStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
  venue: { type: String, required: true },
  deadline: { type: Date, required: true },
  eventDateTime: { type: Date, required: true }
});

module.exports = mongoose.model("Event", EventSchema);
