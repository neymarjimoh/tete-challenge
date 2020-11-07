import { Router } from "express";
import validations from "../validations/todo.validation";
import { validationMW, checkTodoId } from "../middlewares/validation";
import {
  addTodoItem,
  getAllTodos,
  updateTodo,
  deleteTodo,
} from "../controllers/todo";

const todoRouter = Router();

/**
 * add new tasks route
 */
todoRouter.post("/new", validations.addTodoRules(), validationMW, addTodoItem);

/**
 * get a list of all items route
 */
todoRouter.get("/", validations.getTodosRules(), validationMW, getAllTodos);

/**
 * update todo item's completed or dueDate field
 */
todoRouter.patch(
  "/update/:todoId",
  checkTodoId,
  validations.updateTodoRules(),
  validationMW,
  updateTodo
);

/**
 * delete todo item
 */
todoRouter.delete("/delete/:todoId", checkTodoId, deleteTodo);

export default todoRouter;
