import { createExpense } from '../../src/expenses-create/post-expense';

beforeEach(() => {
  fetch.resetMocks();
});

test('succesvolle POST (status 201)', async () => {
  const mockResponse = { id: 123, description: 'Test', amount: 10, date: '2025-06-17' };
  fetch.mockResponseOnce(JSON.stringify(mockResponse), { status: 201 });

  const data = { description: 'Test', amount: 10, date: '2025-06-17' };
  const result = await createExpense(data);

  expect(result).toEqual(mockResponse);
  expect(fetch).toHaveBeenCalledWith('/expenses', expect.objectContaining({
    method: 'POST',
  }));
});

test('fout bij POST (status 400)', async () => {
  fetch.mockResponseOnce('', { status: 400 });

  const data = { description: 'Test', amount: 10, date: '2025-06-17' };

  await expect(createExpense(data)).rejects.toThrow('HTTP error! status: 400');
});

test('netwerkfout', async () => {
  fetch.mockReject(new Error('Network error'));

  const data = { description: 'Test', amount: 10, date: '2025-06-17' };

  await expect(createExpense(data)).rejects.toThrow('Network error');
});