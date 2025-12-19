// Added all event related routes

const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { requireModerator, requireStudent } = require("../middleware/role");
const upload = require("../middleware/upload");
const event = require("../controllers/event.controller");

// Moderator specific event retrieval
router.get(
  "/moderator/my-events",
  auth,
  requireModerator,
  event.getModeratorEvents
);

// Event Creation
router.post(
  "/create",
  auth,
  requireModerator,
  upload.single("poster"),
  event.createEvent
);

// Get all events for display/check
router.get("/all", event.getAllEvents);

// Get single event 
router.get("/:id", event.getEventById);
router.get("/:id/status", auth, event.checkRegistrationStatus);

// Register for event
router.post("/:id/register", auth, requireStudent, event.registerForEvent);

// Moderator – registrations list
router.get(
  "/:id/registrations",
  auth,
  requireModerator,
  event.getRegistrations
);

// Moderator – export CSV
router.get("/:id/export", auth, requireModerator, event.exportRegistrations);

// Moderator – send email
router.get("/:id/send-mail", auth, requireModerator, event.manualEmail);

// Unregister from event 
router.delete(
  "/:id/unregister",
  auth,
  requireStudent,
  event.unregisterFromEvent
);

//Delete the event
router.delete("/:id", auth, requireModerator, event.deleteEvent);

module.exports = router;
