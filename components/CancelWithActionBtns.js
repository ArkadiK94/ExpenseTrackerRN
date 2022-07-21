import { Text, View, StyleSheet } from "react-native";

import Colors from "../util/colors";
import TriggerForNavigation from "../components/TriggersForNavigation";

const CancelWithActionBtns = ({ actionName, onPressAction }) => {
  return (
    <View style={styles.btnsContainer}>
      <TriggerForNavigation
        screenName="BottomTabs"
        style={styles.secondaryBtn}
        android_ripple_color={Colors.primary100}
      >
        <Text style={styles.secondaryBtnText}>Cancel</Text>
      </TriggerForNavigation>
      <TriggerForNavigation
        screenName="BottomTabs"
        style={styles.mainBtn}
        onPress={onPressAction}
        android_ripple_color={Colors.primary100}
      >
        <Text style={styles.mainBtnText}>{actionName}</Text>
      </TriggerForNavigation>
    </View>
  );
};

export default CancelWithActionBtns;

const styles = StyleSheet.create({
  btnsContainer: {
    width: "40%",
    flexDirection: "row",
    paddingTop: 25,
    paddingBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  mainBtn: {
    backgroundColor: Colors.primary400,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    paddingHorizontal: 50,
  },
  mainBtnText: {
    color: Colors.primary200,
    fontSize: 16,
  },
  secondaryBtn: {
    backgroundColor: Colors.primary900,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    paddingHorizontal: 50,
  },
  secondaryBtnText: {
    color: Colors.secondery200,
    fontSize: 16,
  },
});
