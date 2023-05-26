import { useContext, useEffect } from "react";

import ExpensesOutput from "../components/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { isNotBeforeXDays } from "../util/date";
import { fetchExpense } from "../util/http";

const RecentExpensesScreen = () => {
  const expensesCtx = useContext(ExpensesContext);
  useEffect(() => {
    async function getExpenses() {
      const expensesData = await fetchExpense(expensesCtx.reqRootUrl);
      expensesCtx.setExpenses(expensesData);
    }
    getExpenses();
  }, []);
  const recentExpenses = expensesCtx.expensesState.filter((expense) => {
    return isNotBeforeXDays(expense.date, 7);
  });
  return <ExpensesOutput title="Last 7 Days" data={recentExpenses} />;
};

export default RecentExpensesScreen;
