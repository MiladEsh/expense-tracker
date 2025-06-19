import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../src/expenses-create/add-expense.js', () => ({
  addExpense: vi.fn(),
}));

import { __only_for_test, bindFormSubmit } from '../../src/expenses-create/bind-form.js';
import { addExpense } from '../../src/expenses-create/add-expense.js';

describe('submitExpense', () => {
  it('leest waarden uit het formulier en roept addExpense aan', async () => {
    const form = document.createElement('form');
    form.innerHTML = `
      <input name="description" value="Test" />
      <input name="amount" value="15.5" />
      <input name="date" value="2025-06-17" />
      <input name="category" value="Eten" />
    `;

    const mockResult = { success: true };
    addExpense.mockResolvedValueOnce(mockResult);

    const result = await __only_for_test.submitExpense(form);
    expect(addExpense).toHaveBeenCalledWith({
      description: 'Test',
      amount: '15.5',
      date: '2025-06-17',
      category: 'Eten',
    });
    expect(result).toBe(mockResult);
  });
});

describe('updateUI', () => {
  let form, container;

  beforeEach(() => {
    document.body.innerHTML = `
      <form>
        <input name="description" />
        <input name="amount" />
        <input name="date" />
        <input name="category" />
      </form>
      <div id="list"></div>
    `;
    form = document.querySelector('form');
    container = document.querySelector('#list');
  });

  it('reset het formulier en toont de lijst opnieuw bij succes', async () => {
    form.reset = vi.fn();
    __only_for_test.updateUI(form, container, { success: true });

    await new Promise((r) => setTimeout(r));

    expect(form.reset).toHaveBeenCalled();
    const p = container.querySelector('p');
    expect(p).not.toBeNull(); // verifieer dat showExpenses iets toont
  });

  it('toont een foutmelding bij failure', () => {
    const error = new Error('API fout');
    __only_for_test.updateUI(form, container, { success: false, error });

    const p = container.querySelector('p');
    expect(p).not.toBeNull();
    expect(p.textContent).toBe('API fout');
    expect(p.style.color).toBe('red');
  });
});

describe('bindFormSubmit', () => {
  it('verwerkt submit en toont foutmelding bij failure', async () => {
    const form = document.createElement('form');
    const el = document.createElement('div');
    form.innerHTML = `
      <input name="description" value="Test" />
      <input name="amount" value="20" />
      <input name="date" value="2025-06-17" />
      <input name="category" value="Eten" />
    `;
    document.body.append(form, el);

    addExpense.mockResolvedValueOnce({ success: false, error: new Error('fail') });

    bindFormSubmit(form, el);
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

    await new Promise((r) => setTimeout(r));

    const p = el.querySelector('p');
    expect(p).not.toBeNull();
    expect(p.textContent).toBe('fail');
    expect(p.style.color).toBe('red');
  });
});