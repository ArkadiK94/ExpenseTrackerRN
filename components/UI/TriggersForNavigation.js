import { Pressable, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const TriggersForNavigation = ({
  screenName,
  children,
  onPress = null,
  style,
  expenseId,
  android_ripple_color = "#fff",
}) => {
  const navigation = useNavigation();
  const pressHandler = () => {
    if (onPress) {
      onPress();
    }
    if (expenseId) {
      navigation.navigate(screenName, { itemId: expenseId });
    } else {
      navigation.navigate(screenName);
    }
  };
  return (
    <View style={styles.outerContainer}>
      <Pressable
        onPress={pressHandler}
        android_ripple={{ color: android_ripple_color }}
        style={[styles.innerContainer, style]}
      >
        {children}
      </Pressable>
    </View>
  );
};

export default TriggersForNavigation;

const styles = StyleSheet.create({
  outerContainer: {
    width: "100%",
    overflow: "hidden",
    borderRadius: 8,
  },
  innerContainer: {},
});
