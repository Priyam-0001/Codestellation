import { View, Text, Button, FlatList } from "react-native";
import { useEffect, useState } from "react";
import api from "../src/api/api";
import { router } from "expo-router";

export default function Volunteer() {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    const res = await api.get("/volunteer/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const acceptTask = async (id: string) => {
    await api.post(`/volunteer/tasks/${id}/accept`);
    loadTasks();
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20 }}>Volunteer Tasks</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item: any) => item._id}
        renderItem={({ item }: any) => (
          <View style={{ marginVertical: 10 }}>
            <Text>{item.title}</Text>
            <Button title="View Tasks on Map" onPress={() => router.push("./volunteer-map")} />
            <Button title="Accept" onPress={() => acceptTask(item._id)} />
          </View>
        )}
      />
    </View>
  );
}