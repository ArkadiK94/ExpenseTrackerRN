import { View, StyleSheet, Text } from "react-native";

import Button from "./Button";
import { GlobalStyles } from "../../util/styles";

function ErrorOverlay({ message, onConfirm }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An error occurred!</Text>
      <Text style={styles.text}>{message}</Text>
      {onConfirm && <Button onPressAction={onConfirm} title="Okay"></Button>}
    </View>
  );
}

export default ErrorOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "space-between",
    backgroundColor: GlobalStyles.colors.primary700,
  },
  text: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    marginBottom: 5,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
  },
});
