import { View, Text, FlatList, Button, Alert } from "react-native";
import { useEffect, useState } from "react";
import api from "../../src/api/api";
import Card from "../../src/ui/Card";
import { colors } from "../../src/ui/theme";

export default function Camps() {
  const [camps, setCamps] = useState<any[]>([]);

  const load = async () => {
    const res = await api.get("/coordinator/camps");
    setCamps(res.data);
  };

  useEffect(() => { load(); }, []);

  const remove = async (id: string) => {
    await api.delete(`/coordinator/camps/${id}`);
    Alert.alert("Deleted", "Camp removed");
    load();
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: 16 }}>
      <FlatList
        data={camps}
        keyExtractor={(i) => i._id}
        renderItem={({ item }) => (
          <Card>
            <Text style={{ fontSize: 17, fontWeight: "600" }}>{item.name}</Text>
            <Text style={{ color: colors.muted }}>{item.location?.address}</Text>
            <Button title="Delete" color={colors.danger} onPress={() => remove(item._id)} />
          </Card>
        )}
      />
    </View>
  );
}