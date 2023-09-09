import { useContext, useState } from "react";

import AuthForm from "../../components/Forms/AuthForm";
import { createNewUser } from "../../util/auth";
import { AuthContext } from "../../store/auth-context";
import LoadingOverlay from "../../components/UI/LoadingOverlay";
import ErrorOverlay from "../../components/UI/ErrorOverlay";

const SignupScreen = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const authCtx = useContext(AuthContext);

  const submitHandler = async (data) => {
    setLoading(true);
    try {
      const tokenInfo = await createNewUser(data);
      authCtx.authenticate({
        token: tokenInfo[0],
        email: data.email,
        expiresIn: tokenInfo[1],
        setTime: new Date().toISOString(),
        refreshToken: tokenInfo[2],
      });
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };
  if (error)
    return (
      <ErrorOverlay
        message={`Error occurred, try again \n (${error})`}
        onConfirm={() => setError("")}
      />
    );
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
