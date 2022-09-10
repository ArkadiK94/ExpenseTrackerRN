import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

import { GlobalStyles } from "../util/styles";
import { RecentExpensesScreen, AllExpensesScreen } from "../screens";
import TriggersForNavigation from "./UI/TriggersForNavigation";

const BottomTab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  return (
    <BottomTab.Navigator
      sceneContainerStyle={{ backgroundColor: GlobalStyles.colors.primary700 }}
      screenOptions={{
        tabBarActiveTintColor: GlobalStyles.colors.secondery500,
        tabBarStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
          paddingBottom: 10,
          paddingTop: 5,
          height: 60,
        },
        headerStyle: {
          backgroundColor: GlobalStyles.colors.primary400,
        },
        headerTintColor: GlobalStyles.colors.primary100,
        headerRight: ({ tintColor }) => {
          return (
            <TriggersForNavigation
              screenName="AddExpense"
              style={{ alignSelf: "flex-end", marginRight: 20 }}
            >
              <Ionicons name="add" size={24} color={tintColor} />
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
