import { ScrollView, StyleSheet, Text, View } from "react-native";

import Input from "./Input";
import { GlobalStyles } from "../../util/styles";
import Button from "../UI/Button";
import { useState } from "react";

const AuthForm = ({
  signupMode,
  btnMainText,
  btnSecondaryText,
  btnSecondaryFunc,
  onSubmit,
}) => {
  const [inputs, setInputs] = useState({
    email: {
      value: "",
      isValid: true,
    },
    confirmEmail: {
      value: "",
      isValid: true,
    },
    password: {
      value: "",
      isValid: true,
    },
    confirmPassword: {
      value: "",
      isValid: true,
    },
    inputInvalid: false,
  });

  const changeHandler = (inputId, enteredText) => {
    setInputs((prevInputs) => {
      return {
        ...prevInputs,
        inputInvalid: false,
        [inputId]: {
          value: enteredText,
          isValid: true,
        },
      };
    });
  };

  const submitHandler = () => {
    const minPasswordLength = 8;
    const { email, password, confirmEmail, confirmPassword } = inputs;
    const emailValid = email.value.includes("@");
    const passwordValid = password.value.length > minPasswordLength;
    let confirmEmailValid = true;
    let confirmPasswordValid = true;
    if (signupMode) {
      confirmEmailValid =
        confirmEmail.value && email.value === confirmEmail.value;
      confirmPasswordValid =
        confirmPassword.value && password.value === confirmPassword.value;
    }
    if (
      !emailValid ||
      !passwordValid ||
      !confirmEmailValid ||
      !confirmPasswordValid
    ) {
      setInputs((prevInputs) => {
        return {
          email: {
            ...prevInputs.email,
            isValid: emailValid,
          },
          confirmEmail: {
            ...prevInputs.confirmEmail,
            isValid: confirmEmailValid,
          },
          password: {
            ...prevInputs.password,
            isValid: passwordValid,
          },
          confirmPassword: {
            ...prevInputs.confirmPassword,
            isValid: confirmPasswordValid,
          },
          inputInvalid: true,
        };
      });
      return;
    }
    const enteredData = { email: email.value, password: password.value };
    onSubmit(enteredData);
  };

  return (
    <ScrollView>
      <View style={styles.formContainer}>
        <View style={styles.inputsContainer}>
          <Input
            label="Email Address"
            isValid={inputs.email.isValid}
            labelStyle={styles.label}
            textInputConfig={{
              onChangeText: changeHandler.bind(this, "email"),
              value: inputs.email.value,
              keyboardType: "email-address",
            }}
          />
          {signupMode && (
            <Input
              label="Confirm Email Address"
              isValid={inputs.confirmEmail.isValid}
              labelStyle={styles.label}
              textInputConfig={{
                onChangeText: changeHandler.bind(this, "confirmEmail"),
                value: inputs.confirmEmail.value,
                keyboardType: "email-address",
              }}
            />
          )}
          <Input
            label="Password"
            isValid={inputs.password.isValid}
            labelStyle={styles.label}
            textInputConfig={{
              onChangeText: changeHandler.bind(this, "password"),
              value: inputs.password.value,
              secureTextEntry: true,
            }}
          />
          {signupMode && (
            <Input
              label="Confirm Password"
              isValid={inputs.confirmPassword.isValid}
              labelStyle={styles.label}
              textInputConfig={{
                onChangeText: changeHandler.bind(this, "confirmPassword"),
                value: inputs.confirmPassword.value,
                secureTextEntry: true,
              }}
            />
          )}
        </View>
        {inputs.inputInvalid && (
          <Text style={styles.error}>
            Note: password has to be more than 8 chars {"\n"}
            Invalid input values - please check your entered data!
          </Text>
        )}
        <View style={styles.btnsContainer}>
          <Button
            title={btnMainText}
            btnStyle={styles.mainBtn}
            textStyle={styles.mainTextStyle}
            onPressAction={submitHandler}
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
  error: {
    color: GlobalStyles.colors.secondery700,
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
});
