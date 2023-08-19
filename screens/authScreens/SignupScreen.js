import AuthForm from "../../components/Forms/AuthForm";

const SignupScreen = () => {
  return (
    <AuthForm
      signupMode
      btnMainText="Sign Up"
      btnSecondaryText="Log in instead"
      btnSecondaryFunc={() => {
        return "Login";
      }}
    />
  );
};

export default SignupScreen;
