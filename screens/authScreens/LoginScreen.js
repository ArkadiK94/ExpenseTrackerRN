import { useContext, useState } from "react";

import AuthForm from "../../components/Forms/AuthForm";
import { loginUser } from "../../util/auth";
import { AuthContext } from "../../store/auth-context";
import LoadingOverlay from "../../components/UI/LoadingOverlay";

const LoginScreen = () => {
  const [loading, setLoading] = useState(false);
  const authCtx = useContext(AuthContext);

  const submitHandler = async (data) => {
    setLoading(true);
    const token = await loginUser(data);
    authCtx.authenticate(token);
    setLoading(false);
  };
  if (loading) return <LoadingOverlay />;
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
