import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState } from "react";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: ({ token, email, expiresIn, setTime, refreshToken }) => {},
  logout: () => {},
  email: "",
});

const AuthContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({
    token: "",
    email: "",
  });

  const authenticate = async ({
    token,
    email,
    expiresIn,
    setTime,
    refreshToken,
  }) => {
    setUserInfo({ token: token, email: email });
    await AsyncStorage.multiSet([
      ["token", token],
      ["email", email],
      ["expiresIn", expiresIn],
      ["setTime", setTime],
      ["refreshToken", refreshToken],
    ]);
  };
  const logout = async () => {
    setUserInfo({ token: null, email: null });
    await AsyncStorage.multiRemove([
      "token",
      "email",
      "expiresIn",
      "setTime",
      "refreshToken",
    ]);
  };
  const value = {
    token: userInfo.token,
    isAuthenticated: !!userInfo.token,
    authenticate,
    logout,
    email: userInfo.email,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export default AuthContextProvider;
