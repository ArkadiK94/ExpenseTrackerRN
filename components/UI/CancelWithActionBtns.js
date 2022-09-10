import { Text, View, StyleSheet } from "react-native";

import { GlobalStyles } from "../../util/styles";
import TriggersForNavigation from "./TriggersForNavigation";

const CancelWithActionBtns = ({ actionName, onPressAction }) => {
  return (
    <View style={styles.btnsContainer}>
      <TriggersForNavigation
        screenName="BottomTabs"
        style={styles.secondaryBtn}
        android_ripple_color={GlobalStyles.colors.primary100}
      >
        <Text style={styles.secondaryBtnText}>Cancel</Text>
      </TriggersForNavigation>
      <TriggersForNavigation
        screenName="BottomTabs"
        style={styles.mainBtn}
        onPress={onPressAction}
        android_ripple_color={GlobalStyles.colors.primary100}
      >
        <Text style={styles.mainBtnText}>{actionName}</Text>
      </TriggersForNavigation>
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
    backgroundColor: GlobalStyles.colors.primary400,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
  },
  mainBtnText: {
    color: GlobalStyles.colors.primary200,
    fontSize: 16,
  },
  secondaryBtn: {
    backgroundColor: GlobalStyles.colors.primary900,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
  },
  secondaryBtnText: {
    color: GlobalStyles.colors.secondery200,
    fontSize: 16,
  },
});
