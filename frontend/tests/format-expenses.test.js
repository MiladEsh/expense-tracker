import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../src/expenses-list/fetch-expenses", () => ({
  getExpensesData: vi.fn(),
}));

import { getExpenses, __only_for_test as internal } from "../src/expenses-list/format-expenses.js";
import { getExpensesData } from "../src/expenses-list/fetch-expenses.js";

const { formatExpenses } = internal;

describe("formatExpenses", () => {
  it("voegt displayDate toe aan elk expense object", () => {
    const input = [
      { id: "1", description: "Lunch", amount: 10.5, date: "2025-06-15", category: "Eten" }
    ];
    const [formatted] = formatExpenses(input);
    expect(formatted.displayDate).toBe(new Date("2025-06-15").toLocaleDateString());
  });
});

describe("getExpenses", () => {
  beforeEach(() => vi.clearAllMocks());

  it("retourneert success met geformatteerde expenses", async () => {
    const mockData = [
      { id: "1", description: "Lunch", amount: 10.5, date: "2025-06-15", category: "Eten" }
    ];
    getExpensesData.mockResolvedValueOnce(mockData);

    const { success, expenses } = await getExpenses();
    expect(success).toBe(true);
    expect(expenses[0].displayDate).toBe(new Date("2025-06-15").toLocaleDateString());
  });

  it("retourneert failure met foutobject bij rejection", async () => {
    const err = new Error("API failure");
    getExpensesData.mockRejectedValueOnce(err);

    const result = await getExpenses();
    expect(result).toEqual({ success: false, error: err });
  });
});
