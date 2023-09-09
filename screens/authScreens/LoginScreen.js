import { useContext, useState } from "react";

import AuthForm from "../../components/Forms/AuthForm";
import { loginUser } from "../../util/auth";
import { AuthContext } from "../../store/auth-context";
import LoadingOverlay from "../../components/UI/LoadingOverlay";
import ErrorOverlay from "../../components/UI/ErrorOverlay";

const LoginScreen = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const authCtx = useContext(AuthContext);

  const submitHandler = async (data) => {
    setLoading(true);
    try {
      const tokenInfo = await loginUser(data);
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
