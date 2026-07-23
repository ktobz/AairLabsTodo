import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Task } from "../types";
import { useTheme } from "../context/ThemeContext";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const formatDate = (timestamp: number): string => {
  const d = new Date(timestamp);
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return `${months[d.getMonth()]} ${d.getDate()}`;
};

const isOverdue = (timestamp: number | null): boolean => {
  if (!timestamp) return false;
  return timestamp < Date.now();
};

const TaskItem = ({ task, onToggle, onDelete }: TaskItemProps) => {
  const { theme } = useTheme();

  const handleDelete = () => {
    Alert.alert("Delete Task", `Delete "${task.title}"?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => onDelete(task.id),
      },
    ]);
  };

  const overdue = !!(task.dueDate && !task.completed && isOverdue(task.dueDate));

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.surface,
          shadowColor: theme.headerShadow,
        },
        task.completed && { backgroundColor: theme.surfaceSecondary, opacity: 0.75 },
      ]}
    >
      <TouchableOpacity
        style={[
          styles.checkbox,
          { borderColor: theme.primary },
          task.completed && { backgroundColor: theme.primary, borderColor: theme.primary },
        ]}
        onPress={() => onToggle(task.id)}
      >
        {task.completed && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text
          style={[
            styles.title,
            { color: theme.text },
            task.completed && { color: theme.textMuted, textDecorationLine: "line-through" },
          ]}
          numberOfLines={1}
        >
          {task.title}
        </Text>
        {task.description ? (
          <Text
            style={[
              styles.description,
              { color: theme.textSecondary },
              task.completed && { color: theme.textMuted, textDecorationLine: "line-through" },
            ]}
            numberOfLines={2}
          >
            {task.description}
          </Text>
        ) : null}
        {task.dueDate ? (
          <Text
            style={[
              styles.dueDate,
              { color: overdue ? theme.overdue : theme.dueDate },
              overdue && styles.overdue,
            ]}
          >
            {overdue ? "Overdue: " : "Due: "}
            {formatDate(task.dueDate)}
          </Text>
        ) : null}
      </View>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={[styles.deleteText, { color: theme.danger }]}>✕</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 12,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  checkmark: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  description: {
    fontSize: 13,
    marginTop: 2,
  },
  dueDate: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 4,
  },
  overdue: {
    fontWeight: "700",
  },
  deleteButton: {
    padding: 8,
    marginLeft: 8,
  },
  deleteText: {
    fontSize: 18,
    fontWeight: "600",
  },
});

export default TaskItem;
