import { body } from "express-validator";
// import { Todo } from "../models/";

const addTodoRules = () => {
  return [
    body("title")
      .notEmpty()
      .withMessage("Todo title is required")
      .trim()
      .isLength({ min: 4 })
      .withMessage("Todo title must have a minimum of 4 characters"),
    body("dueDate")
      .notEmpty()
      .trim()
      .withMessage("Todo's due date is required")
      .isDate()
      .withMessage("Due date must be valid"),
  ];
};

const mealValidation = () => {
  return [
    body("meal_name")
      .trim()
      .isString()
      .not()
      .isEmpty()
      .withMessage("Meal Name is required"),
    body("description")
      .trim()
      .isString()
      .not()
      .isEmpty()
      .withMessage("Description is required"),
    body("price").notEmpty().withMessage("Price is required"),
    body("option1").trim().isNumeric(),
    body("option2").trim().isString(),
    body("image1_url").isString(),
    body("image2_url").isString(),
  ];
};

export default {
  mealValidation,
  addTodoRules,
};
