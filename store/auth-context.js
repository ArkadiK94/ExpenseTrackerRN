import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState } from "react";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: (token, email, expiresIn) => {},
  logout: () => {},
  userEmail: "",
});

const AuthContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({
    token: "",
    userEmail: "",
  });

  const authenticate = async (userToken, userEmail, expiresIn, setTime) => {
    setUserInfo({ token: userToken, userEmail: userEmail });
    await AsyncStorage.multiSet([
      ["token", userToken],
      ["userEmail", userEmail],
      ["expiresIn", expiresIn],
      ["setTime", setTime],
    ]);
  };
  const logout = async () => {
    setUserInfo({ token: null, userEmail: null });
    await AsyncStorage.multiRemove([
      "token",
      "userEmail",
      "expiresIn",
      "setTime",
    ]);
  };
  const value = {
    token: userInfo.token,
    isAuthenticated: !!userInfo.token,
    authenticate,
    logout,
    userEmail: userInfo.userEmail,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export default AuthContextProvider;
