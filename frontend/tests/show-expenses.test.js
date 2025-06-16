import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../src/expenses-list/format-expenses.js', () => ({
  getExpenses: vi.fn(),
}));

import { showExpenses, __only_for_test as ui } from '../src/expenses-list/show-expenses.js';
import { getExpenses } from '../src/expenses-list/format-expenses.js';

describe('UI helper functions', () => {
  let container;
  beforeEach(() => {
    container = document.createElement('div');
  });

  it('showLoading toont Loading...', () => {
    ui.showLoading(container);
    const p = container.querySelector('p');
    expect(p).toBeTruthy();
    expect(p.textContent).toBe('Loading...');
  });

  it('showError toont foutmelding in rood', () => {
    const err = new Error('fail');
    ui.showError(container, err);
    const p = container.querySelector('p');
    expect(p.textContent).toBe('fail');
    expect(p.style.color).toBe('red');
  });

  it('showEmptyState toont No expenses found.', () => {
    ui.showEmptyState(container);
    const p = container.querySelector('p');
    expect(p.textContent).toBe('No expenses found.');
  });

  it('renderExpenses toont list of items', () => {
    const data = [{ id: '1', name: 'Test' }];
    ui.renderExpenses(container, data);
    const lis = container.querySelectorAll('ul > li');
    expect(lis.length).toBe(1);
    expect(lis[0].textContent).toBe(JSON.stringify(data[0]));
  });

  it('renderExpenses toont lege state als array leeg is', () => {
    ui.renderExpenses(container, []);
    const p = container.querySelector('p');
    expect(p.textContent).toBe('No expenses found.');
  });
});

describe('showExpenses integration', () => {
  let container;
  beforeEach(() => {
    container = document.createElement('div');
    vi.clearAllMocks();
  });

  it('toont expenses na fetch', async () => {
    const eps = [{ id: '1', foo: 'bar' }];
    getExpenses.mockResolvedValueOnce({ success: true, expenses: eps });

    await showExpenses(container);
    const lis = container.querySelectorAll('ul > li');
    expect(lis.length).toBe(eps.length);
    expect(lis[0].textContent).toBe(JSON.stringify(eps[0]));
  });

  it('toont error bij failure', async () => {
    const err = new Error('oops');
    getExpenses.mockResolvedValueOnce({ success: false, error: err });

    await showExpenses(container);
    const p = container.querySelector('p');
    expect(p.textContent).toBe('oops');
    expect(p.style.color).toBe('red');
  });
});
