import { View, Text, ActivityIndicator, StyleSheet, Button } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { useEffect, useState } from "react";
import api from "../../src/api/api";
import { openInMaps } from "../../src/utils/openMaps";

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
            onCalloutPress={() =>
              openInMaps(task.location!.lat, task.location!.lng, task.title)
            }
          />
        ) : null
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: { flex: 1 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  callout: {
    width: 220,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  calloutText: {
    fontSize: 13,
    color: "#555",
  },
});