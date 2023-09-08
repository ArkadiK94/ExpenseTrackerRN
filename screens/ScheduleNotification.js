import { useContext } from "react";
import { Alert } from "react-native";
import * as Notifications from "expo-notifications";

import NotificationForm from "../components/Forms/NotificationForm";
import { ExpensesContext } from "../store/expenses-context";
import { isNotBeforeXDays } from "../util/date";

const ScheduleNotification = ({ navigation }) => {
  const expensesCtx = useContext(ExpensesContext);
  const submitFormHandler = async (data) => {
    const result = await new Promise((resolve) => {
      new Alert.alert(
        "Update Notifications",
        "This action will delete any previous notifications. Type 'OK' to continue",
        [
          {
            text: "Cancel",
            onPress: () => resolve(false),
          },
          {
            text: "OK",
            onPress: () => resolve(true),
          },
        ],
        {
          cancelable: false,
        }
      );
    });
    if (!result) return;
    let expenses = expensesCtx.expensesState;
    if (data.days) {
      expenses = expenses.filter((expense) => {
        return isNotBeforeXDays(expense.date, data.days);
      });
    }
    const expensesSum = expenses.reduce((total, item) => {
      return total + item.price;
    }, 0);
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `Last ${data.days} Days Spendings`,
        body: `You have spent $${expensesSum} for last ${data.days} days`,
      },
      trigger: { seconds: 2 },
    });
    console.log(data);
    navigation.goBack();
  };
  return (
    <NotificationForm actionName="Schedule" onSubmit={submitFormHandler} />
  );
};

export default ScheduleNotification;
