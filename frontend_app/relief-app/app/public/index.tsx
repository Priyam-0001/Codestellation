import { View, Text, FlatList, ActivityIndicator, Button, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import api from "../../src/api/api";
import { router } from "expo-router";
import Card from "../../src/ui/Card";
import { colors } from "../../src/ui/theme";

export default function Public() {
  const [camps, setCamps] = useState<any[]>([]);
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
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.muted}>Loading camps…</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Relief Camps</Text>

      <View style={{ marginBottom: 12 }}>
        <Button title="View on Map" color={colors.primary} onPress={() => router.push("/public/map")} />
      </View>

      <FlatList
        data={camps}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Card>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.muted}>{item.location?.address || "Address not available"}</Text>

            <Text style={styles.meta}>
              Capacity: {item.currentOccupancy ?? 0}/{item.capacity ?? 0}
            </Text>

            {item.criticalNeeds?.length ? (
              <Text style={[styles.meta, { color: colors.danger }]}>
                Needs: {item.criticalNeeds.join(", ")}
              </Text>
            ) : (
              <Text style={[styles.meta, { color: colors.success }]}>No critical needs</Text>
            )}
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: colors.text,
  },
  muted: {
    color: colors.muted,
    marginTop: 2,
  },
  meta: {
    marginTop: 6,
    color: colors.text,
  },
});