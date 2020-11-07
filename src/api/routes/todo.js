import { Router } from "express";
import validations from "../validations/todo.validation";
import { validationMW, checkTodoId } from "../middlewares/validation";
// import { socialControllers } from "../controllers";
import { addTodoItem, getAllTodos, updateTodo } from "../controllers/todo";

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

export default todoRouter;
