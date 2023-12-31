import { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";

import BottomTabNavigation from "./components/BottomTabNavigation";
import { GlobalStyles } from "./util/styles";
import {
  ManageExpenseScreen,
  LoginScreen,
  SignupScreen,
  ScheduleNotification,
} from "./screens";
import ExpensesContextProvider from "./store/expenses-context";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import LoadingOverlay from "./components/UI/LoadingOverlay";
import ErrorOverlay from "./components/UI/ErrorOverlay";
import { getNewToken } from "./util/auth";

const Stack = createNativeStackNavigator();
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
const AuthenticatedUserStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary400 },
        headerTintColor: GlobalStyles.colors.primary100,
        contentStyle: { backgroundColor: GlobalStyles.colors.primary700 },
        headerBackVisible: false,
        animation: "slide_from_bottom",
      }}
    >
      <Stack.Screen
        name="BottomTabs"
        options={{
          title: "BottomTabs",
          headerShown: false,
        }}
        component={BottomTabNavigation}
      />
      <Stack.Screen
        name="ManageExpenseScreen"
        component={ManageExpenseScreen}
        options={{
          contentStyle: {
            backgroundColor: GlobalStyles.colors.primary900,
          },
        }}
      />
      <Stack.Screen
        name="ScheduleNotification"
        component={ScheduleNotification}
        options={{
          title: "Schedule Notification",
          contentStyle: {
            backgroundColor: GlobalStyles.colors.primary900,
          },
        }}
      />
    </Stack.Navigator>
  );
};

const AuthUserStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary400 },
        headerTintColor: GlobalStyles.colors.primary100,
        contentStyle: { backgroundColor: GlobalStyles.colors.primary700 },
        headerBackVisible: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};

const Root = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const authCtx = useContext(AuthContext);

  const generateNewToken = async (tokenTimeSet, leftToExpire, refreshToken) => {
    const gapInTime = Math.floor((new Date() - new Date(tokenTimeSet)) / 1000);
    if (gapInTime <= leftToExpire) return;
    const newToken = await getNewToken(refreshToken);
    return newToken;
  };

  const mapUserData = (userData) => {
    const userDataObj = {};
    for (let item of userData) {
      userDataObj[item[0]] = item[1];
    }
    return userDataObj;
  };

  useEffect(() => {
    const getToken = async () => {
      setLoading(true);
      try {
        const userData = await AsyncStorage.multiGet([
          "token",
          "email",
          "expiresIn",
          "setTime",
          "refreshToken",
        ]);
        const userDataObj = mapUserData(userData);
        const { token, email, expiresIn, setTime, refreshToken } = userDataObj;
        if (token) {
          const newToken = await generateNewToken(
            setTime,
            expiresIn,
            refreshToken
          );
          if (newToken) {
            authCtx.authenticate({
              token: newToken,
              email,
              expiresIn,
              setTime: new Date().toISOString(),
              refreshToken,
            });
          } else {
            authCtx.authenticate({
              token: token,
              email,
              expiresIn,
              setTime,
              refreshToken,
            });
          }
        }
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };
    getToken();
  }, []);

  if (error) {
    return (
      <ErrorOverlay
        message={`Error occurred, try again \n (${error})`}
        onConfirm={() => setError("")}
      />
    );
  }
  if (loading) return <LoadingOverlay />;
  return authCtx.isAuthenticated ? (
    <AuthenticatedUserStack />
  ) : (
    <AuthUserStack />
  );
};

export default App = () => {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <ExpensesContextProvider>
          <NavigationContainer>
            <Root />
          </NavigationContainer>
        </ExpensesContextProvider>
      </AuthContextProvider>
    </>
  );
};
