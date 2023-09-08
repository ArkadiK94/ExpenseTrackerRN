import { Alert } from "react-native";

import NotificationForm from "../components/Forms/NotificationForm";

const ScheduleNotification = () => {
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

    console.log(data);
  };
  return (
    <NotificationForm actionName="Schedule" onSubmit={submitFormHandler} />
  );
};

export default ScheduleNotification;
