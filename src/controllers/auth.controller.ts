import type { Request, Response } from "express";
import argon2 from "argon2";
import authService from "../services/auth.service.js";
import UserModel from "../models/user.model.js";
import UserDTO from "../dto/user.dto.js";

const authController = {
    signUp: async (req: Request, res: Response) => {
        const body = req.body

        let userChecked;
        try {
            userChecked = UserModel.parse(body);
        } catch (error) {
            return res.status(400).json({ error: "Data is incorrect"})
        }
        
        const { email, password} = userChecked;

        let isEmailAvailable;
        try {
            isEmailAvailable = await authService.isEmailAvailable(email)
        } catch (error) {
            return res.status(500).json({ error: "Failed to verify user"})
        }

        if (isEmailAvailable) {
            return res.status(409).json({ error: "User already exist"})
        }

        let hashPassword;
        try {
            hashPassword = await argon2.hash(password)
        } catch (error) {
            return res.status(500).json({ error: "Password Hash failed"})
        }

        let user;
        try {
            user = await authService.signUp(email, hashPassword);
        } catch (error) {
            return res.status(500).json({ error: "Failed to create user"})
        }

        return res.status(201).json(new UserDTO(user[0]));
    },

    login: (req: Request, res: Response) => {

        return res.status(200).send("Login");
    }
}

export default authController;