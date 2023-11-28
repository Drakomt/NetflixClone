import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRouter from "./Routes/authRouter.js";
import contentRouter from "./Routes/contentRouter.js";
import seedRouter from "./Routes/seedRouter.js";
import userRouter from "./Routes/userRouter.js";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use("/api/auth", authRouter);
app.use("/api/content", contentRouter);
app.use("/api/seed", seedRouter);
app.use("/api/users", userRouter);

mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
