import { View, Text, Button, FlatList } from "react-native";
import { useEffect, useState } from "react";
import api from "../../src/api/api";
import { router } from "expo-router";
import Card from "../../src/ui/Card";
import { colors } from "../../src/ui/theme";


export default function Volunteer() {
  const [tasks, setTasks] = useState<any[]>([]);

  const load = async () => {
    const res = await api.get("/volunteer/tasks");
    setTasks(res.data);
  };

  useEffect(() => { load(); }, []);

  const accept = async (id: string) => {
    await api.post(`/volunteer/tasks/${id}/accept`);
    load();
  };

  const complete = async (id: string) => {
    await api.post(`/volunteer/tasks/${id}/complete`);
    load();
  };

  

  return (
    <View style={{ padding: 16 }}>
      <Button title="View Tasks on Map" onPress={() => router.push("/volunteer/map")} />

      <FlatList
        data={tasks}
        keyExtractor={(i) => i._id}
        renderItem={({ item }) => (
          <Card>
            <Text style={{ fontSize: 17, fontWeight: "600", color: colors.text }}>{item.title}</Text>
            <Text style={{ color: colors.muted, marginBottom: 8 }}>Status: {item.status}</Text>

            {item.status === "pending" && (
              <Button title="Accept Task" color={colors.primary} onPress={() => accept(item._id)} />
            )}
            {item.status === "assigned" && (
              <Button title="Mark as Completed" color={colors.success} onPress={() => complete(item._id)} />
            )}
          </Card>
        )}
      />
    </View>
  );
}