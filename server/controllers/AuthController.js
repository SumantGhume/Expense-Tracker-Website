import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AuthModel from "../models/AuthModel.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await AuthModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new AuthModel({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

//Login
export const Login = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  try {
    const oldUser = await AuthModel.findOne({ email });
    if (!oldUser) {
      return res.status(404).json({ message: "User doesn't exist." });
    }

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Credentials." });
    }

    const token = jwt.sign(
      { email: oldUser.email, id: oldUser._id },
      process.env.SECRET_KEY,
      {expiresIn: "1h",}
    );

    res.status(201).json({ result: oldUser, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error at controller SignIn" });
  }
};
