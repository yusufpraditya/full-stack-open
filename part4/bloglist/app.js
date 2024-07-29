const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("./utils/logger");
const blogRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const mongoose = require("mongoose");
const { MONGODB_URI } = require("./utils/config");
const middleware = require("./utils/middleware");
require("dotenv").config();

logger.info("connecting to MongoDB");

mongoose.set("strictQuery", false);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("database connection error:", error.message);
  });

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV !== "test") app.use(middleware.requestLogger);

app.use(middleware.tokenExtractor);

app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
