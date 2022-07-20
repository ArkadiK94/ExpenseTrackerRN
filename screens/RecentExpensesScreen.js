import { Text, Pressable, View, StyleSheet } from "react-native";

const RecentExpensesScreen = ({ navigation }) => {
  const editPressHander = () => {
    navigation.navigate("EditExpense");
  };
  return (
    <View style={styles.rootContainer}>
      <Pressable style={styles.btnContainer} onPress={editPressHander}>
        <Text style={styles.text}>Edit in Recent</Text>
      </Pressable>
    </View>
  );
};
export default RecentExpensesScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 24,
  },
  btnContainer: {
    height: 100,
    width: 100,
    borderWidth: 5,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});
