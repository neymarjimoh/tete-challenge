import express from "express";
// import { socialControllers } from "../controllers";

const todoRouter = express.Router();

// Test route for the socialAuthCallback
todoRouter.get("/", (req, res) => {
  res.json({ message: "Todos Found" });
});

/**
 * Authenticate with Facebook route. This would be changed
 */
// todoRouter.get("/facebook", socialControllers.facebookController);

export default todoRouter;
