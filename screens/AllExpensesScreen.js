import { useContext } from "react";

import ExpensesOutput from "../components/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";

const AllExpensesScreen = () => {
  const expensesCtx = useContext(ExpensesContext);
  const allExpenses = expensesCtx.expensesState;
  return <ExpensesOutput title="Total" data={allExpenses} />;
};
export default AllExpensesScreen;
