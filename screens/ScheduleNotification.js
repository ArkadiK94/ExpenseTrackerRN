import NotificationForm from "../components/Forms/NotificationForm";

const ScheduleNotification = () => {
  const submitFormHandler = (data) => {
    console.log(data);
  };
  return (
    <NotificationForm actionName="Schedule" onSubmit={submitFormHandler} />
  );
};

export default ScheduleNotification;
