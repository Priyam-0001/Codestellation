import { View, Text, Button } from "react-native";
import { useEffect, useState } from "react";
import api from "../src/api/api";

export default function Admin() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    api.get("/admin/stats").then((res) => setStats(res.data));
  }, []);

  if (!stats) return <Text>Loading...</Text>;

  return (
    <View style={{ padding: 20 }}>
      <Text>Total Camps: {stats.totalCamps}</Text>
      <Text>Total Tasks: {stats.totalTasks}</Text>
      <Text>Total Users: {stats.totalUsers}</Text>
    </View>
  );
}