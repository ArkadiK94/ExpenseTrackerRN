import { View, StyleSheet, Text } from "react-native";
import { useContext, useLayoutEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

import CancelWithActionBtns from "../components/UI/CancelWithActionBtns";
import { GlobalStyles } from "../util/styles";
import TriggersForNavigation from "../components/UI/TriggersForNavigation";
import { ExpensesContext } from "../store/expenses-context";
import Expense from "../models/expense";

const ManageExpenseScreen = ({ route, navigation }) => {
  const expensesCtx = useContext(ExpensesContext);
  const expenseId = route.params?.itemId;
  const isEditing = !!expenseId;
  let renderScreenMode;
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  renderScreenMode = <CancelWithActionBtns actionName="Add" />;

  if (isEditing) {
    const removeHeandler = () => {
      expensesCtx.removeExpense(expenseId);
    };
    renderScreenMode = (
      <>
        <CancelWithActionBtns actionName="Update" />
        <Text style={styles.underLine}></Text>
        <TriggersForNavigation
          screenName="BottomTabs"
          style={styles.bin}
          onPress={removeHeandler}
        >
          <Ionicons
            name="trash-outline"
            color={GlobalStyles.colors.secondery700}
            size={35}
          />
        </TriggersForNavigation>
      </>
    );
  }

  return <View style={styles.rootContainer}>{renderScreenMode}</View>;
};
export default ManageExpenseScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: "center",
  },
  underLine: {
    width: "90%",
    borderWidth: 1,
    height: 0,
    borderColor: GlobalStyles.colors.secondery200,
  },
  bin: {
    marginTop: 20,
    alignSelf: "center",
  },
});
