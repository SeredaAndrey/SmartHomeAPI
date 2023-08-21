const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const { adminRouter } = require("./routes/adminRoute");
const { userRouter } = require("./routes/userRoute");

const { errorHandler } = require("./middleware/errorHandler");

require("dotenv").config();

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/admin", adminRouter);
app.use("/user", userRouter);

app.use(errorHandler);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
