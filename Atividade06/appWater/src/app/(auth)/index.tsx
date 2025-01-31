import React, { useEffect, useState } from "react";
import { Button, Text, View, FlatList, StyleSheet, TextInput, Alert } from "react-native";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  const [notifications, setNotifications] = useState<Notifications.Notification[]>([]);
  const [interval, setInterval] = useState("30");

  async function scheduleNotification() {
    try {
      const intervalInSeconds = parseInt(interval) * 60;

      if (isNaN(intervalInSeconds) || intervalInSeconds <= 0) {
        alert("Por favor, insira um intervalo de tempo válido (em minutos).");
        return;
      }

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Hora de Beber Água!",
          body: "Não se esqueça de se hidratar.",
          sound: "aud2.wav",
        },
        trigger: {
          seconds: intervalInSeconds,
          repeats: true,
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        },
      });

      Alert.alert(
        "Lembrete Agendado",
        `O lembrete foi agendado com sucesso para a cada ${interval} minutos.`
      );
    } catch (error) {
      console.error("Erro ao agendar notificação:", error);
      Alert.alert("Erro", "Não foi possível agendar a notificação.");
    }
  }

  useEffect(() => {
    async function requestPermissions() {
      const { status } = await Notifications.requestPermissionsAsync();
      console.log("Status da permissão:", status);
      if (status !== "granted") {
        alert("Permissão para notificações não concedida.");
      }
    }
    requestPermissions();
  }, []);

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("Notificação recebida:", notification);
        setNotifications((prev) => [...prev, notification]);
      }
    );

    return () => subscription.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>App de Hidratação</Text>
      <TextInput
        style={styles.input}
        placeholder="Defina o intervalo em minutos"
        placeholderTextColor="white"
        value={interval}
        onChangeText={(text) => setInterval(text)}
        keyboardType="numeric"
      />
      <Button title="Agendar Lembrete" onPress={scheduleNotification} />
      <FlatList
        data={notifications}
        style={styles.flatContainer}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.notificationItem}>
            <Text style={styles.titleWater}>{item.request.content.title}</Text>
            <Text style={styles.bodyWater}>{item.request.content.body}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#121214",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: "white",
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: "white",
    backgroundColor: "#313138",
  },
  flatContainer: {
    marginTop: 35,
  },
  notificationItem: {
    display: "flex",
    flexDirection: "column",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#313138",
    padding: 10,
    marginBottom: 10,
  },
  titleWater: {
    fontWeight: "bold",
    fontSize: 22,
    color: "white",
  },
  bodyWater: {
    fontSize: 18,
    color: "white",
    fontWeight: "300",
  },
});
