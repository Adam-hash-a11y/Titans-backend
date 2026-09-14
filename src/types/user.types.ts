export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  birthDate: Date;
  gender: "male" | "female" | "other";
  profileImage: string;
  membershipPlan: "basic" | "standard" | "premium";
}
