import { useContext } from "react";

import ExpensesList from "../components/ExpensesList";
import { ExpensesContext } from "../store/expenses-context";

const AllExpensesScreen = () => {
  const expensesCtx = useContext(ExpensesContext);
  const allExpenses = expensesCtx.expenses;
  return <ExpensesList title="Total" data={allExpenses} />;
};
export default AllExpensesScreen;
