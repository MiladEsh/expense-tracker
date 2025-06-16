import { getExpensesData } from "./fetch-expenses.js";

function formatExpenses(expenses) {
  return expenses.map(expense => ({
    ...expense,
    displayDate: new Date(expense.date).toLocaleDateString(),
  }));
}

export async function getExpenses() {
  try {
    const expenses = await getExpensesData();
    const formatted = formatExpenses(expenses);
    return { success: true, expenses: formatted };
  } catch (error) {
    return { success: false, error };
  }
}

export const __only_for_test = { formatExpenses };