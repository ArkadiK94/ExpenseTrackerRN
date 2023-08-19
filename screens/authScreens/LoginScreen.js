import AuthForm from "../../components/Forms/AuthForm";

const LoginScreen = () => {
  return (
    <AuthForm
      btnMainText="Log In"
      btnSecondaryText="Create a new user"
      btnSecondaryFunc={() => {
        return "Signup";
      }}
    />
  );
};

export default LoginScreen;
