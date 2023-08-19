import { StyleSheet, Text, ScrollView } from "react-native";
import { useContext, useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import { GlobalStyles } from "../util/styles";
import Triggers from "../components/UI/Triggers";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/Forms/ExpenseForm";
import { storeExpense, updateExpense, deleteExpense } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const ManageExpenseScreen = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const expensesCtx = useContext(ExpensesContext);
  const expenseId = route.params?.itemId;
  const isEditing = !!expenseId;
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  let removeHeandler;
  let editExpense = null;
  if (isEditing) {
    removeHeandler = async () => {
      setIsLoading(true);
      try {
        await deleteExpense(expenseId);
        expensesCtx.removeExpense(expenseId);
        navigation.goBack();
      } catch (err) {
        setError(err.message);
      }
    };
    editExpense = expensesCtx.expensesState.find(
      (item) => item.id === expenseId
    );
  }

  const submitHandler = async (expenseDataObj) => {
    setIsLoading(true);
    try {
      if (isEditing) {
        await updateExpense(expenseId, expenseDataObj);
        expensesCtx.updateExpense(expenseDataObj, expenseId);
      } else {
        const id = await storeExpense(expenseDataObj);
        expensesCtx.addExpense({ ...expenseDataObj, id: id });
      }
      navigation.goBack();
    } catch (err) {
      setError(err.message);
    }
  };
  function errorHandler() {
    setError(null);
    navigation.goBack();
  }
  if (error) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }
  if (isLoading) {
    return <LoadingOverlay />;
  }
  return (
    <ScrollView style={styles.rootContainer}>
      <ExpenseForm
        onSubmit={submitHandler}
        actionName={isEditing ? "Update" : "Add"}
        editExpense={editExpense}
      />
      {isEditing && (
        <>
          <Text style={styles.underLine}></Text>
          <Triggers
            screenName="BottomTabs"
            style={styles.bin}
            onPress={removeHeandler}
          >
            <Ionicons
              name="trash-outline"
              color={GlobalStyles.colors.secondery700}
              size={35}
            />
          </Triggers>
        </>
      )}
    </ScrollView>
  );
};
export default ManageExpenseScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  underLine: {
    width: "90%",
    borderWidth: 1,
    height: 0,
    borderColor: GlobalStyles.colors.secondery200,
    alignSelf: "center",
  },
  bin: {
    marginTop: 20,
    alignSelf: "center",
  },
});
