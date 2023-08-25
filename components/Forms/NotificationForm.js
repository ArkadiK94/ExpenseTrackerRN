import { View, Text, StyleSheet } from "react-native";

import { GlobalStyles } from "../../util/styles";
import Button from "../UI/Button";

const NotificationForm = ({ actionName }) => {
  const submitHandler = () => {
    console.log(timeInput);
  };
  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>Schedule Notification</Text>
      <View style={styles.btnsContainer}>
        <Button
          title="Cancel"
          btnStyle={styles.secondaryBtn}
          color={GlobalStyles.colors.primary400}
          textStyle={styles.secondaryBtnText}
        />
        <Button
          title={actionName}
          btnStyle={styles.mainBtn}
          color={GlobalStyles.colors.primary900}
          textStyle={styles.mainBtnText}
          onPressAction={submitHandler}
        />
      </View>
    </View>
  );
};

export default NotificationForm;

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 80,
    paddingHorizontal: 20,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 30,
  },
  error: {
    color: GlobalStyles.colors.secondery700,
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
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
    height: 40,
    width: "100%",
  },
  mainBtnText: {
    color: GlobalStyles.colors.primary200,
    fontSize: 16,
  },
  secondaryBtn: {
    backgroundColor: GlobalStyles.colors.primary900,
    borderRadius: 8,
    height: 40,
  },
  secondaryBtnText: {
    color: GlobalStyles.colors.secondery200,
    fontSize: 16,
  },
});
