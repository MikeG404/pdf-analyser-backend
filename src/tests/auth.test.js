import { describe, it, expect, vi } from "vitest";
import authService from "../services/auth.service";

const { mockReturning, mockValues, mockInsert } = vi.hoisted(() => {
  const mockReturning = vi.fn();
  const mockValues = vi.fn().mockReturnValue({ returning: mockReturning });
  const mockInsert = vi.fn().mockReturnValue({ values: mockValues });
  return { mockReturning, mockValues, mockInsert };
});

vi.mock("../index.ts", () => {
  return {
    db: { insert: mockInsert },
  };
});

describe("AuthService", () => {
  describe("signup", () => {
    it("Create a new user and return it", async () => {
      const fakeUser = {
        id: 1,
        email: "mike@email.com",
        password: "Abcdefghijkl",
      };
      mockReturning.mockResolvedValue([fakeUser]);

      const result = await authService.signUp(
        "mike@email.com",
        "Abcdefghijkl"
      );

      expect(result).toBe(fakeUser);
    });
  });
});
