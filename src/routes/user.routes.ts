import express from "express";
import { registerUser } from "../controller/user.controller";
import { validateRegisterUser } from "../middleware/user.middleware";

export const userRouter = express.Router();
userRouter.post("/", validateRegisterUser, registerUser);
