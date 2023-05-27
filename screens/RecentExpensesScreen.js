import { useContext, useEffect, useState } from "react";

import ExpensesOutput from "../components/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { isNotBeforeXDays } from "../util/date";
import { fetchExpense } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";

const RecentExpensesScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const expensesCtx = useContext(ExpensesContext);
  useEffect(() => {
    async function getExpenses() {
      setIsLoading(true);
      const expensesData = await fetchExpense();
      setIsLoading(false);
      expensesCtx.setExpenses(expensesData);
    }
    getExpenses();
  }, []);
  if (isLoading) {
    return <LoadingOverlay />;
  }
  const recentExpenses = expensesCtx.expensesState.filter((expense) => {
    return isNotBeforeXDays(expense.date, 7);
  });
  return <ExpensesOutput title="Last 7 Days" data={recentExpenses} />;
};

export default RecentExpensesScreen;
