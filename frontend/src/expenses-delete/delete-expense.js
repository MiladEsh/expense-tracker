export async function deleteExpense(id) {
  const response = await fetch(`http://localhost:5051/api/expenses${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(response.status.toString());
  }

  return true;
}