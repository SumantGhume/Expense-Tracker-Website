// server/routes/expenseRoutes.js
import express from "express";
import { addExpense, showExpense, deleteExpense,updateExpense } from "../controllers/ExpenseController.js";

const exp_router = express.Router();


exp_router.post("/add", addExpense);
exp_router.get("/show/:userId", showExpense);
exp_router.delete("/delete/:id", deleteExpense);
exp_router.put("/edit/:id", updateExpense);

export default exp_router;
