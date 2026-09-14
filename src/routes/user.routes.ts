import express from "express";
import { registerUser } from "../controller/user.controller";

export const userRouter = express.Router();
userRouter.post("/", registerUser);
