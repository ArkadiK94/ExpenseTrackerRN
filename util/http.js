import axios from "axios";

const BACKEND_URL = "https://expensetracker-b15b2-default-rtdb.firebaseio.com";

export async function storeExpense(expenseData, token) {
  const response = await axios.post(
    `${BACKEND_URL}/expenses.json?auth=${token}`,
    expenseData
  );
  const id = response.data.name;
  return id;
}

export async function fetchExpense(token, email) {
  const response = await axios.get(
    `${BACKEND_URL}/expenses.json?auth=${token}&orderBy="userEmail"&equalTo="${email}"`
  );
  const expenses = [];
  if (!response.data) {
    return expenses;
  }
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

export function updateExpense(expenseId, expenseData, token) {
  return axios.put(
    `${BACKEND_URL}/expenses/${expenseId}.json?auth=${token}`,
    expenseData
  );
}
export function deleteExpense(expenseId, token) {
  return axios.delete(
    `${BACKEND_URL}/expenses/${expenseId}.json?auth=${token}`
  );
}
