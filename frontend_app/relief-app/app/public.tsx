import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import api from "../src/api/api";

type Camp = {
  _id: string;
  name: string;
  location?: { address?: string };
  capacity?: number;
  currentOccupancy?: number;
  criticalNeeds?: string[];
};

export default function Public() {
  const [camps, setCamps] = useState<Camp[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCamps = async () => {
    try {
      const res = await api.get("/public/camps");
      setCamps(res.data);
    } catch (e) {
      console.error("Failed to load camps", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCamps();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text>Loading camps...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: "600", marginBottom: 12 }}>
        Nearby Relief Camps
      </Text>

      <FlatList
        data={camps}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              padding: 12,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: "#ddd",
              marginBottom: 10,
              backgroundColor: "#fff",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "500" }}>{item.name}</Text>
            <Text style={{ color: "#555" }}>
              {item.location?.address || "Address not available"}
            </Text>

            <Text style={{ marginTop: 4 }}>
              Capacity: {item.currentOccupancy ?? 0}/{item.capacity ?? 0}
            </Text>

            {item.criticalNeeds?.length ? (
              <Text style={{ marginTop: 4, color: "tomato" }}>
                Needs: {item.criticalNeeds.join(", ")}
              </Text>
            ) : (
              <Text style={{ marginTop: 4, color: "green" }}>No critical needs</Text>
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}