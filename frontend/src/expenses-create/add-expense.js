import { createExpense } from './post-expense';


export function validateFormData(data) {
  if (!data.description) {
    return { success: false, error: 'Description is required' };
  }
  if (data.amount == null) {
    return { success: false, error: 'Amount is required' };
  }

  const amount = Number(data.amount);
  if (isNaN(amount) || amount <= 0) {
    return { success: false, error: 'Amount must be a positive number' };
  }

  if (!data.date) {
    return { success: false, error: 'Date is required' };
  }

  return { success: true };
}


export async function addExpense(data) {
  const validation = validateFormData(data);
  if (!validation.success) {
    return validation;
  }

  try {
    await createExpense({
      description: data.description,
      amount: Number(data.amount),
      date: data.date,
    });
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}