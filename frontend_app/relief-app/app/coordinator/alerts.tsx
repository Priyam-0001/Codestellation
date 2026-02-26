import { View, Text, FlatList } from "react-native";
import { useEffect, useState } from "react";
import api from "../../src/api/api";
import Card from "../../src/ui/Card";
import { colors } from "../../src/ui/theme";

export default function Alerts() {
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    api.get("/coordinator/alerts").then((res) => setAlerts(res.data));
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: 16 }}>
      <FlatList
        data={alerts}
        keyExtractor={(i) => i._id}
        renderItem={({ item }) => (
          <Card>
            <Text style={{ fontSize: 17, fontWeight: "600" }}>{item.title}</Text>
            <Text style={{ color: colors.muted }}>{item.message}</Text>
          </Card>
        )}
      />
    </View>
  );
}