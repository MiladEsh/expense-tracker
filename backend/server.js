import express from 'express';
import fs from 'fs/promises';
import { v4 as uuid } from 'uuid';
import cors from 'cors';

const app = express();
const PORT = 3000;
const DATA_FILE = './expenses.json';

app.use(cors());
app.use(express.json());

// Utility to read and write file
async function readExpenses() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeExpenses(expenses) {
  await fs.writeFile(DATA_FILE, JSON.stringify(expenses, null, 2));
}

// GET /expenses
app.get('/expenses', async (req, res) => {
  const expenses = await readExpenses();
  res.json(expenses);
});

// POST /expenses
app.post('/expenses', async (req, res) => {
  const { description, amount, date, category } = req.body;

  if (!description || !amount || !date) {
    return res.status(400).json({ error: 'description, amount, and date are required' });
  }

  const newExpense = {
    id: uuid(),
    description,
    amount,
    date,
    category: category || null
  };

  const expenses = await readExpenses();
  expenses.push(newExpense);
  await writeExpenses(expenses);

  res.status(201).json(newExpense);
});

// DELETE /expenses/:id
app.delete('/expenses/:id', async (req, res) => {
  const { id } = req.params;
  let expenses = await readExpenses();
  const originalLength = expenses.length;
  expenses = expenses.filter(exp => exp.id !== id);

  if (expenses.length === originalLength) {
    return res.status(404).json({ error: 'Expense not found' });
  }

  await writeExpenses(expenses);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Expense Tracker API running on http://localhost:${PORT}`);
});
