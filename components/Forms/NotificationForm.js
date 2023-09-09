import { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import DatePicker from "react-native-date-picker";
import { Ionicons } from "@expo/vector-icons";

import { GlobalStyles } from "../../util/styles";
import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";
import Input from "./Input";
import Triggers from "../UI/Triggers";

const NotificationForm = ({ actionName, onSubmit, onDelete }) => {
  const [date, setDate] = useState(
    new Date(`${getFormattedDate(new Date())}T00:00:00`)
  );
  const [days, setDays] = useState("7");
  const [notifWeekDays, setNotifWeekDays] = useState({
    1: ["Sunday", 0],
    2: ["Monday", 0],
    3: ["Tuesday", 0],
    4: ["Wednesday", 0],
    5: ["Thursday", 0],
    6: ["Friday", 0],
    7: ["Saturday", 0],
  });
  const changeDateHandler = (newDate) => {
    setDate(newDate);
  };
  const changeDaysHandler = (newDays) => {
    if (isNaN(newDays) || newDays < 0) return;
    setDays(newDays);
  };
  const pickDayHandler = (keyObj) => {
    setNotifWeekDays((prevNotifWeekDays) => {
      return {
        ...prevNotifWeekDays,
        [keyObj]: [
          prevNotifWeekDays[keyObj][0],
          +!prevNotifWeekDays[keyObj][1],
        ],
      };
    });
  };
  const submitHandler = () => {
    const weekDays = {};
    for (let [valueKey, valueObj] of Object.entries(notifWeekDays)) {
      if (valueObj[1]) {
        weekDays[valueKey] = valueObj;
      }
    }
    onSubmit({ date, days, weekDays });
  };
  return (
    <ScrollView>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Schedule Notification</Text>
        <View style={styles.setDaysContainer}>
          <Text style={styles.subTitle}>Track Last</Text>
          <Input
            textInputConfig={{
              maxLength: 2,
              keyboardType: "number-pad",
              onChangeText: changeDaysHandler,
              value: days,
              textAlign: "center",
              width: 50,
            }}
            isValid={true}
          />
          <Text style={styles.subTitle}>Days</Text>
        </View>
        <Text style={styles.subTitle}>Pick Time And Week Days</Text>
        <View style={styles.setTimeAndWeedDaysContainer}>
          <DatePicker
            date={date}
            onDateChange={changeDateHandler}
            mode="time"
            textColor={GlobalStyles.colors.primary200}
            fadeToColor={GlobalStyles.colors.primary200}
            timeZoneOffsetInMinutes={0}
          />
          <View style={styles.weekDayBubbleContainer}>
            {Object.entries(notifWeekDays).map(([keyObj, valueObj]) => {
              return (
                <Pressable
                  key={keyObj}
                  onPress={pickDayHandler.bind(this, keyObj)}
                >
                  <View style={styles.bubbleDay}>
                    <Input
                      textInputConfig={{
                        maxLength: 3,
                        editable: false,
                        value: valueObj[0],
                        textAlign: "center",
                        height: "100%",
                        width: "100%",
                      }}
                      inputStyle={[
                        styles.inputStyle,
                        valueObj[1] && styles.selectedDay,
                      ]}
                      isValid={true}
                    />
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>
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
        <Triggers style={styles.bin} onPress={onDelete}>
          <Ionicons
            name="trash-outline"
            color={GlobalStyles.colors.secondery700}
            size={35}
          />
        </Triggers>
      </View>
    </ScrollView>
  );
};

export default NotificationForm;

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 80,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  setDaysContainer: {
    width: "50%",
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 20,
  },
  setWeekDaysContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  setTimeAndWeedDaysContainer: {
    flex: 1,
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    textAlign: "center",
    fontWeight: "600",
  },
  subTitle: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "400",
    marginBottom: 10,
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
  weekDayBubbleContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  inputStyle: {
    fontSize: 10,
    borderRadius: 100,
  },
  bubbleDay: {
    height: 50,
    width: 50,
  },
  selectedDay: {
    borderColor: GlobalStyles.colors.primary100,
    borderWidth: 3,
    borderRadius: 100,
    elevation: 5,
  },
  bin: {
    alignSelf: "center",
  },
});
