import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

import Colors from "../util/colors";
import { RecentExpensesScreen, AllExpensesScreen } from "../screens";
import TriggersForNavigation from "./TriggersForNavigation";

const BottomTab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  return (
    <BottomTab.Navigator
      sceneContainerStyle={{ backgroundColor: Colors.primary700 }}
      screenOptions={{
        tabBarActiveTintColor: Colors.secondery500,
        tabBarStyle: {
          backgroundColor: Colors.primary500,
          paddingBottom: 10,
          paddingTop: 5,
          height: 60,
        },
        headerStyle: {
          backgroundColor: Colors.primary400,
        },
        headerTintColor: Colors.primary100,
        headerRight: () => {
          return (
            <TriggersForNavigation
              screenName="AddExpense"
              style={{ alignSelf: "flex-end", marginRight: 20 }}
            >
              <Ionicons name="add" size={24} color="#fff" />
            </TriggersForNavigation>
          );
        },
      }}
    >
      <BottomTab.Screen
        name="RecentExpenses"
        component={RecentExpensesScreen}
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent",
          tabBarIcon: ({ color }) => {
            return (
              <MaterialCommunityIcons
                name="timer-sand-empty"
                size={24}
                color={color}
              />
            );
          },
        }}
      />
      <BottomTab.Screen
        name="AllExpenses"
        component={AllExpensesScreen}
        options={{
          title: "All Expenses",
          tabBarIcon: ({ color }) => {
            return (
              <Ionicons name="md-calendar-sharp" size={24} color={color} />
            );
          },
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigation;
