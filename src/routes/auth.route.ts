import express from 'express';
import authController from '../controllers/auth.controller.js';
import passport from '../middlewares/jwt.middleware.js';

const authRouter = express.Router();

authRouter.post("/login", authController.login);
authRouter.post("/signup", authController.signUp);

// GOOGLE PROVIDER
authRouter.get("/google", passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false
}))

authRouter.get('/google/callback', passport.authenticate('google', { 
        session: false, 
        failureRedirect: '/login-failed'
    }),
    (req, res) => {
        const user = req.user;        

        if (!user) {
            return res.status(404).json({
                message: "Connection failed!"
            })
        }

        return res.status(200).json({
            message: "Connection Succeed!",
            user: user
        })
    }
);

authRouter.get("/profile", passport.authenticate('jwt', {session: false}),
    (req, res) => {
        res.status(200).json({message: "Carré VIP", user: req.user})
});

export default authRouter;