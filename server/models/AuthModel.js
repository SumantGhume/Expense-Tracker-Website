import mongoose from "mongoose";

const AuthSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const AuthModel = mongoose.models.user ||  mongoose.model("user", AuthSchema);

export default AuthModel;
