import { describe, it, expect, vi, beforeEach } from 'vitest';
import { __only_for_test as ui } from '../../src/expenses-list/delete-button.js';

vi.mock('../../src/expenses-delete/remove-expense.js', () => ({
  removeExpense: vi.fn(),
}));

vi.mock('../../src/expenses-list/fetch-expenses.js', () => ({
  getExpenses: () =>
    Promise.resolve({
      success: true,
      expenses: [
        { id: '1', description: 'Test', amount: 5, date: '2025-06-01' },
      ],
    }),
}));

vi.mock('../../src/expenses-list/show-expenses.js', () => ({
  showExpenses: (element) => {
    element.innerHTML = '<ul><li>Mocked</li></ul>';
  },
}));

import { removeExpense } from '../../src/expenses-delete/remove-expense.js';

describe('onDeleteButtonClicked', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.innerHTML = '';
    document.body.appendChild(container);
  });

  it('toont lijst opnieuw bij success', async () => {
    removeExpense.mockResolvedValueOnce({ success: true });

    await ui.onDeleteButtonClicked(container, { id: '123' });

    const ul = container.querySelector('ul');
    expect(ul).not.toBeNull();
    expect(ul.innerHTML).toContain('Mocked');
  });

  it('toont foutmelding bij failure', async () => {
    removeExpense.mockResolvedValueOnce({
      success: false,
      error: new Error('mislukt'),
    });

    await ui.onDeleteButtonClicked(container, { id: '123' });

    const p = container.querySelector('p');
    expect(p).not.toBeNull();
    expect(p.textContent).toBe('mislukt');
    expect(p.style.color).toBe('red');
  });
});

describe('appendDeleteButton', () => {
  it('voegt knop toe met spans', () => {
    const parent = document.createElement('div');
    const el = document.createElement('div');
    const expense = { id: 'abc' };

    ui.appendDeleteButton(parent, el, expense);

    const btn = parent.querySelector('button.confirm-delete');
    const label = btn.querySelector('span.confirm-label');
    const icon = btn.querySelector('span.trash-icon');

    expect(btn).not.toBeNull();
    expect(label.textContent).toBe('Zeker?');
    expect(icon.textContent).toBe('X');
  });
});