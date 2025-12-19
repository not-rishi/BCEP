// All authentication Routes 

const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/auth.controller");
const auth = require("../middleware/auth");

// OTP FLOW (SIGNUP)
router.post("/send-otp", ctrl.sendOtp);
router.post("/verify-otp", ctrl.verifyOtp);

// REGISTER
router.post("/register", ctrl.register);

// LOGIN
router.post("/login", ctrl.login);

// PASSWORD RESET
router.post("/forgot-password", ctrl.forgotPassword);
router.post("/verify-forgot-password", ctrl.verifyForgotPassword);
router.post("/reset-password", ctrl.resetPassword);

// PROFILE
router.get("/profile", auth, ctrl.profile);

// REGISTERED EVENTS
router.get("/registered-events", auth, ctrl.registeredEvents);

//CREATE MOD
router.post("/create-mod", ctrl.createModerator);

module.exports = router;
