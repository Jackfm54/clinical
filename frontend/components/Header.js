import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Header({ title }) {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    padding: 15,
    backgroundColor: "#007BFF",
    alignItems: "center",
  },
  headerText: { color: "white", fontSize: 18, fontWeight: "bold" },
});
