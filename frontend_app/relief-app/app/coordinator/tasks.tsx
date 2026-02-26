import { View, Text, FlatList, Button, Alert } from "react-native";
import { useEffect, useState } from "react";
import api from "../../src/api/api";
import Card from "../../src/ui/Card";
import { colors } from "../../src/ui/theme";

export default function Tasks() {
  const [tasks, setTasks] = useState<any[]>([]);

  const load = async () => {
    const res = await api.get("/coordinator/tasks");
    setTasks(res.data);
  };

  useEffect(() => { load(); }, []);

  const remove = async (id: string) => {
    await api.delete(`/coordinator/tasks/${id}`);
    Alert.alert("Deleted", "Task removed");
    load();
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: 16 }}>
      <FlatList
        data={tasks}
        keyExtractor={(i) => i._id}
        renderItem={({ item }) => (
          <Card>
            <Text style={{ fontSize: 17, fontWeight: "600" }}>{item.title}</Text>
            <Text style={{ color: colors.muted }}>Status: {item.status}</Text>
            <Button title="Delete" color={colors.danger} onPress={() => remove(item._id)} />
          </Card>
        )}
      />
    </View>
  );
}