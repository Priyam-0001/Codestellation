import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import api from "../src/api/api";

type Camp = {
  _id: string;
  name: string;
  location?: {
    lat: number;
    lng: number;
    address?: string;
  };
};

export default function PublicMap() {
  const [camps, setCamps] = useState<Camp[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/public/camps").then((res) => {
      setCamps(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading map...</Text>
      </View>
    );
  }

  // Fallback region (e.g. your city)
  const initialRegion = {
    latitude: camps[0]?.location?.lat || 26.1445,   // Guwahati approx
    longitude: camps[0]?.location?.lng || 91.7362,
    latitudeDelta: 0.2,
    longitudeDelta: 0.2,
  };

  return (
    <MapView style={styles.map} initialRegion={initialRegion}>
      {camps.map((camp) =>
        camp.location?.lat && camp.location?.lng ? (
          <Marker
            key={camp._id}
            coordinate={{
              latitude: camp.location.lat,
              longitude: camp.location.lng,
            }}
            title={camp.name}
            description={camp.location.address || "Relief Camp"}
          />
        ) : null
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});