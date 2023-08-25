import { useContext, useEffect, useState } from "react";

import ExpensesOutput from "../components/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { AuthContext } from "../store/auth-context";
import { fetchExpense } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import { isNotBeforeXDays } from "../util/date";

const ExpensesGeneral = ({ title, days }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const expensesCtx = useContext(ExpensesContext);
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    async function getExpenses() {
      setIsLoading(true);
      try {
        const expensesData = await fetchExpense(
          authCtx.token,
          authCtx.userEmail
        );
        expensesCtx.setExpenses(expensesData);
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    }
    getExpenses();
  }, []);
  async function errorHandler() {
    try {
      const expensesData = await fetchExpense(authCtx.token, authCtx.userEmail);
      expensesCtx.setExpenses(expensesData);
      setError(null);
    } catch (error) {
      setError("Try again later!");
    }
  }

  if (error) {
    return (
      <ErrorOverlay
        message={error}
        onConfirm={error === "Try again later!" ? null : errorHandler}
      />
    );
  }

  if (isLoading) {
    return <LoadingOverlay />;
  }

  let expenses = expensesCtx.expensesState;
  if (days) {
    expenses = expenses.filter((expense) => {
      return isNotBeforeXDays(expense.date, days);
    });
  }

  return <ExpensesOutput title={title} data={expenses} />;
};
export default ExpensesGeneral;
