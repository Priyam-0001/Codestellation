import { View, Text, Button } from "react-native";
import { useEffect, useState } from "react";
import api from "../../src/api/api";
import Card from "../../src/ui/Card";
import { colors } from "../../src/ui/theme";

export default function Coordinator() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    api.get("/coordinator/stats").then((res) => setStats(res.data));
  }, []);

  if (!stats) return <Text>Loading...</Text>;

  return (
    <View style={{ padding: 16 }}>
      <Card>
        <Text style={{ fontSize: 16, color: colors.text }}>Total Camps</Text>
        <Text style={{ fontSize: 22, fontWeight: "700", color: colors.text }}>{stats.totalCamps}</Text>
      </Card>
      <Card>
        <Text style={{ fontSize: 16 }}>Total Tasks: {stats.totalTasks}</Text>
      </Card>
      <Card>
        <Text style={{ fontSize: 16, color: colors.warning }}>Pending Tasks: {stats.pendingTasks}</Text>
      </Card>
    </View>
  );
}