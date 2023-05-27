import axios from "axios";

const BACKEND_URL = "https://expensetracker-d4ab8-default-rtdb.firebaseio.com/";

export async function storeExpense(expenseData) {
  const response = await axios.post(
    `${BACKEND_URL}/expenses.json`,
    expenseData
  );
  const id = response.data.name;
  return id;
}

export async function fetchExpense() {
  const response = await axios.get(`${BACKEND_URL}/expenses.json`);
  const expenses = [];
  for (const [expenseId, expenseData] of Object.entries(response.data)) {
    const expenseObj = {
      id: expenseId,
      date: new Date(expenseData.date),
      price: expenseData.price,
      title: expenseData.title,
    };
    expenses.push(expenseObj);
  }
  return expenses;
}

export function updateExpense(expenseId, expenseData) {
  return axios.put(`${BACKEND_URL}/expenses/${expenseId}.json`, expenseData);
}
export function deleteExpense(expenseId) {
  return axios.delete(`${BACKEND_URL}/expenses/${expenseId}.json`);
}
