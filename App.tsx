import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TaskProvider } from "./src/context/TaskContext";
import { ThemeProvider, useTheme } from "./src/context/ThemeContext";
import TaskListScreen from "./src/screens/TaskListScreen";
import AddTaskScreen from "./src/screens/AddTaskScreen";
import { RootStackParamList } from "./src/types";

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const { isDark } = useTheme();

  return (
    <NavigationContainer>
      <StatusBar style={isDark ? "light" : "dark"} />
      <Stack.Navigator
        screenOptions={{ headerShown: false, animation: "slide_from_right" }}
      >
        <Stack.Screen name="TaskList" component={TaskListScreen} />
        <Stack.Screen name="AddTask" component={AddTaskScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <TaskProvider>
      <ThemeProvider>
        <AppNavigator />
      </ThemeProvider>
    </TaskProvider>
  );
}
