import { createContext, useReducer } from "react";

import Expense from "../models/expense";

export const ExpensesContext = createContext({
  expensesState: [],
  addExpense: ({ title, price, date }) => {},
  removeExpense: (id) => {},
  updateExpense: ({ title, price, date }, id) => {},
});
const DUMMY_DATA = [];

const expensesReducer = (state, action) => {
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
};

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
