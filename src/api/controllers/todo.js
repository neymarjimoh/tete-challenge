const Todo = require("../models/todo");
const { InternalServerError, CustomError } = require("../utils/customError");
const responseHandler = require("../utils/responseHandler");
const validateDate = require("../utils/checkDate").default;

exports.addTodoItem = async (req, res, next) => {
  try {
    const { title, dueDate } = req.body;
    const isdateValid = validateDate(dueDate);
    if (!isdateValid) {
      return next(
        new CustomError(
          422,
          "Invalid date entered, Due date must be after current Date"
        )
      );
    }
    const titleExists = await Todo.findOne({ title });
    if (titleExists) {
      return next(new CustomError(409, "Task with this title already exists"));
    }
    const todo = new Todo({
      title,
      dueDate: new Date(dueDate),
    });
    const savedTodo = await todo.save();
    if (!savedTodo) {
      return next(new CustomError(400, "Todo item creation wasn't successful"));
    }
    return responseHandler(res, 201, savedTodo, "Task added successfully");
  } catch (error) {
    next(new InternalServerError(error));
  }
};

exports.getTodos = async (req, res) => {
  res.json({ msg: "done" });
};
