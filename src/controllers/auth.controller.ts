import type { Request, Response } from "express";
import authService from "../services/auth.service.js";

const authController = {
    signUp: async (req: Request, res: Response) => {
        const { email, password } = req.body
        
        const user = await authService.signUp(email, password);

        if (!user) {
            return res.status(500).json({ error: "Failed to create user" });
        }

        return res.status(201).json(user);
    },

    login: (req: Request, res: Response) => {        
        return res.status(200).send("Login");
    }
}

export default authController;