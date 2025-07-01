import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", 
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const ExpenseModel = mongoose.models.expense || mongoose.model("expense", ExpenseSchema);
export default ExpenseModel;
