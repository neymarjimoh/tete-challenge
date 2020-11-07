import mongoose from "mongoose";
import { validationResult } from "express-validator";
import { CustomError } from "../utils/customError";

const {
  Types: { ObjectId },
} = mongoose;

export const validationMW = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const errorsArray = [];
  errors.array().map((error) => errorsArray.push({ [error.param]: error.msg }));

  return next(
    new CustomError(
      422,
      "Validation error(s): Check the following fields",
      errorsArray
    )
  );
};

export const checkTodoId = (req, res, next) => {
  const { todoId } = req.params;
  // check if the mongoose id is valid or not
  const isValidId =
    ObjectId.isValid(todoId) && new ObjectId(todoId).toString() === todoId;
  if (isValidId) {
    return next();
  } else {
    return next(new CustomError(422, "Invalid Todo ID entered!!"));
  }
};
