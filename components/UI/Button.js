import { Text, StyleSheet, View } from "react-native";

import { GlobalStyles } from "../../util/styles";
import Triggers from "./Triggers";

const Button = ({ title, onPressAction }) => {
  return (
    <View style={styles.container}>
      <Triggers
        style={styles.btn}
        onPress={onPressAction}
        color={GlobalStyles.colors.primary900}
        needToNavigate={false}
      >
        <Text style={styles.btnText}>{title}</Text>
      </Triggers>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: GlobalStyles.colors.primary400,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 100,
    marginVertical: 10,
    marginLeft: "auto",
    marginRight: "auto",
  },
  btnText: {
    color: GlobalStyles.colors.primary100,
    fontSize: 16,
  },
});
