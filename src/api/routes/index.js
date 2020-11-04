import express from "express";
import todoRouter from "./todo";

const router = express.Router();

//route definitions
router.use("/todos", todoRouter);

export default router;
