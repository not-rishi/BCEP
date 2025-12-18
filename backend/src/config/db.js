//Connect to MongoDB Atlas
const mongoose = require("mongoose");

module.exports = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("DB Error:", err);
    process.exit(1);
  }
};
