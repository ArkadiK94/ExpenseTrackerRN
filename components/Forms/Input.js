import { View, Text, TextInput, StyleSheet } from "react-native";

import { GlobalStyles } from "../../util/styles";

const Input = ({ label, textInputConfig, isValid, labelStyle }) => {
  const multilineInput = textInputConfig && textInputConfig.multiline;
  const textInputStyles = [styles.textInput];
  if (multilineInput) {
    textInputStyles.push(styles.multilineStyle);
  }
  if (!isValid) {
    textInputStyles.push(styles.textInputError);
  }
  return (
    <View style={styles.inputContainer}>
      <Text
        style={
          isValid
            ? [styles.label, labelStyle]
            : [styles.label, labelStyle, styles.labelError]
        }
      >
        {label}
      </Text>
      <TextInput {...textInputConfig} style={textInputStyles}></TextInput>
    </View>
  );
};
export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    margin: 5,
  },
  label: {
    color: GlobalStyles.colors.primary200,
    fontWeight: "300",
    fontSize: 12,
    marginBottom: 3,
  },
  textInput: {
    backgroundColor: GlobalStyles.colors.primary200,
    borderRadius: 8,
    fontSize: 18,
    paddingVertical: 2,
    paddingHorizontal: 10,
    color: GlobalStyles.colors.primary400,
  },
  multilineStyle: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  labelError: {
    color: GlobalStyles.colors.secondery600,
  },
  textInputError: {
    backgroundColor: GlobalStyles.colors.secondery100,
  },
});
