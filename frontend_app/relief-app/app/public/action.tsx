import { View, Text, TextInput, Button, Alert } from "react-native";
import { useState } from "react";
import api from "../../src/api/api";

export default function PublicAction() {
  const [name, setName] = useState("");
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");

  const submit = async (type: "donate" | "request") => {
    try {
      await api.post(`/public/${type}`, {
        donorName: name,
        item,
        quantity: Number(quantity),
      });
      Alert.alert("Success", "Submitted successfully");
      setName(""); setItem(""); setQuantity("");
    } catch (e) {
      Alert.alert("Error", "Failed to submit");
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 20, marginBottom: 12 }}>Submit</Text>

      <TextInput placeholder="Your Name" value={name} onChangeText={setName} style={{ borderWidth:1, marginBottom:8, padding:8 }} />
      <TextInput placeholder="Item" value={item} onChangeText={setItem} style={{ borderWidth:1, marginBottom:8, padding:8 }} />
      <TextInput placeholder="Quantity" value={quantity} onChangeText={setQuantity} keyboardType="numeric" style={{ borderWidth:1, marginBottom:12, padding:8 }} />

      <Button title="Donate" onPress={() => submit("donate")} />
      <View style={{ height: 10 }} />
      <Button title="Request Help" onPress={() => submit("request")} />
    </View>
  );
}