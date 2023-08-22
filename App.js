import { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import BottomTabNavigation from "./components/BottomTabNavigation";
import { GlobalStyles } from "./util/styles";
import { ManageExpenseScreen, LoginScreen, SignupScreen } from "./screens";
import ExpensesContextProvider from "./store/expenses-context";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import LoadingOverlay from "./components/UI/LoadingOverlay";

const Stack = createNativeStackNavigator();
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
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    const getToken = async () => {
      setLoading(true);
      const userToken = await AsyncStorage.getItem("token");
      if (userToken) {
        authCtx.authenticate(userToken);
      }
      setLoading(false);
    };
    getToken();
  }, []);
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
