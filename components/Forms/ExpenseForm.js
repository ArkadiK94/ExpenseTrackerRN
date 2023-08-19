import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";

import Expense from "../../models/expense";
import { getFormattedDate } from "../../util/date";
import Input from "./Input";
import { GlobalStyles } from "../../util/styles";
import Button from "../UI/Button";

const ExpenseForm = ({ onSubmit, actionName, editExpense }) => {
  const [input, setInput] = useState({
    price: {
      value: editExpense ? editExpense.price.toString() : "",
      isValid: true,
    },
    date: {
      value: editExpense ? getFormattedDate(editExpense.date) : "",
      isValid: true,
    },
    title: {
      value: editExpense ? editExpense.title : "",
      isValid: true,
    },
  });
  const changeHandler = (inputId, enteredText) => {
    setInput((prevInputs) => {
      return {
        ...prevInputs,
        [inputId]: {
          value: enteredText,
          isValid: true,
        },
      };
    });
  };

  const submitHandler = () => {
    const enteredData = new Expense(
      input.title.value.trim(),
      +input.price.value,
      input.date.value
    );
    const dateInvalid = enteredData.date.toString() === "Invalid Date";
    const priceInvalid = isNaN(enteredData.price) || enteredData.price <= 0;
    const titleInvalid = enteredData.title.trim().length <= 0;
    if (dateInvalid || priceInvalid || titleInvalid) {
      setInput((prevInputs) => {
        return {
          price: {
            value: prevInputs.price.value,
            isValid: !priceInvalid,
          },
          date: {
            value: prevInputs.date.value,
            isValid: !dateInvalid,
          },
          title: {
            value: prevInputs.title.value,
            isValid: !titleInvalid,
          },
        };
      });
      return;
    }
    onSubmit(enteredData);
  };
  const inputInvalid =
    !input.date.isValid || !input.price.isValid || !input.title.isValid;
  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsInARow}>
        <Input
          label="Price"
          textInputConfig={{
            maxLength: 5,
            keyboardType: "decimal-pad",
            onChangeText: changeHandler.bind(this, "price"),
            value: input.price.value,
          }}
          isValid={input.price.isValid}
        />
        <Input
          label="Date"
          textInputConfig={{
            maxLength: 10,
            onChangeText: changeHandler.bind(this, "date"),
            placeholder: "YYYY-MM-DD",
            value: input.date.value,
          }}
          isValid={input.date.isValid}
        />
      </View>
      <Input
        label="Title"
        textInputConfig={{
          multiline: true,
          onChangeText: changeHandler.bind(this, "title"),
          value: input.title.value,
        }}
        isValid={input.title.isValid}
      />
      {inputInvalid && (
        <Text style={styles.error}>
          Invalid input values - please check your entered data!
        </Text>
      )}
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

export default ExpenseForm;

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
  inputsInARow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    justifyContent: "center",
    alignItems: "center",
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
    justifyContent: "center",
    alignItems: "center",
    height: 40,
  },
  secondaryBtnText: {
    color: GlobalStyles.colors.secondery200,
    fontSize: 16,
  },
});
