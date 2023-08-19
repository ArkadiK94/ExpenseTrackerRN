import { Text, StyleSheet, View } from "react-native";

import { GlobalStyles } from "../../util/styles";
import Triggers from "./Triggers";

const Button = ({
  btnStyle,
  title,
  onPressAction,
  screenToNavigate,
  color,
  textStyle,
}) => {
  return (
    <>
      <Triggers
        style={[styles.btn, btnStyle]}
        onPress={onPressAction}
        screenName={screenToNavigate}
        color={color}
      >
        <Text style={[styles.btnText, textStyle]}>{title}</Text>
      </Triggers>
    </>
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
    minWidth: 100,
    marginLeft: "auto",
    marginRight: "auto",
  },
  btnText: {
    color: GlobalStyles.colors.primary100,
    fontSize: 16,
  },
});
