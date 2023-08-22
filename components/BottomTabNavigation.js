import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { useContext } from "react";

import { GlobalStyles } from "../util/styles";
import { RecentExpensesScreen, AllExpensesScreen } from "../screens";
import Triggers from "./UI/Triggers";
import { AuthContext } from "../store/auth-context";

const BottomTab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  const authCtx = useContext(AuthContext);
  const logoutPressHandler = () => {
    authCtx.logout();
  };
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
            <View
              style={{
                marginRight: 40,
                width: 50,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Triggers screenName="ManageExpenseScreen">
                <Ionicons name="add" size={24} color={tintColor} />
              </Triggers>
              <Triggers onPress={logoutPressHandler}>
                <Ionicons name="exit" size={24} color={tintColor} />
              </Triggers>
            </View>
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
