import { registerUserService } from "../../src/service/userService";
import {
  findUserByEmail,
  createUser,
} from "../../src/repository/user.repository";
import { IUser } from "../../src/types/user.types";

jest.mock("../../src/repository/user.repository");

describe("test registerUserService function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create and return a new user", async () => {
    // Given
    const user: IUser = {
      firstName: "Adam",
      lastName: "Ben",
      email: "adam.ben@example.com",
      phoneNumber: "+21620123456",
      birthDate: new Date("2000-01-01"),
      gender: "male",
      profileImage: "uploads/image.png",
      membershipPlan: "premium",
    };
    (findUserByEmail as jest.Mock).mockResolvedValue(null);
    (createUser as jest.Mock).mockResolvedValue(user);

    // When
    const result = await registerUserService(user);

    // Then
    expect(result).toEqual(user);
  });

  it("should throw an error when user already exists", async () => {
    // Given
    const user: IUser = {
      firstName: "Adam",
      lastName: "Ben",
      email: "adam.ben@example.com",
      phoneNumber: "+21620123456",
      birthDate: new Date("2000-01-01"),
      gender: "male",
      profileImage: "uploads/image.png",
      membershipPlan: "premium",
    };
    (findUserByEmail as jest.Mock).mockResolvedValue(user);

    // When
    const action = registerUserService(user);

    // Then
    await expect(action).rejects.toThrow("Error registering user");
  });
});
