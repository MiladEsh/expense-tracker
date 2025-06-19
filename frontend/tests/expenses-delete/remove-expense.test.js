import { describe, it, expect, vi } from 'vitest';

vi.mock('../../src/expenses-delete/delete-expense.js', () => ({
  deleteExpense: vi.fn(),
}));

import { removeExpense } from '../../src/expenses-delete/remove-expense.js';
import { deleteExpense } from '../../src/expenses-delete/delete-expense.js';

describe('removeExpense', () => {
  it('geeft success: true bij succesvolle delete', async () => {
    deleteExpense.mockResolvedValueOnce(true);

    const result = await removeExpense('129');
    expect(result).toEqual({ success: true });
  });

  it('geeft success: false en foutobject bij failure', async () => {
    const err = new Error('verwijderen mislukt');
    deleteExpense.mockRejectedValueOnce(err);

    const result = await removeExpense('478');
    expect(result).toEqual({ success: false, error: err });
  });
});