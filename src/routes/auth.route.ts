import express from 'express';
import authController from '../controllers/auth.controller.js';
import passport from '../middlewares/jwt.middleware.js';

const authRouter = express.Router();

authRouter.post("/login", authController.login);
authRouter.post("/signup", authController.signUp);
authRouter.get("/profile", passport.authenticate('jwt', {session: false}),
    (req, res) => {
        res.status(200).json({message: "Carré VIP", user: req.user})
});

export default authRouter;