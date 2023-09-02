import { View, Text, StyleSheet, Pressable } from "react-native";
import { useContext, useState } from "react";

import Expense from "../../models/expense";
import { getFormattedDate } from "../../util/date";
import Input from "./Input";
import { GlobalStyles } from "../../util/styles";
import Button from "../UI/Button";
import { AuthContext } from "../../store/auth-context";
import DatePicker from "react-native-date-picker";

const ExpenseForm = ({ onSubmit, actionName, editExpense }) => {
  const authCtx = useContext(AuthContext);
  const [datePicking, setDatePicking] = useState(getFormattedDate(new Date()));
  const [input, setInput] = useState({
    price: {
      value: editExpense ? editExpense.price.toString() : "",
      isValid: true,
    },
    date: {
      value: editExpense
        ? getFormattedDate(editExpense.date)
        : getFormattedDate(new Date()),
      isValid: true,
    },
    title: {
      value: editExpense ? editExpense.title : "",
      isValid: true,
    },
  });
  const [showPickDate, setShowPickDate] = useState(false);
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
  const changeDateHandler = (newDate) => {
    setDatePicking(getFormattedDate(newDate));
  };
  const pressDateHandler = () => {
    setShowPickDate(true);
  };
  const pressCancelDatePickerHandler = () => {
    setShowPickDate(false);
  };
  const submitHandler = () => {
    const enteredData = new Expense(
      input.title.value.trim(),
      +input.price.value,
      input.date.value,
      authCtx.userEmail
    );

    const dateInvalid = enteredData.date.toString() === "Invalid Date";
    const priceInvalid = isNaN(enteredData.price) || enteredData.price <= 0;
    const titleInvalid = enteredData.title.trim().length <= 0;
    if (dateInvalid || priceInvalid || titleInvalid) {
      setInput((prevInputs) => {
        return {
          price: {
            ...prevInputs.price,
            isValid: !priceInvalid,
          },
          date: {
            ...prevInputs.date,
            isValid: !dateInvalid,
          },
          title: {
            ...prevInputs.title,
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
      {showPickDate && (
        <View style={styles.modalWrapper}>
          <Text style={styles.modalTitle}>Pick Date</Text>
          <DatePicker
            onDateChange={changeDateHandler}
            date={new Date(input.date.value)}
            mode="date"
            textColor={GlobalStyles.colors.primary200}
            fadeToColor={GlobalStyles.colors.primary200}
          />
          <View style={styles.btnsContainer}>
            <Button
              title="Cancel"
              btnStyle={styles.secondaryModalBtn}
              color={GlobalStyles.colors.primary400}
              textStyle={styles.secondaryBtnText}
              onPressAction={pressCancelDatePickerHandler}
            />
            <Button
              title="Set Date"
              btnStyle={styles.mainBtn}
              color={GlobalStyles.colors.primary900}
              textStyle={styles.mainBtnText}
              onPressAction={() => {
                changeHandler("date", datePicking);
                pressCancelDatePickerHandler();
              }}
            />
          </View>
        </View>
      )}
      {!showPickDate && (
        <>
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

            <View style={styles.pickDateInputContainer}>
              <Pressable onPress={pressDateHandler}>
                <Input
                  label="Date"
                  textInputConfig={{
                    editable: false,
                    value: input.date.value,
                  }}
                  isValid={input.date.isValid}
                />
              </Pressable>
            </View>
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
        </>
      )}
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
  modalTitle: {
    color: "#fff",
    fontSize: 24,
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 10,
  },
  inputsInARow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pickDateInputContainer: { width: "50%" },
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
  secondaryModalBtn: {
    backgroundColor: GlobalStyles.colors.primary700,
    borderRadius: 8,
    height: 40,
  },
  secondaryBtnText: {
    color: GlobalStyles.colors.secondery200,
    fontSize: 16,
  },
  modalWrapper: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary700,
    zIndex: 5,
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    borderColor: GlobalStyles.colors.primary200,
    borderWidth: 5,
  },
});
