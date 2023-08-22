import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState } from "react";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const authenticate = async (userToken) => {
    setToken(userToken);
    await AsyncStorage.setItem("token", userToken);
  };
  const logout = async () => {
    setToken(null);
    await AsyncStorage.removeItem("token");
  };
  const value = {
    token,
    isAuthenticated: !!token,
    authenticate,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export default AuthContextProvider;
