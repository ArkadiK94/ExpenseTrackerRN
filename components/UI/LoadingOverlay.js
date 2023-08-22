import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { GlobalStyles } from "../../util/styles";

function LoadingOverlay() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Loading...</Text>
      <ActivityIndicator size="large" color={GlobalStyles.colors.primary200} />
    </View>
  );
}

export default LoadingOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  text: {
    textAlign: "center",
    color: GlobalStyles.colors.primary200,
  },
});
