import { View, Text, ActivityIndicator, StyleSheet, Button } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
// ...rest imports stay same
import { useEffect, useState } from "react";
import api from "../../src/api/api";
import { openInMaps } from "../../src/utils/openMaps";

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

  const initialRegion = {
    latitude: camps[0]?.location?.lat || 26.1445,   // fallback: Guwahati
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
            onCalloutPress={() =>
              openInMaps(camp.location!.lat, camp.location!.lng, camp.name)
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