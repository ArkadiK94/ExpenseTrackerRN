import { View, StyleSheet } from "react-native";

import CancelWithActionBtns from "../components/CancelWithActionBtns";

const AddExpenseScreen = () => {
  return (
    <View style={styles.rootContainer}>
      <CancelWithActionBtns actionName="Add" />
    </View>
  );
};
export default AddExpenseScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});
