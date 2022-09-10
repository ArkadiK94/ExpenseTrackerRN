import { useContext } from "react";

import ExpensesOutput from "../components/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";

const isNotBeforeXDays = (date, days) => {
  const msOfDays = days * 24 * 60 * 60 * 1000;
  const msTillToday = new Date() - new Date(date);
  return msTillToday < msOfDays;
};

const RecentExpensesScreen = () => {
  const expensesCtx = useContext(ExpensesContext);
  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    return isNotBeforeXDays(expense.date, 7);
  });
  const recentExpensesInOrder = recentExpenses.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });
  return <ExpensesOutput title="Last 7 Days" data={recentExpensesInOrder} />;
};

export default RecentExpensesScreen;
