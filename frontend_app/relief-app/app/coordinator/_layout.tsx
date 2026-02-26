import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../src/ui/theme";

export default function CoordinatorLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: colors.primary,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="speedometer-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="camps"
        options={{
          title: "Camps",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="business-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          title: "Tasks",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="checkbox-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="alerts"
        options={{
          title: "Alerts",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="alert-circle-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}