import { deleteExpense } from './delete-expense.js';

export async function removeExpense(id) {
  try {
    await deleteExpense(id);
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}