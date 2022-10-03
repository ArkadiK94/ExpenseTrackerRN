import { Text, View, StyleSheet } from "react-native";

import TriggersForNavigation from "../UI/TriggersForNavigation";
import { GlobalStyles } from "../../util/styles";
import { getFormattedDate } from "../../util/date";

const ExpensesItem = ({ title, date, price, id }) => {
  return (
    <TriggersForNavigation
      screenName="ManageExpenseScreen"
      style={styles.mainContainer}
      android_ripple_color={GlobalStyles.colors.primary900}
      expenseId={id}
    >
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{getFormattedDate(date)}</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>{price}</Text>
      </View>
    </TriggersForNavigation>
  );
};

export default ExpensesItem;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 8,
    borderRadius: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    width: "90%",
    alignSelf: "center",
    padding: 10,
    margin: 10,
  },
  title: {
    fontSize: 18,
    color: GlobalStyles.colors.primary200,
    fontWeight: "bold",
  },
  date: {
    fontSize: 16,
    color: GlobalStyles.colors.primary200,
    fontWeight: "300",
  },
  priceContainer: {
    width: 90,
    height: 50,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderColor: GlobalStyles.colors.primary700,
    borderWidth: 2,
    elevation: 4,
  },
  price: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
    fontSize: 18,
  },
});
