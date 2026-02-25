import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import api from "../src/api/api";

type Task = {
  _id: string;
  title: string;
  location?: {
    lat: number;
    lng: number;
  };
};

export default function VolunteerMap() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/volunteer/tasks").then((res) => {
      setTasks(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading tasks map...</Text>
      </View>
    );
  }

  const initialRegion = {
    latitude: tasks[0]?.location?.lat || 26.1445,
    longitude: tasks[0]?.location?.lng || 91.7362,
    latitudeDelta: 0.2,
    longitudeDelta: 0.2,
  };

  return (
    <MapView style={styles.map} initialRegion={initialRegion}>
      {tasks.map((task) =>
        task.location?.lat && task.location?.lng ? (
          <Marker
            key={task._id}
            coordinate={{
              latitude: task.location.lat,
              longitude: task.location.lng,
            }}
            title={task.title}
            description="Task location"
          />
        ) : null
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: { flex: 1 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});