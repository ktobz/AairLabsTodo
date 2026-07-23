import React from "react";
import { View, Text, StyleSheet } from "react-native";

const EmptyState = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>📝</Text>
      <Text style={styles.title}>No tasks yet</Text>
      <Text style={styles.subtitle}>
        Tap the + button to add your first task
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  icon: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333333",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#888888",
    textAlign: "center",
  },
});

export default EmptyState;
