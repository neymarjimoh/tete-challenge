import express from "express";
import path from "path";
import cors from "cors";
import morgan from "morgan";
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";
import dbConnect from "./api/config/db";
import { CustomError } from "./api/utils/customError";
import errorHandler from "./api/utils/errorHandler";
import responseHandler from "./api/utils/responseHandler";
import apiRouter from "./api/routes";

const swaggerDocument = YAML.load(
  path.join(__dirname, "api/docs/swagger.yaml")
);

// conect to database
dbConnect();

// create express app
const app = express();

// set up morgan logs for dev
app.use(morgan("dev"));

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

// router for doc
app.use(
  ["/docs", "/api/v1/docs"],
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

// router for api
app.use("/api/v1", apiRouter);

// routes not found go here
app.all("*", (req, res, next) => {
  const error = new CustomError(404, "Oops! Resource not found. Invalid URL");
  next(error);
});

// default error handler
app.use((err, req, res, next) => {
  errorHandler(err, req, res, next);
});

export default app;
