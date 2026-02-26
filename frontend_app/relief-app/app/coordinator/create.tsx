import { View, Text, TextInput, Button, Alert, Modal, ScrollView, StyleSheet, Pressable } from "react-native";
import { useState } from "react";
import api from "../../src/api/api";
import { colors } from "../../src/ui/theme";

export default function Create() {
  // Modal visibility
  const [showCamp, setShowCamp] = useState(false);
  const [showTask, setShowTask] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  // Camp
  const [campName, setCampName] = useState("");
  const [campAddress, setCampAddress] = useState("");
  const [campLat, setCampLat] = useState("");
  const [campLng, setCampLng] = useState("");
  const [campCapacity, setCampCapacity] = useState("");

  // Task
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskLat, setTaskLat] = useState("");
  const [taskLng, setTaskLng] = useState("");

  // Alert
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const createCamp = async () => {
    try {
      await api.post("/coordinator/camps", {
        name: campName,
        location: { address: campAddress, lat: Number(campLat), lng: Number(campLng) },
        capacity: Number(campCapacity),
      });
      Alert.alert("Success", "Camp created");
      setShowCamp(false);
      setCampName(""); setCampAddress(""); setCampLat(""); setCampLng(""); setCampCapacity("");
    } catch {
      Alert.alert("Error", "Failed to create camp");
    }
  };

  const createTask = async () => {
    try {
      await api.post("/coordinator/tasks", {
        title: taskTitle,
        description: taskDesc,
        location: { lat: Number(taskLat), lng: Number(taskLng) },
      });
      Alert.alert("Success", "Task created");
      setShowTask(false);
      setTaskTitle(""); setTaskDesc(""); setTaskLat(""); setTaskLng("");
    } catch {
      Alert.alert("Error", "Failed to create task");
    }
  };

  const sendAlert = async () => {
    try {
      await api.post("/coordinator/alerts", {
        title: alertTitle,
        message: alertMessage,
      });
      Alert.alert("Success", "Alert sent");
      setShowAlert(false);
      setAlertTitle(""); setAlertMessage("");
    } catch {
      Alert.alert("Error", "Failed to send alert");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create</Text>

      <View style={{ gap: 12 }}>
        <Button title="Create Camp" color={colors.primary} onPress={() => setShowCamp(true)} />
        <Button title="Create Task" color={colors.primary} onPress={() => setShowTask(true)} />
        <Button title="Send Alert" color={colors.warning} onPress={() => setShowAlert(true)} />
      </View>

      {/* ===== Create Camp Modal ===== */}
      <Modal visible={showCamp} animationType="slide" transparent>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Create Camp</Text>
            <ScrollView>
              <TextInput placeholder="Camp Name" value={campName} onChangeText={setCampName} style={styles.input} />
              <TextInput placeholder="Address" value={campAddress} onChangeText={setCampAddress} style={styles.input} />
              <TextInput placeholder="Latitude" value={campLat} onChangeText={setCampLat} keyboardType="numeric" style={styles.input} />
              <TextInput placeholder="Longitude" value={campLng} onChangeText={setCampLng} keyboardType="numeric" style={styles.input} />
              <TextInput placeholder="Capacity" value={campCapacity} onChangeText={setCampCapacity} keyboardType="numeric" style={styles.input} />
            </ScrollView>
            <View style={styles.modalActions}>
              <Pressable onPress={() => setShowCamp(false)}><Text style={styles.cancel}>Cancel</Text></Pressable>
              <Button title="Create" color={colors.primary} onPress={createCamp} />
            </View>
          </View>
        </View>
      </Modal>

      {/* ===== Create Task Modal ===== */}
      <Modal visible={showTask} animationType="slide" transparent>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Create Task</Text>
            <ScrollView>
              <TextInput placeholder="Task Title" value={taskTitle} onChangeText={setTaskTitle} style={styles.input} />
              <TextInput placeholder="Description" value={taskDesc} onChangeText={setTaskDesc} style={styles.input} />
              <TextInput placeholder="Latitude" value={taskLat} onChangeText={setTaskLat} keyboardType="numeric" style={styles.input} />
              <TextInput placeholder="Longitude" value={taskLng} onChangeText={setTaskLng} keyboardType="numeric" style={styles.input} />
            </ScrollView>
            <View style={styles.modalActions}>
              <Pressable onPress={() => setShowTask(false)}><Text style={styles.cancel}>Cancel</Text></Pressable>
              <Button title="Create" color={colors.primary} onPress={createTask} />
            </View>
          </View>
        </View>
      </Modal>

      {/* ===== Send Alert Modal ===== */}
      <Modal visible={showAlert} animationType="slide" transparent>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Send Alert</Text>
            <TextInput placeholder="Alert Title" value={alertTitle} onChangeText={setAlertTitle} style={styles.input} />
            <TextInput placeholder="Message" value={alertMessage} onChangeText={setAlertMessage} style={styles.input} />
            <View style={styles.modalActions}>
              <Pressable onPress={() => setShowAlert(false)}><Text style={styles.cancel}>Cancel</Text></Pressable>
              <Button title="Send" color={colors.warning} onPress={sendAlert} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
    color: colors.text,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    padding: 16,
  },
  modalCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    maxHeight: "90%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
    color: colors.text,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  cancel: {
    color: colors.muted,
    fontSize: 16,
  },
});