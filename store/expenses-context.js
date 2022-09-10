import { createContext, useState } from "react";

import Expense from "../models/expense";

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: (id) => {},
  removeExpense: (id) => {},
});

const ExpensesContextProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([
    new Expense(1, "Test", 19.99, "2022-08-02"),
    new Expense(2, "A pair of shoes", 59.99, "2021-06-19"),
    new Expense(3, "A pair of trousers", 89.29, "2022-08-01"),
    new Expense(4, "Some bananas", 5.99, "2021-12-01"),
    new Expense(5, "Cafe", 9.99, "2022-08-01"),
    new Expense(6, "Chair", 99.99, "2022-07-16"),
    new Expense(7, "Lemon", 2.99, "2022-07-23"),
    new Expense(8, "Watermelon", 7.99, "2022-07-17"),
    new Expense(9, "Chair", 99.99, "2022-07-16"),
    new Expense(10, "Lemon", 2.99, "2022-07-23"),
    new Expense(11, "Watermelon", 7.99, "2022-07-17"),
  ]);
  const addExpense = (id) => {};

  const removeExpense = (id) => {
    setExpenses((prevExpenses) =>
      prevExpenses.filter((item) => item.id !== id)
    );
  };
  const value = {
    expenses,
    addExpense,
    removeExpense,
  };
  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
