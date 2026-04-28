const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");

const connectDB = require("./config/db");
const requestLogger = require("./middleware/requestLogger");
const errorHandler = require("./middleware/errorHandler");
const authRoutes = require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");

// connect to database
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(
  helmet({
    contentSecurityPolicy: false, // disabled during dev
  }),
);

app.use(requestLogger);

// routes
app.get("/", (req, res) => {
  res.send("App  working");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);

// Error handler
app.use(errorHandler);
// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});
// Globar error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`APP RUNNING ON PORT ${process.env.PORT}`);
});
