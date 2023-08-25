import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState } from "react";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: (token, email) => {},
  logout: () => {},
  userEmail: "",
});

const AuthContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({
    token: "",
    userEmail: "",
  });

  const authenticate = async (userToken, userEmail) => {
    setUserInfo({ token: userToken, userEmail: userEmail });
    await AsyncStorage.setItem("token", userToken);
    await AsyncStorage.setItem("userEmail", userEmail);
  };
  const logout = async () => {
    setUserInfo({ token: null, userEmail: null });
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("userEmail");
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
