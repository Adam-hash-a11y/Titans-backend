import validator from "validator";
import { IUser } from "../types/user.types";

export const isValidName = (name: string): boolean => {
  if (typeof name !== "string") return false;
  if (!validator.isAlpha(name, "en-US", { ignore: " " })) return false;
  if (name.length <= 2) return false;
  return true;
};

export const isValidEmail = (email: string): boolean => {
  if (typeof email !== "string") return false;
  return validator.isEmail(email);
};

export const isValidPhoneNumber = (phoneNumber: string): boolean => {
  if (typeof phoneNumber !== "string") return false;
  return validator.isMobilePhone(phoneNumber, "any");
};

export const isValidBirthDate = (birthDate: Date): boolean => {
  if (!birthDate) return false;

  const date = new Date(birthDate);
  if (Number.isNaN(date.getTime())) return false;

  const today = new Date();
  let age = today.getFullYear() - date.getFullYear();
  const monthDiff = today.getMonth() - date.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
    age--;
  }

  return age >= 16;
};

export const isValidGender = (gender: string): boolean => {
  if (typeof gender !== "string") return false;
  return gender === "male" || gender === "female" || gender === "other";
};

export const isValidProfileImage = (profileImage: string): boolean => {
  if (typeof profileImage !== "string") return false;
  return profileImage.length > 0;
};

export const isValidMembershipPlan = (membershipPlan: string): boolean => {
  if (typeof membershipPlan !== "string") return false;
  return (
    membershipPlan === "basic" ||
    membershipPlan === "standard" ||
    membershipPlan === "premium"
  );
};

export const isValidUserBody = (user: IUser): boolean => {
  if (typeof user !== "object" || user === null) return false;

  const allowedKeys = new Set([
    "firstName",
    "lastName",
    "email",
    "phoneNumber",
    "birthDate",
    "gender",
    "profileImage",
    "membershipPlan",
  ]);

  for (const key of Object.keys(user)) {
    if (!allowedKeys.has(key)) return false;
  }

  if (!user.firstName || !user.lastName) return false;
  if (!user.email || !user.phoneNumber) return false;
  if (!user.birthDate || !user.gender) return false;
  if (!user.profileImage || !user.membershipPlan) return false;

  return true;
};
