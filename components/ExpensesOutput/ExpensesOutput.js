import { StyleSheet, View, Text } from "react-native";

import ExpensesTotalItem from "./ExpensesTotalItem";
import ExpensesList from "./ExpensesList";

const ExpensesOutput = ({ title, data }) => {
  if (!data.length) {
    return <Text style={styles.message}>There Are No {title} Expenses</Text>;
  }
  const recentExpensesInOrder = data.sort((dateFirst, dateSecond) => {
    return new Date(dateSecond.date) - new Date(dateFirst.date);
  });
  return (
    <View style={styles.rootContainer}>
      <ExpensesTotalItem title={title} expenses={data} />
      <ExpensesList data={recentExpensesInOrder} />
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
