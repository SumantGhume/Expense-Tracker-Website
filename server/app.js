import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authrouter from './routes/authRouter.js';
import exp_router from './routes/expenseRouter.js';
// import "./db.js" // Adjust the path as necessary

const app = express();
dotenv.config();
app.use(cors({
  origin: "https://expense-tracker-website-uieu.onrender.com/", // or your deployed frontend URL
  credentials: true
}));
app.use(express.json());


app.use("/auth",authrouter)
app.use("/expenses", exp_router);



mongoose
  .connect(process.env.mongodbDB_URI)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`✅ Server is running on port ${process.env.PORT}`)
    );
  })
  .catch((error) => console.log(`❌ ${error} did not connect.`));

