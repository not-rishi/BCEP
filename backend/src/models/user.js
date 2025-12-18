// Database Model for User
// Using Bycrypt for password hashing

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ["student", "moderator"], default: "student" },

  usn: {
    type: String,
    required: function () {
      return this.role === "student";
    },
    unique: true,
    sparse: true, 
  },

  passwordHash: { type: String, required: true },
  verified: { type: Boolean, default: false },

  otp: { type: String },
  otpExpires: { type: Date },

  createdAt: { type: Date, default: Date.now },
});

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.passwordHash);
};

UserSchema.pre("save", async function (next) {
  if (!this.isModified("passwordHash")) return next();
  this.passwordHash = await bcrypt.hash(this.passwordHash, 10);
  next();
});

module.exports = mongoose.model("User", UserSchema);
