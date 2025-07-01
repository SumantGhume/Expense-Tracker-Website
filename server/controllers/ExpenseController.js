// server/controllers/addExpense.js
import ExpenseModel from "../models/AddExpenseModel.js";
import BalanceModel from "../models/AddBalanceModel.js";

export const addExpense = async (req, res) => {
  const { userId, amount, type, category, date, description } = req.body;

  try {
    const newExpense = new ExpenseModel({
      userId,
      amount,
      type,
      category,
      date,
      description,
    });

    await newExpense.save();
    res.status(201).json({ message: "Transaction added", data: newExpense });
  } catch (error) {
    console.error("Add expense error:", error);
    res.status(500).json({ message: "Error adding transaction", error: error.message });
  }
};

export const showExpense = async (req, res) => {
  const { userId } = req.params;

  try {
    if (!userId) {
      return res.status(400).json({ message: "User ID is missing in request" });
    }

    const expenses = await ExpenseModel.find({ userId }).sort({ date: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    console.error("Error fetching expenses:", error.message);
    res.status(500).json({ message: "Error fetching expenses" });
  }
};

export const addBalance = async (req, res) => {
  const { userId, balance } = req.body;

  try {
    if (!userId || !balance) {
      return res.status(400).json({ message: "userId and balance are required" });
    }

    const newBalance = new BalanceModel({ userId, balance });
    await newBalance.save();

    res.status(201).json({ message: "Balance added successfully", data: newBalance });
  } catch (error) {
    console.error("Add balance error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await ExpenseModel.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const updateExpense = async (req, res) => {
  const { id } = req.params;
  const { amount, type, category, date, description } = req.body;

  try {
    const updatedExpense = await ExpenseModel.findByIdAndUpdate(
      id,
      { amount, type, category, date, description },
      { new: true, runValidators: true }
    );

    if (!updatedExpense) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({ message: "Transaction updated", data: updatedExpense });
  } catch (error) {
    console.error("Error updating transaction:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};