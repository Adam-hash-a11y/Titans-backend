/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUser } from "../../src/types/user.types";
import {
  isValidName,
  isValidEmail,
  isValidPhoneNumber,
  isValidBirthDate,
  isValidGender,
  isValidProfileImage,
  isValidMembershipPlan,
  isValidUserBody,
} from "../../src/validator/user.validator";

describe("test isValidName validator function", () => {
  it("should return true for valid name", () => {
    // Given
    const name = "Adam";

    // When
    const result = isValidName(name);

    // Then
    expect(result).toBe(true);
  });

  it("should return false for a number", () => {
    // Given
    const name = 123;

    // When
    const result = isValidName(name as any);

    // Then
    expect(result).toBe(false);
  });

  it("should return false for name with less than 3 characters", () => {
    // Given
    const name = "Al";

    // When
    const result = isValidName(name);

    // Then
    expect(result).toBe(false);
  });

  it("should return false for name with numbers", () => {
    // Given
    const name = "Adam123";

    // When
    const result = isValidName(name);

    // Then
    expect(result).toBe(false);
  });
});

describe("test isValidEmail validator function", () => {
  it("should return true for valid email", () => {
    // Given
    const email = "adam.ben@example.com";

    // When
    const result = isValidEmail(email);

    // Then
    expect(result).toBe(true);
  });

  it("should return false for invalid email", () => {
    // Given
    const email = "adam.ben@";

    // When
    const result = isValidEmail(email);

    // Then
    expect(result).toBe(false);
  });

  it("should return false for a number", () => {
    // Given
    const email = 123;

    // When
    const result = isValidEmail(email as any);

    // Then
    expect(result).toBe(false);
  });
});

describe("test isValidPhoneNumber validator function", () => {
  it("should return true for valid phone number", () => {
    // Given
    const phoneNumber = "+21620123456";

    // When
    const result = isValidPhoneNumber(phoneNumber);

    // Then
    expect(result).toBe(true);
  });

  it("should return false for invalid phone number", () => {
    // Given
    const phoneNumber = "12345";

    // When
    const result = isValidPhoneNumber(phoneNumber);

    // Then
    expect(result).toBe(false);
  });

  it("should return false for a number", () => {
    // Given
    const phoneNumber = 21620123456;

    // When
    const result = isValidPhoneNumber(phoneNumber as any);

    // Then
    expect(result).toBe(false);
  });
});

describe("test isValidBirthDate validator function", () => {
  it("should return true for a valid birth date over 16 years old", () => {
    // Given
    const birthDate = new Date("2000-01-01");

    // When
    const result = isValidBirthDate(birthDate);

    // Then
    expect(result).toBe(true);
  });

  it("should return false for under 16 years old", () => {
    // Given
    const birthDate = new Date();
    birthDate.setFullYear(birthDate.getFullYear() - 10);

    // When
    const result = isValidBirthDate(birthDate);

    // Then
    expect(result).toBe(false);
  });

  it("should return false for invalid date", () => {
    // Given
    const birthDate = "not-a-date";

    // When
    const result = isValidBirthDate(birthDate as any);

    // Then
    expect(result).toBe(false);
  });

  it("should return false when birth date is missing", () => {
    // Given
    const birthDate = null;

    // When
    const result = isValidBirthDate(birthDate as any);

    // Then
    expect(result).toBe(false);
  });
});

describe("test isValidGender validator function", () => {
  it("should return true for male", () => {
    // Given
    const gender = "male";

    // When
    const result = isValidGender(gender);

    // Then
    expect(result).toBe(true);
  });

  it("should return true for female", () => {
    // Given
    const gender = "female";

    // When
    const result = isValidGender(gender);

    // Then
    expect(result).toBe(true);
  });

  it("should return true for other", () => {
    // Given
    const gender = "other";

    // When
    const result = isValidGender(gender);

    // Then
    expect(result).toBe(true);
  });

  it("should return false for invalid gender", () => {
    // Given
    const gender = "unknown";

    // When
    const result = isValidGender(gender);

    // Then
    expect(result).toBe(false);
  });
});

describe("test isValidProfileImage validator function", () => {
  it("should return true for a non-empty string", () => {
    // Given
    const profileImage = "uploads/image.png";

    // When
    const result = isValidProfileImage(profileImage);

    // Then
    expect(result).toBe(true);
  });

  it("should return false for an empty string", () => {
    // Given
    const profileImage = "";

    // When
    const result = isValidProfileImage(profileImage);

    // Then
    expect(result).toBe(false);
  });

  it("should return false for a number", () => {
    // Given
    const profileImage = 123;

    // When
    const result = isValidProfileImage(profileImage as any);

    // Then
    expect(result).toBe(false);
  });
});

describe("test isValidMembershipPlan validator function", () => {
  it("should return true for basic", () => {
    // Given
    const membershipPlan = "basic";

    // When
    const result = isValidMembershipPlan(membershipPlan);

    // Then
    expect(result).toBe(true);
  });

  it("should return true for standard", () => {
    // Given
    const membershipPlan = "standard";

    // When
    const result = isValidMembershipPlan(membershipPlan);

    // Then
    expect(result).toBe(true);
  });

  it("should return true for premium", () => {
    // Given
    const membershipPlan = "premium";

    // When
    const result = isValidMembershipPlan(membershipPlan);

    // Then
    expect(result).toBe(true);
  });

  it("should return false for invalid plan", () => {
    // Given
    const membershipPlan = "vip";

    // When
    const result = isValidMembershipPlan(membershipPlan);

    // Then
    expect(result).toBe(false);
  });
});

describe("test isValidUserBody validator function", () => {
  it("should return true for valid user body", () => {
    // Given
    const body = {
      firstName: "Adam",
      lastName: "Ben",
      email: "adam.ben@example.com",
      phoneNumber: "+21620123456",
      birthDate: new Date("2000-01-01"),
      gender: "male",
      profileImage: "uploads/image.png",
      membershipPlan: "premium",
    };

    // When
    const result = isValidUserBody(body as IUser);

    // Then
    expect(result).toBe(true);
  });

  it("should return false for extra key", () => {
    // Given
    const body = {
      firstName: "Adam",
      lastName: "Ben",
      email: "adam.ben@example.com",
      phoneNumber: "+21620123456",
      birthDate: new Date("2000-01-01"),
      gender: "male",
      profileImage: "uploads/image.png",
      membershipPlan: "premium",
      extra: "field",
    };

    // When
    const result = isValidUserBody(body as any);

    // Then
    expect(result).toBe(false);
  });

  it("should return false when firstName is missing", () => {
    // Given
    const body = {
      lastName: "Ben",
      email: "adam.ben@example.com",
      phoneNumber: "+21620123456",
      birthDate: new Date("2000-01-01"),
      gender: "male",
      profileImage: "uploads/image.png",
      membershipPlan: "premium",
    };

    // When
    const result = isValidUserBody(body as any);

    // Then
    expect(result).toBe(false);
  });
});
