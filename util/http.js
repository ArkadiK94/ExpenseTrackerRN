import axios from "axios";

export async function storeExpense(storageUrl, expenseData) {
  const response = await axios.post(`${storageUrl}/expenses.json`, expenseData);
  const id = response.data.name;
  return id;
}

export async function fetchExpense(storageUrl) {
  const response = await axios.get(`${storageUrl}/expenses.json`);
  const data = [];
  for (const [expenseId, expenseData] of Object.entries(response.data)) {
    data.push({
      ...expenseData,
      id: expenseId,
      date: new Date(expenseData.date),
    });
  }
  return data;
}
