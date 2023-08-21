import AuthForm from "../../components/Forms/AuthForm";

const SignupScreen = () => {
  const submitHandler = (data) => {
    console.log(data);
  };
  return (
    <AuthForm
      signupMode
      btnMainText="Sign Up"
      btnSecondaryText="Log in instead"
      btnSecondaryFunc={() => {
        return "Login";
      }}
      onSubmit={submitHandler}
    />
  );
};

export default SignupScreen;
