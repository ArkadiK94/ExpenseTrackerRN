import { Pressable, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const TriggersForNavigation = ({
  screenName,
  children,
  onPress = null,
  style,
}) => {
  const navigation = useNavigation();
  const pressHandler = () => {
    if (onPress) {
      onPress();
    }
    navigation.navigate(screenName);
  };
  return (
    <Pressable onPress={pressHandler}>
      <View style={style}>{children}</View>
    </Pressable>
  );
};

export default TriggersForNavigation;
