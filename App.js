import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BottomTabNavigation from "./components/BottomTabNavigation";
import { GlobalStyles } from "./util/styles";
import { AddExpenseScreen, EditExpenseScreen } from "./screens";
import ExpensesContextProvider from "./store/expenses-context";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
        <NavigationContainer>
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
              name="AddExpense"
              component={AddExpenseScreen}
              options={{
                title: "Add Expense",
                contentStyle: {
                  backgroundColor: GlobalStyles.colors.primary900,
                },
              }}
            />
            <Stack.Screen
              name="EditExpense"
              component={EditExpenseScreen}
              options={{
                title: "Edit Expense",
                contentStyle: {
                  backgroundColor: GlobalStyles.colors.primary900,
                },
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}
