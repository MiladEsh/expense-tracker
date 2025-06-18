import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../src/expenses-list/format-expenses.js', () => ({
  getExpenses: vi.fn(),
}));

import { __only_for_test, showExpenses } from '../../src/expenses-list/show-expenses.js';
import { getExpenses } from '../../src/expenses-list/format-expenses.js';

describe('DOM testing', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="test-div"></div>';
    getExpenses.mockReset();
  });

  it('showLoading', () => {
    const el = document.querySelector('#test-div');
    __only_for_test.showLoading(el);
    expect(el.innerHTML).toStrictEqual('<p>Loading...</p>');
  });

  it('showEmptyState', () => {
    const el = document.querySelector('#test-div');
    __only_for_test.showEmptyState(el);
    expect(el.innerHTML).toStrictEqual('<p>No expenses found.</p>');
  });

  it('renderExpenses ingevuld', () => {
    const el = document.querySelector('#test-div');
    const data = [
      { id: 1, prop: 'test1' },
      { id: 2, prop: 'test2' }
    ];
    __only_for_test.renderExpenses(el, data);
    expect(el.innerHTML).toStrictEqual(
      '<ul><li>{"id":1,"prop":"test1"}</li><li>{"id":2,"prop":"test2"}</li></ul>'
    );
  });

  it('renderExpenses niet ingevuld', () => {
    const el = document.querySelector('#test-div');
    __only_for_test.renderExpenses(el, []);
    expect(el.innerHTML).toStrictEqual('<p>No expenses found.</p>');
  });

  it('showExpenses ingevuld', async () => {
    const el = document.querySelector('#test-div');
    const rep = {
      success: true,
      expenses: [
        { id: 1, prop: 'test1' },
        { id: 2, prop: 'test2' }
      ]
    };
    getExpenses.mockResolvedValueOnce(rep);
    await showExpenses(el);
    expect(el.innerHTML).toStrictEqual(
      '<ul><li>{"id":1,"prop":"test1"}</li><li>{"id":2,"prop":"test2"}</li></ul>'
    );
  });

  it('showExpenses niet ingevuld', async () => {
    const el = document.querySelector('#test-div');
    const rep = { success: true, expenses: [] };
    getExpenses.mockResolvedValueOnce(rep);
    await showExpenses(el);
    expect(el.innerHTML).toStrictEqual('<p>No expenses found.</p>');
  });

  it('showExpenses rejected api call', async () => {
    const el = document.querySelector('#test-div');
    const rep = { success: false, error: new Error('404') };
    getExpenses.mockResolvedValueOnce(rep);
    await showExpenses(el);
    expect(el.innerHTML).toStrictEqual('<p style="color: red;">404</p>');
  });
});