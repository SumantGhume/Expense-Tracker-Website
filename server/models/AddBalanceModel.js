import mongoose from "mongoose";

const BalanceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  balance: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const BalanceModel = mongoose.models.balance || mongoose.model("balance", BalanceSchema);
export default BalanceModel;
