import { useContext, useEffect } from "react";

import ExpensesOutput from "../components/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { fetchExpense } from "../util/http";

const AllExpensesScreen = () => {
  const expensesCtx = useContext(ExpensesContext);
  useEffect(() => {
    async function getExpenses() {
      const expensesData = await fetchExpense(expensesCtx.reqRootUrl);
      expensesCtx.setExpenses(expensesData);
    }
    getExpenses();
  }, []);
  const allExpenses = expensesCtx.expensesState;
  return <ExpensesOutput title="Total" data={allExpenses} />;
};
export default AllExpensesScreen;
