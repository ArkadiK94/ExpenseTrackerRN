import { FlatList } from "react-native";

import ExpensesItem from "./ExpensesItem";

const ExpensesList = ({ data }) => {
  return (
    <FlatList
      data={data}
      renderItem={(itemData) => {
        return <ExpensesItem {...itemData.item} />;
      }}
      keyExtractor={(item) => {
        return item.id;
      }}
    />
  );
};

export default ExpensesList;
