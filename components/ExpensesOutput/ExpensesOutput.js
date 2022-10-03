import { StyleSheet, View, Text } from "react-native";

import ExpensesTotalItem from "./ExpensesTotalItem";
import ExpensesList from "./ExpensesList";

const ExpensesOutput = ({ title, data }) => {
  if (!data.length) {
    return <Text style={styles.message}>There Are No {title} Expenses</Text>;
  }
  return (
    <View style={styles.rootContainer}>
      <ExpensesTotalItem title={title} expenses={data} />
      <ExpensesList data={data} />
    </View>
  );
};
export default ExpensesOutput;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  message: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
    marginTop: 50,
  },
});
