import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BottomTabNavigation from "./components/BottomTabNavigation";
import Colors from "./util/colors";
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
              headerStyle: { backgroundColor: Colors.primary400 },
              headerTintColor: Colors.primary100,
              contentStyle: { backgroundColor: Colors.primary700 },
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
                contentStyle: { backgroundColor: Colors.primary900 },
              }}
            />
            <Stack.Screen
              name="EditExpense"
              component={EditExpenseScreen}
              options={{
                title: "Edit Expense",
                contentStyle: { backgroundColor: Colors.primary900 },
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}
