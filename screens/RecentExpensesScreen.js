import { useContext } from "react";

import ExpensesOutput from "../components/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { isNotBeforeXDays } from "../util/date";

const RecentExpensesScreen = () => {
  const expensesCtx = useContext(ExpensesContext);
  const recentExpenses = expensesCtx.expensesState.filter((expense) => {
    return isNotBeforeXDays(expense.date, 7);
  });
  const recentExpensesInOrder = recentExpenses.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });
  return <ExpensesOutput title="Last 7 Days" data={recentExpensesInOrder} />;
};

export default RecentExpensesScreen;
