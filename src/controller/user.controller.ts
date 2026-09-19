import fs from "node:fs/promises";
import path from "node:path";
import { Request, Response } from "express";
import { registerUserService } from "../service/userService";
import { IUser } from "../types/user.types";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const filename = `${Date.now()}--${req.file!.originalname}`;

    const user = {
      ...req.body,
      profileImage: filename,
    } as IUser;

    const result = await registerUserService(user);

    const uploadDir = "./uploads";

    await fs.mkdir(uploadDir, { recursive: true });

    await fs.writeFile(path.join(uploadDir, filename), req.file!.buffer);

    return res.status(201).json({ user: result });
  } catch (error) {
    return res.status(409).json({ message: (error as Error).message });
  }
};
