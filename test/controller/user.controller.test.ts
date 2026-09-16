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
  profileImage: "uploads/image.png",
  membershipPlan: "premium",
};

describe("POST /api/users", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should register a user and return 201", async () => {
    // Given
    mockedRegisterUserService.mockResolvedValue(validBody as any);

    // When
    const result = await request(app).post("/api/users").send(validBody);

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
    const result = await request(app).post("/api/users").send(validBody);

    // Then
    expect(result.status).toBe(409);
    expect(result.body.message).toBe("Error registering user");
  });

  it("should return 400 for invalid body", async () => {
    // Given
    const body = { ...validBody, email: "not-an-email" };

    // When
    const result = await request(app).post("/api/users").send(body);

    // Then
    expect(result.status).toBe(400);
  });
});
