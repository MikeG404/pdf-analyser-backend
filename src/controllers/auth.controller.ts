import type { Request, Response } from "express";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
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
            isEmailAvailable = await authService.findUserByEmail(email)
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

        return res.status(201).json(new UserDTO(user));
    },

    login: async (req: Request, res: Response) => {
        const body = req.body;

        let userChecked;
        try {
            userChecked = UserModel.parse(body);
        } catch (error) {
            return res.status(400).json({ error: "Data is incorrect"})
        }

        const { email, password } = userChecked;

        let user;
        try {
            user = await authService.findUserByEmail(email);
        } catch (error) {
            return res.status(401).json({ error: "Invalid credentials"})
        }

        let verifiedPassword;
        try {
            verifiedPassword = await argon2.verify(user.password, password)
        } catch (error) {
            return res.status(500).json({ error: "Password verification failed"})
        }

        if (!verifiedPassword) {
            return res.status(401).json({ error: "Invalid credentials"})
        }

        const payload = {
            id: user.id,
            email: user.email
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 60 * 60});

        return res.status(200).json({ message: "Login succeed", token})
    }
}

export default authController;