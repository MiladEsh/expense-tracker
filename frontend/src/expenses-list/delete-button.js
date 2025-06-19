import { removeExpense } from '../expenses-delete/remove-expense.js';
import { showExpenses } from './show-expenses.js';
import { showError } from '../ui-helpers.js';

export async function onDeleteButtonClicked(element, expense) {
  const result = await removeExpense(expense.id);
  if (result.success) {
    showExpenses(element);
  } else {
    showError(element, result.error);
  }
}

export function appendDeleteButton(parent, element, expense) {
  const button = document.createElement('button');
  button.classList.add('confirm-delete');

  const label = document.createElement('span');
  label.classList.add('confirm-label');
  label.textContent = 'Zeker?';
  label.addEventListener('click', () => {
    onDeleteButtonClicked(element, expense);
  });

  const icon = document.createElement('span');
  icon.classList.add('trash-icon');
  icon.textContent = 'X';

  button.appendChild(label);
  button.appendChild(icon);
  parent.appendChild(button);
}

export const __only_for_test = { onDeleteButtonClicked, appendDeleteButton };