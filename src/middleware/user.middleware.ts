import { Request, Response, NextFunction } from "express";
import {
  isValidUserBody,
  isValidName,
  isValidEmail,
  isValidPhoneNumber,
  isValidBirthDate,
  isValidGender,
  isValidProfileImage,
  isValidMembershipPlan,
} from "../validator/user.validator";
import { IUser } from "../types/user.types";

export const validateRegisterUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!isValidUserBody(req.body)) {
    return res.status(400).json({ message: "invalid or missing fields" });
  }

  const user = req.body as IUser;

  if (!isValidName(user.firstName) || !isValidName(user.lastName)) {
    return res.status(400).json({
      message:
        "first name and last name must be alphabetic and longer than 2 characters",
    });
  }

  if (!isValidEmail(user.email)) {
    return res
      .status(400)
      .json({ message: "email must be a valid email address" });
  }

  if (!isValidPhoneNumber(user.phoneNumber)) {
    return res
      .status(400)
      .json({ message: "phone number must be a valid phone number" });
  }

  if (!isValidBirthDate(user.birthDate)) {
    return res
      .status(400)
      .json({ message: "user must be at least 16 years old" });
  }

  if (!isValidGender(user.gender)) {
    return res
      .status(400)
      .json({ message: "gender must be male, female or other" });
  }

  if (!isValidProfileImage(user.profileImage)) {
    return res.status(400).json({ message: "profile image is required" });
  }

  if (!isValidMembershipPlan(user.membershipPlan)) {
    return res
      .status(400)
      .json({ message: "membership plan must be basic, standard or premium" });
  }

  next();
};
