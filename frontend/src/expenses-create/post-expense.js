export async function createExpense(data) {
  const response = await fetch('http://localhost:5051/api/expenses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(response.status.toString());
  }

  return response.json();
}
