import "dotenv/config";
import express from "express";
import { drizzle } from "drizzle-orm/node-postgres";

import authRouter from "./routes/auth.route.js";

const app = express();

const PORT = process.env.PORT;

const db = drizzle({
    connection: {
        connectionString: process.env.DATABASE_URL!,
        ssl: true
    }
})

app.use("/api/auth", authRouter);

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
})