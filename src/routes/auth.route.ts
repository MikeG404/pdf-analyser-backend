import express from 'express';
import authController from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.get("/login", authController.login);
authRouter.get("/signup", authController.signUp);

export default authRouter;