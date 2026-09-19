import { findUserByEmail, createUser } from "../repository/user.repository";
import { IUser } from "../types/user.types";

export const registerUserService = async (user: IUser) => {
  const isExistingUser = await findUserByEmail(user.email);

  if (isExistingUser) {
    throw new Error("User already exists");
  }

  return await createUser(user);
};
