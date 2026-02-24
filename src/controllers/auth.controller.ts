import type { Request, Response } from "express";

const authController = {
    login: (req: Request, res: Response) => {
        return res.status(200).send("Login");
    },
    signUp: (req: Request, res: Response) => {        
        return res.status(200).send("Signup");
    }
}

export default authController;