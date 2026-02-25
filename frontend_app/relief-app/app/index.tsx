import { View, Text, TextInput, Button, Alert } from "react-native";
import { useContext, useState } from "react";
import { AuthContext } from "../src/context/AuthContext";
import { router } from "expo-router";

export default function Index() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const role = await login(email, password);

      if (role === "volunteer") router.replace("/volunteer");
      else if (role === "coordinator") router.replace("/coordinator");
      else if (role === "admin") router.replace("/admin");
      else if (role === "public") router.replace("/public");
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