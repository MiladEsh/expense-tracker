import { describe, it, expect, beforeEach, vi } from 'vitest';
import { validateFormData, addExpense } from '../../src/expenses-create/add-expense';

vi.mock('../../src/expenses-create/post-expense', () => ({
  createExpense: vi.fn(),
}));

import { createExpense } from '../../src/expenses-create/post-expense';

describe('validateFormData', () => {
  it('faalt als description ontbreekt', () => {
    expect(validateFormData({ amount: 10, date: '2025-06-17' }))
      .toEqual({ success: false, error: 'Description is required' });
  });

  it('faalt als amount ontbreekt', () => {
    expect(validateFormData({ description: 'Test', date: '2025-06-17' }))
      .toEqual({ success: false, error: 'Amount is required' });
  });

  it('faalt als amount geen positief getal is', () => {
    expect(validateFormData({ description: 'Test', amount: -5, date: '2025-06-17' }))
      .toEqual({ success: false, error: 'Amount must be a positive number' });
    expect(validateFormData({ description: 'Test', amount: 'abc', date: '2025-06-17' }))
      .toEqual({ success: false, error: 'Amount must be a positive number' });
  });

  it('faalt als date ontbreekt', () => {
    expect(validateFormData({ description: 'Test', amount: 10 }))
      .toEqual({ success: false, error: 'Date is required' });
  });

  it('succeed bij geldige data', () => {
    expect(validateFormData({ description: 'Lunch', amount: '15.50', date: '2025-06-17' }))
      .toEqual({ success: true });
  });
});

describe('addExpense', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('geeft validation error terug zonder API-call bij ongeldige data', async () => {
    const result = await addExpense({ description: '', amount: 0, date: '' });
    expect(result).toEqual({ success: false, error: 'Description is required' });
  });

  it('roept createExpense aan bij geldige data en geeft success terug', async () => {
    createExpense.mockResolvedValue({ id: 1 });

    const result = await addExpense({ description: 'Test', amount: '20', date: '2025-06-17' });
    expect(createExpense).toHaveBeenCalledWith({
      description: 'Test',
      amount: 20,
      date: '2025-06-17',
    });
    expect(result).toEqual({ success: true });
  });

  it('vangt fout uit createExpense en geeft error terug', async () => {
    createExpense.mockRejectedValue(new Error('Network error'));

    const result = await addExpense({ description: 'Test', amount: '20', date: '2025-06-17' });
    expect(result).toEqual({ success: false, error: 'Network error' });
  });
});