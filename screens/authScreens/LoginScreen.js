import AuthForm from "../../components/Forms/AuthForm";

const LoginScreen = () => {
  const submitHandler = (data) => {
    console.log(data);
  };
  return (
    <AuthForm
      btnMainText="Log In"
      btnSecondaryText="Create a new user"
      btnSecondaryFunc={() => {
        return "Signup";
      }}
      onSubmit={submitHandler}
    />
  );
};

export default LoginScreen;
