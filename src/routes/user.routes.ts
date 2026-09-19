import express from "express";
import { registerUser } from "../controller/user.controller";
import { validateRegisterUser } from "../middleware/user.middleware";
import { uploadImage } from "../middleware/imageUpload.middleware";

export const userRouter = express.Router();

userRouter.post("/", uploadImage, validateRegisterUser, registerUser);
