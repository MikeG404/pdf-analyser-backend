import { describe, it, expect, vi } from "vitest";
import authService from "../services/auth.service";

const { mockReturning, mockValues, mockInsert } = vi.hoisted(() => {
  const mockReturning = vi.fn();
  const mockValues = vi.fn().mockReturnValue({ returning: mockReturning });
  const mockInsert = vi.fn().mockReturnValue({ values: mockValues });
  return { mockReturning, mockValues, mockInsert };
});

const { mockLimit, mockWhere, mockFrom, mockSelect } = vi.hoisted(() => {
  const mockLimit = vi.fn();
  const mockWhere = vi.fn().mockReturnValue({ limit: mockLimit });
  const mockFrom = vi.fn().mockReturnValue({ where: mockWhere });
  const mockSelect = vi.fn().mockReturnValue({ from: mockFrom });
  return { mockLimit, mockWhere, mockFrom, mockSelect };
});

vi.mock("../index.ts", () => {
  return {
    db: {
      insert: mockInsert,
      select: mockSelect
    },
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

  describe("findUserByEmail", () => {
    it("Find user by email and return it", async () => {
      const fakeUser = {
        id: 1,
        email: "mike@email.com",
        password: "Abcdefghijkl",
      };

      mockLimit.mockResolvedValue([fakeUser]);

      const result = await authService.findUserByEmail("mike@email.com");

      expect(result).toEqual(fakeUser);
    })

    it("User does not exist", async () => {
      mockLimit.mockResolvedValue([]);

      const result = await authService.findUserByEmail("none@email.com");

      expect(result).toBeNull();
    })
  })
});

