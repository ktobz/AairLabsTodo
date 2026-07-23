import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useTaskContext } from "../context/TaskContext";
import TaskList from "../components/TaskList";
import EmptyState from "../components/EmptyState";
import FAB from "../components/FAB";
import VoiceInputModal from "../components/VoiceInputModal";
import { useVoiceInput } from "../hooks/useVoiceInput";

const TaskListScreen = ({ navigation }: any) => {
  const { tasks, toggleTask, deleteTask, addTask } = useTaskContext();
  const [voiceModalVisible, setVoiceModalVisible] = useState(false);
  const {
    isListening,
    transcript,
    error: voiceError,
    isSupported,
    startListening,
    stopListening,
    resetTranscript,
  } = useVoiceInput();

  useFocusEffect(
    useCallback(() => {
      resetTranscript();
    }, [])
  );

  const completedCount = tasks.filter((t) => t.completed).length;

  const handleOpenVoice = () => {
    setVoiceModalVisible(true);
  };

  const handleCloseVoice = () => {
    stopListening();
    resetTranscript();
    setVoiceModalVisible(false);
  };

  const handleTasksReceived = async (taskTitles: string[]) => {
    for (const title of taskTitles) {
      await addTask(title, "");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Tasks</Text>
        <Text style={styles.headerSubtitle}>
          {tasks.length === 0
            ? "No tasks"
            : `${completedCount} of ${tasks.length} completed`}
        </Text>
      </View>

      <View style={styles.listContainer}>
        <TaskList
          tasks={tasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
          ListEmptyComponent={<EmptyState />}
        />
      </View>

      <FAB onPress={handleOpenVoice} />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddTask")}
        activeOpacity={0.8}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      <VoiceInputModal
        visible={voiceModalVisible}
        isListening={isListening}
        transcript={transcript}
        error={voiceError}
        isSupported={isSupported}
        onClose={handleCloseVoice}
        onStartListening={startListening}
        onStopListening={stopListening}
        onTasksReceived={handleTasksReceived}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f7",
  },
  header: {
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 24,
    backgroundColor: "#ffffff",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1a1a1a",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#888888",
    marginTop: 4,
  },
  listContainer: {
    flex: 1,
    marginTop: 8,
  },
  addButton: {
    position: "absolute",
    bottom: 24,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#6c63ff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#6c63ff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  addButtonText: {
    fontSize: 28,
    color: "#ffffff",
    lineHeight: 30,
  },
});

export default TaskListScreen;
