import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";

const EmptyState = () => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>📝</Text>
      <Text style={[styles.title, { color: theme.text }]}>No tasks yet</Text>
      <Text style={[styles.subtitle, { color: theme.textTertiary }]}>
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
  },
});

export default EmptyState;
