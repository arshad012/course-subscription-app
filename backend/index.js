import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import { authRouter, courseRouter, subscriptionRouter } from "./routes/index.js";

dotenv.config();
const port = process.env.PORT;
const mongoDbUri = process.env.MONGODB_URI;

const app = express();
app.use(cors());
app.use(json());

app.get("/", (_, res) => {
    return res.status(200).json({ message: "App is up."});
});

mongoose.connect(mongoDbUri)
.then(() => {
    console.log("Database connected");
})
.catch((err) => {
    console.log("Database connection failed:", err);
});

app.use("/auth", authRouter);
app.use("/api", courseRouter);
app.use("/api", subscriptionRouter);

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});