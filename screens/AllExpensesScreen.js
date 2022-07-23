import { useContext } from "react";

import ExpensesList from "../components/ExpensesList";
import { ExpensesContext } from "../store/expenses-context";

const AllExpensesScreen = () => {
  const expensesCtx = useContext(ExpensesContext);
  const allExpenses = expensesCtx.expenses;
  const expensesSum = allExpenses.reduce((total, item) => {
    return total + item.price;
  }, 0);
  return <ExpensesList title="Total" sum={expensesSum} data={allExpenses} />;
};
export default AllExpensesScreen;
