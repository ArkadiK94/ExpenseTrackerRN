import { useContext, useEffect, useState } from "react";

import ExpensesOutput from "../components/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { fetchExpense } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";

const AllExpensesScreen = () => {
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
  const allExpenses = expensesCtx.expensesState;
  return <ExpensesOutput title="Total" data={allExpenses} />;
};
export default AllExpensesScreen;
