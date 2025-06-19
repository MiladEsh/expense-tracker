import { describe, it, expect, vi, beforeEach } from 'vitest';
import { showExpenses, __only_for_test } from '../../src/expenses-list/show-expenses.js';

vi.mock('../../src/expenses-list/format-expenses.js', () => ({
  getExpenses: vi.fn()
}));
import { getExpenses } from '../../src/expenses-list/format-expenses.js';

describe('DOM testing', () => {
  let el;

  beforeEach(() => {
    el = document.createElement('div');
    document.body.innerHTML = '';
    document.body.appendChild(el);
  });

  it('showLoading', () => {
    __only_for_test.showLoading(el);
    expect(el.querySelector('p')?.textContent).toBe('Loading...');
  });

  it('showEmptyState', () => {
    __only_for_test.showEmptyState(el);
    expect(el.querySelector('p')?.textContent).toBe('No expenses found.');
  });

  it('renderExpenses ingevuld', () => {
    const data = [
      { id: 1, description: 'Test1', amount: 10, displayDate: '2025-06-01' },
      { id: 2, description: 'Test2', amount: 20, displayDate: '2025-06-02' }
    ];
    __only_for_test.renderExpenses(el, data);

    const items = el.querySelectorAll('ul li');
    expect(items.length).toBe(2);
    expect(items[0].textContent).toContain('Test1 - €10 op 2025-06-01');
    expect(items[1].textContent).toContain('Test2 - €20 op 2025-06-02');
  });

  it('renderExpenses niet ingevuld', () => {
    __only_for_test.renderExpenses(el, []);
    expect(el.textContent).toContain('No expenses found.');
  });

  it('showExpenses ingevuld', async () => {
    const mockData = [
      { id: 1, description: 'Test1', amount: 10, displayDate: '2025-06-01' },
      { id: 2, description: 'Test2', amount: 20, displayDate: '2025-06-02' }
    ];
    getExpenses.mockResolvedValueOnce({ success: true, expenses: mockData });

    await showExpenses(el);

    const items = el.querySelectorAll('ul li');
    expect(items.length).toBe(2);
    expect(items[0].textContent).toContain('Test1 - €10 op 2025-06-01');
    expect(items[1].textContent).toContain('Test2 - €20 op 2025-06-02');
  });

  it('showExpenses niet ingevuld', async () => {
    getExpenses.mockResolvedValueOnce({ success: true, expenses: [] });

    await showExpenses(el);

    expect(el.textContent).toContain('No expenses found.');
  });

  it('showExpenses rejected api call', async () => {
    getExpenses.mockResolvedValueOnce({ success: false, error: new Error('kapot') });

    await showExpenses(el);

    const p = el.querySelector('p');
    expect(p).not.toBeNull();
    expect(p.textContent).toBe('kapot');
    expect(p.style.color).toBe('red');
  });
});