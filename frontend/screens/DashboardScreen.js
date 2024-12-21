import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../components/Header";

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <Header title="Tableau de Bord" />
      <Text style={styles.text}>Bienvenue dans votre tableau de bord !</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 20, fontWeight: "bold" },
});
