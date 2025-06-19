import { describe, it, expect, vi, beforeEach } from 'vitest';
import { deleteExpense } from '../../src/expenses-delete/delete-expense.js';

beforeEach(() => {
  global.fetch = vi.fn();
});

describe('deleteExpense', () => {
  it('stuurt DELETE en geeft true bij status 200', async () => {
    fetch.mockResolvedValueOnce({ ok: true, status: 200 });

    const result = await deleteExpense('123');
    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/expenses/123', {
      method: 'DELETE',
    });
    expect(result).toBe(true);
  });

  it('stuurt DELETE en geeft true bij status 204', async () => {
    fetch.mockResolvedValueOnce({ ok: true, status: 204 });

    const result = await deleteExpense('456');
    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/expenses/456', {
      method: 'DELETE',
    });
    expect(result).toBe(true);
  });

  it('gooit fout bij response.ok === false', async () => {
    fetch.mockResolvedValueOnce({ ok: false, status: 404 });

    await expect(deleteExpense('not-found')).rejects.toThrow('404');
  });

  it('gooit fout bij netwerkfout', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));

    await expect(deleteExpense('999')).rejects.toThrow('Network error');
  });
});