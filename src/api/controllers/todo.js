import Todo from "../models/todo";
import { InternalServerError, CustomError } from "../utils/customError";
import responseHandler from "../utils/responseHandler";
import validateDate from "../utils/checkDate";
import isEmpty from "../utils/isEmpty";

export async function addTodoItem(req, res, next) {
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
}

export async function getAllTodos(req, res, next) {
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
}

export async function updateTodo(req, res, next) {
  try {
    const { todoId } = req.params;
    const { dueDate, completed } = req.body;
    const updatedFields = {};
    if (dueDate) {
      const isDateValid = validateDate(dueDate);
      if (isDateValid) {
        updatedFields["dueDate"] = new Date(dueDate);
      } else {
        return next(
          new CustomError(422, "Invalid date format entered for updating")
        );
      }
    }
    if (completed) {
      completed == true
        ? (updatedFields["completed"] = true)
        : (updatedFields["completed"] = false);
    }
    if (isEmpty(req.body)) {
      return next(new CustomError(422, "No changes/updates made yet."));
    }
    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      {
        $set: updatedFields,
      },
      { new: true }
    );
    if (!updatedTodo) {
      return next(
        new CustomError(
          404,
          "Todo with the ID doesn't exist or has been deleted"
        )
      );
    }
    return responseHandler(res, 200, updatedTodo, "Task updated successfully");
  } catch (error) {
    next(new InternalServerError(error));
  }
}

export async function deleteTodo(req, res, next) {
  const { todoId } = req.params;
  try {
    const todo = await Todo.findByIdAndDelete(todoId);
    if (!todo) {
      return next(
        new CustomError(
          404,
          "Todo with the ID doesn't exist or has already been deleted"
        )
      );
    }
    return responseHandler(res, 200, todo, "Todo item deleted successfully");
  } catch (error) {
    next(new InternalServerError(error));
  }
}
