import { Text, View, StyleSheet } from "react-native";

import { GlobalStyles } from "../../util/styles";
import Triggers from "./Triggers";

const CancelWithActionBtns = ({ actionName, onPressAction }) => {
  return (
    <View style={styles.btnsContainer}>
      <Triggers
        style={styles.secondaryBtn}
        color={GlobalStyles.colors.primary400}
      >
        <Text style={styles.secondaryBtnText}>Cancel</Text>
      </Triggers>
      <Triggers
        style={styles.mainBtn}
        onPress={onPressAction}
        color={GlobalStyles.colors.primary900}
      >
        <Text style={styles.mainBtnText}>{actionName}</Text>
      </Triggers>
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
    alignSelf: "center",
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
