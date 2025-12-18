// Multer setup for poster upload

const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({ storage });

module.exports = upload;
