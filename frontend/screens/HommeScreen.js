import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../components/Header";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Header title="Accueil" />
      <Text style={styles.text}>Bienvenue sur la plateforme de santé !</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 18 },
});
