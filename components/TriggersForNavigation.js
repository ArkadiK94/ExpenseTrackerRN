import { Pressable, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const TriggersForNavigation = ({
  screenName,
  children,
  onPress = null,
  style,
  android_ripple_color,
}) => {
  const navigation = useNavigation();
  const pressHandler = () => {
    if (onPress) {
      onPress();
    }
    navigation.navigate(screenName);
  };
  return (
    <Pressable onPress={pressHandler} android_ripple={{ color: "#fff" }}>
      <View style={style}>{children}</View>
    </Pressable>
  );
};

export default TriggersForNavigation;
