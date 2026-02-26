import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import api from "../../src/api/api";
import Card from "../../src/ui/Card";
import { colors } from "../../src/ui/theme";

export default function PublicAlerts() {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/public/alerts")
      .then((res) => setAlerts(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ color: colors.muted }}>Loading alerts...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: 16 }}>
      <FlatList
        data={alerts}
        keyExtractor={(i) => i._id}
        renderItem={({ item }) => (
          <Card>
            <Text style={{ fontSize: 17, fontWeight: "600", color: colors.text }}>{item.title}</Text>
            <Text style={{ color: colors.muted, marginTop: 4 }}>{item.message}</Text>
          </Card>
        )}
      />
    </View>
  );
}