const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const eventRoutes = require("./routes/event.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();
app.use(cors());
app.use(express.json());

connectDB(); //MongoDB

app.use("/auth", authRoutes);
app.use("/events", eventRoutes);


app.get("/", (req, res) => res.send("Backend is running"));

const startScheduler = require("./utils/scheduler");
startScheduler();

module.exports = app;
