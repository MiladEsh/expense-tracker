import { describe, it, expect, beforeEach, vi } from 'vitest';
import { showExpenses, __only_for_test as ui } from '../../src/expenses-list/show-expenses.js';
import { getExpenses } from '../../src/expenses-list/format-expenses.js';

vi.mock('../../src/expenses-list/format-expenses.js', () => ({
  getExpenses: vi.fn(),
}));

describe('DOM testing', () => {
  let el;

  beforeEach(() => {
    el = document.createElement('div');
    document.body.innerHTML = '';
  });

  it('showLoading', () => {
    ui.showLoading(el);
    const p = el.querySelector('p');
    expect(p).toBeTruthy();
    expect(p.textContent).toBe('Loading...');
  });

  it('showEmptyState', () => {
    ui.showEmptyState(el);
    const p = el.querySelector('p');
    expect(p).toBeTruthy();
    expect(p.textContent).toBe('No expenses found.');
  });

  it('renderExpenses ingevuld', () => {
    const data = [
      { id: 1, prop: 'test1' },
      { id: 2, prop: 'test2' },
    ];

    ui.renderExpenses(el, data);
    const items = el.querySelectorAll('ul li');
    expect(items.length).toBe(2);
    expect(items[0].textContent).toContain('"prop":"test1"');
    expect(items[1].textContent).toContain('"prop":"test2"');

    const buttons = el.querySelectorAll('ul li button.confirm-delete');
    expect(buttons.length).toBe(2);
  });

  it('renderExpenses niet ingevuld', () => {
    ui.renderExpenses(el, []);
    const p = el.querySelector('p');
    expect(p).toBeTruthy();
    expect(p.textContent).toBe('No expenses found.');
  });

  it('showExpenses ingevuld', async () => {
    const rep = {
      success: true,
      expenses: [
        { id: 1, prop: 'test1' },
        { id: 2, prop: 'test2' },
      ],
    };

    getExpenses.mockResolvedValueOnce(rep);
    await showExpenses(el);

    const items = el.querySelectorAll('ul li');
    expect(items.length).toBe(2);
    expect(items[0].textContent).toContain('"prop":"test1"');
    expect(items[1].textContent).toContain('"prop":"test2"');
  });

  it('showExpenses niet ingevuld', async () => {
    getExpenses.mockResolvedValueOnce({ success: true, expenses: [] });
    await showExpenses(el);
    const p = el.querySelector('p');
    expect(p).toBeTruthy();
    expect(p.textContent).toBe('No expenses found.');
  });

  it('showExpenses rejected api call', async () => {
    getExpenses.mockResolvedValueOnce({ success: false, error: new Error('fout') });
    await showExpenses(el);
    const p = el.querySelector('p');
    expect(p.textContent).toBe('fout');
    expect(p.style.color).toBe('red');
  });
});
