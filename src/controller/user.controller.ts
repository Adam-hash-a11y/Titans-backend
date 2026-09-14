import { Request, Response } from "express";
import { IUser } from "../types/user.types";
import { registerUserService } from "../service/userService";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const result = await registerUserService(req.body as IUser);
    return res.status(201).json({ user: result });
  } catch (error) {
    return res.status(409).json({ message: (error as Error).message });
  }
};
