import { View, Text, StyleSheet } from "react-native";

import Colors from "../../util/colors";

const ExpensesTotalItem = ({ title, sum }) => {
  return (
    <View style={styles.totalItemContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.sum}>${sum.toFixed(2)}</Text>
    </View>
  );
};

export default ExpensesTotalItem;

const styles = StyleSheet.create({
  totalItemContainer: {
    width: "90%",
    backgroundColor: Colors.primary100,
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
    color: Colors.primary500,
    fontWeight: "500",
  },
  sum: {
    color: Colors.primary500,
    fontWeight: "900",
    fontSize: 22,
  },
});
