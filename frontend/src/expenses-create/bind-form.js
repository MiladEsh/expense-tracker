import { addExpense } from './add-expense.js';
import { showExpenses } from '../expenses-list/show-expenses.js';
import { showError } from '../ui-helpers.js';

function submitExpense(form) {
  const formData = new FormData(form);
  const data = {
    description: formData.get('description'),
    amount: formData.get('amount'),
    date: formData.get('date'),
    category: formData.get('category')
  };
  return addExpense(data);
}

async function updateUI(form, element, result) {
  if (result.success) {
    form.reset();
    await showExpenses(element);
  } else {
    showError(element, result.error);
  }
}

export async function bindFormSubmit(form, element) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const result = await submitExpense(form);
    await updateUI(form, element, result);
  });
}

export const __only_for_test = { submitExpense, updateUI };