import { describe, it, expect, vi, beforeEach } from "vitest";
import { getExpensesData, createExpense } from "./fetch-expenses.js";

global.fetch = vi.fn(); // mock fetch

describe("API client", () => {
  beforeEach(() => {
    fetch.mockReset();
  });

  it("haalt gebruikers op met GET", async () => {
    const fakeUsers = [{ id: 1, title: "lunch", amount: 20 }];
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => fakeExpenses,
    });
    const result = await getExpensesData();
    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/expenses");
    expect(result).toEqual(fakeExpenses);
  });

  it("gooit een fout bij GET failure", async () => {
    fetch.mockResolvedValueOnce({ ok: false });
    await expect(getExpensesData()).rejects.toThrow("Failed to fetch expenses");
  });

  it("maakt een expense aan met POST", async () => {
    const newExpense = { title: "Lunch", amount: 20 };
    const returned = { id: 42, title: "Lunch", amount: 20 };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => returned,
    });

    const result = await createExpense(newExpense);

    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newExpense),
    });

    expect(result).toEqual(returned);
  });

  it("gooit een fout bij POST failure", async () => {
    fetch.mockResolvedValueOnce({ ok: false });
    await expect(createExpense({ title: "Lunch", amount: 20})).rejects.toThrow("Failed to create expense");
  });
});
