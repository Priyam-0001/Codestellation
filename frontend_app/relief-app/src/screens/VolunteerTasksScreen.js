import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList } from "react-native";
import api from "../api/api";

export default function VolunteerTasksScreen() {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    const res = await api.get("/volunteer/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const acceptTask = async (id) => {
    await api.post(`/volunteer/tasks/${id}/accept`);
    loadTasks();
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Available Tasks</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <Text>{item.title}</Text>
            <Button title="Accept" onPress={() => acceptTask(item._id)} />
          </View>
        )}
      />
    </View>
  );
}