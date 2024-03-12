import { Router } from "express";
import { createUser, signIn,logOut } from "../controllers/user-controller";
import { authenticateToken } from "../middlewares/auth-middleware";

export const userRouter = Router();
userRouter
    .post("/", createUser)
    .post("/login", signIn)
    .delete("/", authenticateToken, logOut)
