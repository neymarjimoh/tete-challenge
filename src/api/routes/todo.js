import { Router } from "express";
import validations from "../validations/todo.validation";
import validationMW from "../middlewares/validation";
// import { socialControllers } from "../controllers";
import { addTodoItem, getAllTodos } from "../controllers/todo";

const todoRouter = Router();

/**
 * add new tasks route
 */
todoRouter.post("/new", validations.addTodoRules(), validationMW, addTodoItem);

/**
 * get a list of all items route
 */
todoRouter.get("/", validations.getTodosRules(), validationMW, getAllTodos);

export default todoRouter;
