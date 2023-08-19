import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BottomTabNavigation from "./components/BottomTabNavigation";
import { GlobalStyles } from "./util/styles";
import { ManageExpenseScreen, LoginScreen, SignupScreen } from "./screens";
import ExpensesContextProvider from "./store/expenses-context";

const Stack = createNativeStackNavigator();
const AuthenticatedUser = (
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

const UnAuthenticatedUser = (
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
export default App = () => {
  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
        <NavigationContainer>{UnAuthenticatedUser}</NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
};
