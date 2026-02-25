import "dotenv/config";
import express from "express";
import { drizzle } from "drizzle-orm/node-postgres";

import authRouter from "./routes/auth.route.js";
import authService from "./services/auth.service.js";

const app = express();

const PORT = process.env.PORT;

export const db = drizzle({
    connection: {
        connectionString: process.env.DATABASE_URL!,
        ssl: false
    }
})

app.use("/api/auth", authRouter);

authService.signUp("Mike", "Passowrd")

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
})