export async function getExpensesData() {
  const response = await fetch("http://localhost:3000/expenses");

  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Failed to fetch expenses");
  }
}

export async function createExpense(expense) {
  const response = await fetch("http://localhost:3000/expenses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expense),
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error("Failed to create expense");
  }
}