import { Pressable, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Triggers = ({
  screenName,
  children,
  onPress = null,
  style,
  expenseId,
  color = null,
  needToNavigate = true,
}) => {
  const navigation = useNavigation();
  const pressHandler = () => {
    if (onPress) {
      onPress();
      return;
    }
    if (screenName) {
      if (expenseId) {
        navigation.navigate(screenName, { itemId: expenseId });
        return;
      } else {
        navigation.navigate(screenName);
        return;
      }
    }
    if (needToNavigate) navigation.goBack();
  };
  return (
    <View style={styles.outerContainer}>
      <Pressable
        onPress={pressHandler}
        android_ripple={{ color: color }}
        style={({ pressed }) =>
          pressed
            ? [styles.innerContainer, styles.pressed, style]
            : [styles.innerContainer, style]
        }
      >
        {children}
      </Pressable>
    </View>
  );
};

export default Triggers;

const styles = StyleSheet.create({
  outerContainer: {
    width: "100%",
    overflow: "hidden",
    borderRadius: 8,
  },
  pressed: {
    opacity: 0.7,
  },
});
