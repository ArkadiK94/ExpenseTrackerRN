import { Text, View, StyleSheet } from "react-native";

import TriggersForNavigation from "../TriggersForNavigation";
import Colors from "../../util/colors";

const ExpensesItem = ({ title, date, price, id }) => {
  return (
    <TriggersForNavigation
      screenName="EditExpense"
      style={{ alignItems: "center" }}
      android_ripple_color={Colors.primary100}
    >
      <View style={styles.mainContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{price}</Text>
        </View>
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
    backgroundColor: Colors.primary500,
    width: "75%",
    padding: 10,
  },
});
