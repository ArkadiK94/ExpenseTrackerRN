import { View, Text, StyleSheet } from "react-native";

import { GlobalStyles } from "../../util/styles";

const ExpensesTotalItem = ({ title, expenses }) => {
  const expensesSum = expenses.reduce((total, item) => {
    return total + item.price;
  }, 0);
  return (
    <View style={styles.totalItemContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.sum}>${expensesSum.toFixed(2)}</Text>
    </View>
  );
};

export default ExpensesTotalItem;

const styles = StyleSheet.create({
  totalItemContainer: {
    width: "90%",
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 8,
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 10,
    padding: 10,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "space-between",
  },
  title: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "500",
  },
  sum: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "900",
    fontSize: 22,
  },
});
