import { View, Text, Button } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../../src/context/AuthContext";
import { router } from "expo-router";
import { colors } from "../../src/ui/theme";

export default function Profile() {
  const { userRole, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
    router.replace("/(auth)");
  };

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: colors.background }}>
      <Text style={{ fontSize: 24, fontWeight: "700", marginBottom: 12 }}>Profile</Text>
      <Text style={{ fontSize: 16, marginBottom: 8 }}>Role: {userRole}</Text>

      <Button title="Logout" color={colors.danger} onPress={handleLogout} />
    </View>
  );
}