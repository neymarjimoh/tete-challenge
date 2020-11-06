import { Router } from "express";
import validations from "../validations/todo.validation";
import validationMW from "../middlewares/validation";
// import { socialControllers } from "../controllers";
import { addTodoItem } from "../controllers/todo";

const todoRouter = Router();

/**
 * add new tasks route
 */
todoRouter.post("/new", validations.addTodoRules(), validationMW, addTodoItem);

// Test route for the socialAuthCallback
todoRouter.get("/", (req, res) => {
  res.json({ message: "Todos Found" });
});

// todoRouter.get("/facebook", socialControllers.facebookController);

export default todoRouter;
