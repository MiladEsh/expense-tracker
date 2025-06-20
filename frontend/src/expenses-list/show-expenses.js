import { getExpenses } from './format-expenses.js';
import { appendDeleteButton } from './delete-button.js';
import { showError } from '../ui-helpers.js';

function showLoading(element) {
  element.innerHTML = '';
  const p = document.createElement('p');
  p.textContent = 'Loading...';
  element.appendChild(p);
}

function showEmptyState(element) {
  element.innerHTML = '';
  const p = document.createElement('p');
  p.textContent = 'No expenses found.';
  element.appendChild(p);
}

function renderExpenses(element, expenses) {
  element.innerHTML = '';
  if (expenses.length === 0) {
    showEmptyState(element);
    return;
  }
  const ul = document.createElement('ul');
  expenses.forEach(expense => {
    const li = document.createElement('li');
li.textContent = `${expense.description} - €${expense.amount} op ${expense.displayDate}`;
    appendDeleteButton(li, element, expense);
    ul.appendChild(li);
  });
  element.appendChild(ul);
}

export async function showExpenses(element) {
  showLoading(element);
  const result = await getExpenses();
  if (result.success) {
    renderExpenses(element, result.expenses);
  } else {
    showError(element, result.error);
  }
}

export const __only_for_test = { showLoading, showEmptyState, renderExpenses };