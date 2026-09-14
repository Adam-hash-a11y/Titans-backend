import { UserModel } from "../model/user.model";
import { IUser } from "../types/user.types";

export const findUserByEmail = async (email: string) => {
  return await UserModel.findOne({ email });
};

export const createUser = async (userData: IUser) => {
  try {
    const user = new UserModel(userData);
    return await user.save();
  } catch (error) {
    throw new Error("Error saving user", { cause: error });
  }
};
