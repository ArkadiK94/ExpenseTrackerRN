import { createContext, useReducer } from "react";

export const ExpensesContext = createContext({
  expensesState: [],
  addExpense: ({ title, price, date, id }) => {},
  removeExpense: (id) => {},
  updateExpense: ({ title, price, date }, id) => {},
  setExpenses: ([]) => {},
  reqRootUrl: "",
});

const expensesReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "UPDATE":
      const editExpense = state.find((item) => item.id === action.payload.id);
      const expenseAfterEditing = { ...editExpense, ...action.payload };
      const newState = state.filter((item) => item.id !== action.payload.id);
      return [...newState, expenseAfterEditing];
    case "DELETE":
      return state.filter((item) => item.id !== action.payload);
    case "SET":
      return action.payload;
    default:
      return state;
  }
};

const ExpensesContextProvider = ({ children }) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);
  const addExpense = (expenseData) => {
    dispatch({ type: "ADD", payload: expenseData });
  };

  const removeExpense = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };

  const updateExpense = (expenseData, id) => {
    dispatch({ type: "UPDATE", payload: { ...expenseData, id } });
  };
  const setExpenses = (expeses) => {
    dispatch({ type: "SET", payload: expeses });
  };

  const value = {
    expensesState,
    addExpense,
    removeExpense,
    updateExpense,
    setExpenses,
  };
  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
