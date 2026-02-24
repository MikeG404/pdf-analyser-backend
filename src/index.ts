import express from "express";
import type { Request, Response } from "express";

import "dotenv/config";
import authRouter from "./routes/auth.route.js";

const app = express();

const PORT = process.env.PORT;

app.use("/api/auth", authRouter);

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
})