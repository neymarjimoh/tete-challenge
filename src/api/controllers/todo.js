const Todo = require("../models/todo").default;
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

exports.getAllTodos = async (req, res, next) => {
  try {
    const queryOptions = {},
      sortOptions = {};
    let { page, limit, date, search, completed, sortBy } = req.query;
    let todos, totalCount;
    page = parseInt(page, 10) || 1;
    limit = parseInt(limit, 10) || 10;
    if (date) {
      const isDateValid = validateDate(date);
      if (isDateValid) {
        queryOptions["dueDate"] = new Date(date);
      } else {
        return next(
          new CustomError(422, "Invalid date format entered for filtering")
        );
      }
    }
    if (completed) {
      completed == "true"
        ? (queryOptions["completed"] = true)
        : (queryOptions["completed"] = false);
    }
    if (search)
      queryOptions["title"] = { $regex: new RegExp(search), $options: "i" };
    if (sortBy) {
      const str = sortBy.split(":");
      sortOptions[str[0]] = str[1] === "desc" ? -1 : 1;
    } else {
      sortOptions["createdAt"] = -1; // sorting defaults to this if sortBy query is absent
    }
    todos = await Todo.find(queryOptions)
      .skip((page - 1) * limit)
      .limit(limit * 1)
      .sort(sortOptions)
      .exec();
    totalCount = await Todo.countDocuments(queryOptions);
    if (totalCount === 0) {
      return res.status(404).json({
        status: "error",
        message: "No Matching task found",
      });
    }
    return res.status(200).json({
      status: "success",
      totalCount,
      todos,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
    });
  } catch (error) {
    next(new InternalServerError(error));
  }
};
