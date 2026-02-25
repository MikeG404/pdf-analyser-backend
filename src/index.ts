import "dotenv/config";
import express from "express";
import morgan from "morgan";
import { drizzle } from "drizzle-orm/node-postgres";

import authRouter from "./routes/auth.route.js";

const app = express();

const PORT = process.env.PORT;

export const db = drizzle({
    connection: {
        connectionString: process.env.DATABASE_URL!,
        ssl: false
    }
})

app.use(express.json());
app.use(morgan('dev'));

app.use("/api/auth", authRouter);

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
})