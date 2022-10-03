import { createContext, useReducer } from "react";

import Expense from "../models/expense";

export const ExpensesContext = createContext({
  expensesState: [],
  addExpense: ({ title, price, date }) => {},
  removeExpense: (id) => {},
  updateExpense: ({ title, price, date }, id) => {},
});
const DUMMY_DATA = [
  new Expense(1, "Test", 19.99, "2022-10-03"),
  new Expense(2, "A pair of shoes", 59.99, "2021-06-19"),
  new Expense(3, "A pair of trousers", 89.29, "2022-10-02"),
  new Expense(4, "Some bananas", 5.99, "2021-12-01"),
  new Expense(5, "Cafe", 9.99, "2022-08-01"),
  new Expense(6, "Chair", 99.99, "2022-07-16"),
  new Expense(7, "Lemon", 2.99, "2022-07-23"),
  new Expense(8, "Watermelon", 7.99, "2022-07-17"),
  new Expense(9, "Chair", 99.99, "2022-07-16"),
  new Expense(10, "Lemon", 2.99, "2022-07-23"),
  new Expense(11, "Watermelon", 7.99, "2022-07-17"),
];

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const newExpense = action.payload;
      return [...state, newExpense];
    case "UPDATE":
      const editExpense = state.find((item) => item.id === action.payload.id);
      const expenseAfterEditing = { ...editExpense, ...action.payload };
      const newState = state.filter((item) => item.id !== action.payload.id);
      return [...newState, expenseAfterEditing];
    case "DELETE":
      return state.filter((item) => item.id !== action.payload);
    default:
      return state;
  }
}

const ExpensesContextProvider = ({ children }) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_DATA);
  const addExpense = (expenseData) => {
    dispatch({ type: "ADD", payload: expenseData });
  };

  const removeExpense = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };

  const updateExpense = (expenseData, id) => {
    dispatch({ type: "UPDATE", payload: { ...expenseData, id } });
  };

  const value = {
    expensesState,
    addExpense,
    removeExpense,
    updateExpense,
  };
  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
