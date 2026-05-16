const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const routes = require("./routes/index");
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

// Security & Parsing
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Routes
app.use("/api/v1", routes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Portfolio API is running" });
});

// Global Error Handler
app.use(errorMiddleware);

module.exports = app;