import { body, check } from "express-validator";
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

const sortBy = ["title", "createdAt", "dueDate"];

const getTodosRules = () => {
  return [
    check("completed")
      .optional()
      .isIn(["true", "false"])
      .withMessage("Filtering by completed is either true or false"),
    check("sortBy")
      .optional()
      .custom((val) => {
        if (!sortBy.includes(val.split(":")[0]))
          // ?sortBy=title:desc ?sortBy=createdAt:asc etc..
          throw new Error("Sorting can only be by title, dueDate or createdAt");
        return true;
      }),
  ];
};

export default {
  getTodosRules,
  addTodoRules,
};
