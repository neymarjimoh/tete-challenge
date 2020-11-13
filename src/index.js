import express from "express";
import cors from "cors";
import morgan from "morgan";
import { CustomError } from "./api/utils/customError";
import errorHandler from "./api/utils/errorHandler";
import responseHandler from "./api/utils/responseHandler";
import apiRouter from "./api/routes";
import logger from "./api/config/logger";

// create express app
const app = express();

// set up morgan logs with winston
app.use(
  morgan("combined", {
    immediate: true,
    stream: logger.stream,
  })
);

// set up CORS
app.use(cors());

// include middleware to enable json body parsing and nested objects
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// base route
app.get("/", (req, res) => {
  return responseHandler(
    res,
    200,
    "Welcome to Tete Coding Challenge! Backend API"
  );
});

// router for api
app.use("/api/v1", apiRouter);

// routes not found go here
app.all("*", (req, res, next) => {
  const error = new CustomError(404, "Oops! Resource not found. Invalid URL");
  next(error);
});

// default error handler
app.use((err, req, res, next) => {
  logger.error(
    `${err.status || 500} - ${req.method} - ${err.message}  - ${
      req.originalUrl
    } - ${req.ip}`
  );
  errorHandler(err, req, res, next);
});

export default app;
