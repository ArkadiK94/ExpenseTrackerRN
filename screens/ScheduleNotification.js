import { useContext } from "react";
import { Alert } from "react-native";
import * as Notifications from "expo-notifications";

import NotificationForm from "../components/Forms/NotificationForm";
import { ExpensesContext } from "../store/expenses-context";
import { isNotBeforeXDays } from "../util/date";

const ScheduleNotification = ({ navigation }) => {
  const expensesCtx = useContext(ExpensesContext);
  const cancelNotifications = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
  };

  const sumTotalOfLastDays = (days) => {
    let expenses = expensesCtx.expensesState;
    if (days) {
      expenses = expenses.filter((expense) => {
        return isNotBeforeXDays(expense.date, days);
      });
    }
    const expensesSum = expenses.reduce((total, item) => {
      return total + item.price;
    }, 0);
    return expensesSum;
  };

  const submitFormHandler = async (data) => {
    cancelNotifications();
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
    const expensesSum = sumTotalOfLastDays(data.days);
    for (let dayNum of Object.keys(data.weekDays)) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: `Last ${data.days} Days Spendings`,
          body: `You have spent $${expensesSum} for last ${data.days} days`,
        },
        trigger: {
          repeats: true,
          weekday: +dayNum,
          hour: data.date.getHours(),
          minute: data.date.getMinutes(),
        },
      });
    }
    navigation.goBack();
  };
  return (
    <NotificationForm
      actionName="Schedule"
      onSubmit={submitFormHandler}
      onDelete={() => {
        cancelNotifications();
        navigation.goBack();
      }}
    />
  );
};

export default ScheduleNotification;
