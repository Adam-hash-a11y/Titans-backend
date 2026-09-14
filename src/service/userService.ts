import { findUserByEmail, createUser } from "../repository/user.repository";
import { IUser } from "../types/user.types";

export const registerUserService = async (user: IUser) => {
  try {
    const isExistingUser = await findUserByEmail(user.email);
    if (isExistingUser) {
      throw new Error("User already exists");
    }
    return await createUser(user);
  } catch (error) {
    throw new Error("Error registering user", { cause: error });
  }
};
