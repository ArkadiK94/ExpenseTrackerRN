import { View, StyleSheet, FlatList } from "react-native";

import ExpensesTotalItem from "./ExpensesTotalItem";
import ExpensesItem from "./ExpensesItem";

const ExpensesList = ({ title, data }) => {
  return (
    <View style={styles.rootContainer}>
      <ExpensesTotalItem title={title} expenses={data} />
      <FlatList
        data={data}
        renderItem={(itemData) => {
          return (
            <ExpensesItem
              title={itemData.item.title}
              date={itemData.item.date}
              price={itemData.item.price}
              id={itemData.item.id}
            />
          );
        }}
        keyExtractor={(item) => {
          return item.id;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});

export default ExpensesList;
