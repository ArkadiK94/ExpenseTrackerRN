import { StyleSheet, View } from "react-native";

import ExpensesTotalItem from "./ExpensesTotalItem";
import ExpensesList from "./ExpensesList";

const ExpensesOutput = ({ title, data }) => {
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
});
