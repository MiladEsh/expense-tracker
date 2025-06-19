import { removeExpense } from '../expenses-delete/remove-expense.js';
import { showExpenses } from './show-expenses.js';
import { showError, toggle } from '../ui-helpers.js';

export async function onDeleteButtonClicked(element, expense) {
    const result = await removeExpense(expense.id);
    if (result.success) {
        console.log("clicked")
        showExpenses(element);
    } else {
        showError(element, result.error);
    }
}

export function appendDeleteButton(parent, element, expense) {
    const button = document.createElement('button');


    const label = document.createElement('span');
    label.classList.add('confirm-label');
    label.classList.add('hidden');
    label.textContent = 'Zeker?';
    label.addEventListener('click', async () => {
        await onDeleteButtonClicked(element, expense);
    });

    const icon = document.createElement('span');
    icon.classList.add('trash-icon');
    icon.textContent = 'X';

    button.classList.add('confirm-delete');
    button.addEventListener('click', evt => {
        toggle(label);
        toggle(icon);
    });

    button.appendChild(label);
    button.appendChild(icon);       // just the X
    parent.appendChild(button);    // the button first

}

export const __only_for_test = { onDeleteButtonClicked, appendDeleteButton };