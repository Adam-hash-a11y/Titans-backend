/* eslint-disable @typescript-eslint/no-explicit-any */
import request from "supertest";
import { app } from "../../app";
import * as userService from "../../src/service/userService";

jest.mock("../../src/service/userService");

const mockedRegisterUserService = jest.mocked(userService.registerUserService);

const validBody = {
  firstName: "Adam",
  lastName: "Ben",
  email: "adam.ben@example.com",
  phoneNumber: "+21620123456",
  birthDate: "2000-01-01",
  gender: "male",
  membershipPlan: "premium",
};

describe("POST /api/users", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should register a user and return 201", async () => {
    // Given
    mockedRegisterUserService.mockResolvedValue({
      ...validBody,
      profileImage: "test.jpg",
    } as any);

    // When
    const result = await request(app)
      .post("/api/users")
      .field("firstName", "Adam")
      .field("lastName", "Ben")
      .field("email", "adam.ben@example.com")
      .field("phoneNumber", "+21620123456")
      .field("birthDate", "2000-01-01")
      .field("gender", "male")
      .field("membershipPlan", "premium")
      .attach("profileImage", Buffer.from("fake"), "test.jpg");

    // Then
    expect(result.status).toBe(201);
    expect(result.body.user).toBeDefined();
  });

  it("should return 409 when user already exists", async () => {
    // Given
    mockedRegisterUserService.mockRejectedValue(
      new Error("Error registering user"),
    );

    // When
    const result = await request(app)
      .post("/api/users")
      .field("firstName", "Adam")
      .field("lastName", "Ben")
      .field("email", "adam.ben@example.com")
      .field("phoneNumber", "+21620123456")
      .field("birthDate", "2000-01-01")
      .field("gender", "male")
      .field("membershipPlan", "premium")
      .attach("profileImage", Buffer.from("fake"), "test.jpg");

    // Then
    expect(result.status).toBe(409);
    expect(result.body.message).toBe("Error registering user");
  });

  it("should return 400 for invalid body", async () => {
    // Given, When
    const result = await request(app)
      .post("/api/users")
      .field("firstName", "Adam")
      .field("lastName", "Ben")
      .field("email", "not-an-email")
      .field("phoneNumber", "+21620123456")
      .field("birthDate", "2000-01-01")
      .field("gender", "male")
      .field("membershipPlan", "premium")
      .attach("profileImage", Buffer.from("fake"), "test.jpg");

    // Then
    expect(result.status).toBe(400);
  });
});
