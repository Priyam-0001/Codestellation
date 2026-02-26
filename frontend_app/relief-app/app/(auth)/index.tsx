import { View, Text, TextInput, Button, Alert, ActivityIndicator } from "react-native";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../src/context/AuthContext";
import { router } from "expo-router";

export default function Index() {
  const { login, loading: authLoading, userRole } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔁 Auto-redirect if already logged in
  useEffect(() => {
    if (!authLoading && userRole) {
      if (userRole === "public") router.replace("/public");
      else if (userRole === "volunteer") router.replace("/volunteer");
      else if (userRole === "coordinator") router.replace("/coordinator");
      else if (userRole === "admin") router.replace("/admin");
    }
  }, [authLoading, userRole]);

  // ⏳ While checking AsyncStorage
  if (authLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>Loading...</Text>
      </View>
    );
  }

  const handleLogin = async () => {
    try {
      setLoading(true);
      const role = await login(email, password);

      if (role === "public") router.replace("/public");
      else if (role === "volunteer") router.replace("/volunteer");
      else if (role === "coordinator") router.replace("/coordinator");
      else if (role === "admin") router.replace("/admin");
      else Alert.alert("Error", "Unknown role");
    } catch (e) {
      Alert.alert("Login failed", "Check your credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 28, marginBottom: 20, textAlign: "center" }}>
        Relief App
      </Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={{ borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 6 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, padding: 10, marginBottom: 20, borderRadius: 6 }}
      />

      <Button title={loading ? "Logging in..." : "Login"} onPress={handleLogin} />
    </View>
  );
}