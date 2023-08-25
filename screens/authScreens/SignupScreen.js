import { useContext, useState } from "react";

import AuthForm from "../../components/Forms/AuthForm";
import { createNewUser } from "../../util/auth";
import { AuthContext } from "../../store/auth-context";
import LoadingOverlay from "../../components/UI/LoadingOverlay";

const SignupScreen = () => {
  const [loading, setLoading] = useState(false);
  const authCtx = useContext(AuthContext);

  const submitHandler = async (data) => {
    setLoading(true);
    const token = await createNewUser(data);
    authCtx.authenticate(token, data.email);
    setLoading(false);
  };
  if (loading) return <LoadingOverlay />;

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
