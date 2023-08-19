import { ScrollView, StyleSheet, View } from "react-native";

import Input from "./Input";
import { GlobalStyles } from "../../util/styles";
import Button from "../UI/Button";

const AuthForm = ({
  signupMode,
  btnMainText,
  btnSecondaryText,
  btnSecondaryFunc,
}) => {
  return (
    <ScrollView>
      <View style={styles.formContainer}>
        <View style={styles.inputsContainer}>
          <Input
            label="Email Address"
            isValid={true}
            labelStyle={styles.label}
          />
          {signupMode && (
            <Input
              label="Confirm Email Address"
              isValid={true}
              labelStyle={styles.label}
            />
          )}
          <Input label="Password" isValid={true} labelStyle={styles.label} />
          {signupMode && (
            <Input
              label="Confirm Password"
              isValid={true}
              labelStyle={styles.label}
            />
          )}
        </View>
        <View style={styles.btnsContainer}>
          <Button
            title={btnMainText}
            btnStyle={styles.mainBtn}
            textStyle={styles.mainTextStyle}
          />
          <Button
            title={btnSecondaryText}
            btnStyle={styles.secondaryBtn}
            textStyle={styles.secondaryTextStyle}
            screenToNavigate={btnSecondaryFunc()}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default AuthForm;

const styles = StyleSheet.create({
  formContainer: {
    marginHorizontal: 30,
    marginTop: 60,
    paddingHorizontal: 15,
    paddingTop: 25,
    paddingBottom: 10,
    backgroundColor: GlobalStyles.colors.primary900,
    borderRadius: 8,
    elevation: 10,
  },
  inputsContainer: {
    marginBottom: 10,
  },
  btnsContainer: {
    height: 90,
    justifyContent: "space-between",
    padding: 5,
  },
  label: {
    color: GlobalStyles.colors.primary100,
    fontSize: 14,
  },
  mainBtn: {
    width: "100%",
    height: 35,
  },
  mainTextStyle: {
    fontWeight: "600",
  },
  secondaryBtn: {
    backgroundColor: GlobalStyles.colors.primary900,
  },
  secondaryTextStyle: {
    color: GlobalStyles.colors.primary200,
    fontWeight: "300",
  },
});
