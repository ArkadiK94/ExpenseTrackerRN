import { View, StyleSheet } from "react-native";

import ExpensesTotalItem from "./ExpensesTotalItem";
import ExpensesItem from "./ExpensesItem";

const ExpensesList = ({ title, sum }) => {
  return (
    <View style={styles.rootContainer}>
      <ExpensesTotalItem title={title} sum={sum} />
      <ExpensesItem title="Test" date="2022-5-19" price="19.99" />
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export default ExpensesList;
