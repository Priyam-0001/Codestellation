import { Slot } from "expo-router";
import { AuthProvider } from "../src/context/AuthContext";

console.log("AuthProvider is:", AuthProvider);

export default function Layout() {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}