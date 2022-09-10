import { View, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";

import CancelWithActionBtns from "../components/UI/CancelWithActionBtns";
import { GlobalStyles } from "../util/styles";
import TriggersForNavigation from "../components/UI/TriggersForNavigation";
import { ExpensesContext } from "../store/expenses-context";

const EditExpenseScreen = ({ route }) => {
  const expensesCtx = useContext(ExpensesContext);
  const expenseId = route.params.itemId;

  const removeHeandler = () => {
    expensesCtx.removeExpense(expenseId);
  };

  return (
    <View style={styles.rootContainer}>
      <CancelWithActionBtns actionName="Update" />
      <Text style={styles.underLine}></Text>
      <TriggersForNavigation
        screenName="BottomTabs"
        style={styles.bin}
        android_ripple_color={GlobalStyles.colors.primary500}
        onPress={removeHeandler}
      >
        <Ionicons
          name="trash-outline"
          color={GlobalStyles.colors.secondery700}
          size={35}
        />
      </TriggersForNavigation>
    </View>
  );
};
export default EditExpenseScreen;

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
