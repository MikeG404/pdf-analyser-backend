import type { Request, Response } from "express";
import argon2 from "argon2";
import authService from "../services/auth.service.js";
import UserModel from "../models/user.model.js";

const authController = {
    signUp: async (req: Request, res: Response) => {
        const body = req.body

        let userChecked;
        try {
            userChecked = UserModel.parse(body);
        } catch (error) {
            return res.status(404).json({ error: "Data is incorrect"})
        }
        
        if (!userChecked) {
            return res.status(500).json({ error: "Failed to create user" });
        }

        const { email, password} = userChecked;

        let hashPassword;
        try {
            hashPassword = await argon2.hash(password)
        } catch (error) {
            return res.status(500).json({ error: "Password Hash failed"})
        }
        
        const user = await authService.signUp(email, hashPassword);

        return res.status(201).json(user);
    },

    login: (req: Request, res: Response) => {

        return res.status(200).send("Login");
    }
}

export default authController;