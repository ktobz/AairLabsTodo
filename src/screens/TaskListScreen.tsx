import React, { useState, useCallback, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useTaskContext } from "../context/TaskContext";
import { useTheme } from "../context/ThemeContext";
import TaskList from "../components/TaskList";
import EmptyState from "../components/EmptyState";
import FAB from "../components/FAB";
import VoiceInputModal from "../components/VoiceInputModal";
import { useVoiceInput } from "../hooks/useVoiceInput";

type FilterType = "all" | "active" | "completed";
type SortType = "created" | "dueDate";

const FILTERS: { key: FilterType; label: string }[] = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "completed", label: "Completed" },
];

const TaskListScreen = ({ navigation }: any) => {
  const { tasks, toggleTask, deleteTask, addTask } = useTaskContext();
  const { theme, isDark, toggleTheme } = useTheme();
  const [voiceModalVisible, setVoiceModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [sortBy, setSortBy] = useState<SortType>("created");
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

  const filteredTasks = useMemo(() => {
    let result = tasks;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q)
      );
    }

    if (filter === "active") {
      result = result.filter((t) => !t.completed);
    } else if (filter === "completed") {
      result = result.filter((t) => t.completed);
    }

    return result;
  }, [tasks, searchQuery, filter]);

  const completedCount = tasks.filter((t) => t.completed).length;

  const handleOpenVoice = () => setVoiceModalVisible(true);

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
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View
        style={[
          styles.header,
          {
            backgroundColor: theme.headerBackground,
            shadowColor: theme.headerShadow,
          },
        ]}
      >
        <View style={styles.headerTop}>
          <View>
            <Text style={[styles.headerTitle, { color: theme.text }]}>My Tasks</Text>
            <Text style={[styles.headerSubtitle, { color: theme.textTertiary }]}>
              {tasks.length === 0
                ? "No tasks"
                : `${completedCount} of ${tasks.length} completed`}
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.themeButton, { backgroundColor: theme.surfaceSecondary }]}
            onPress={toggleTheme}
          >
            <Text style={styles.themeIcon}>{isDark ? "☀" : "🌙"}</Text>
          </TouchableOpacity>
        </View>

        <View
          style={[
            styles.searchContainer,
            { backgroundColor: theme.searchBackground },
          ]}
        >
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={[styles.searchInput, { color: theme.text }]}
            placeholder="Search tasks..."
            placeholderTextColor={theme.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Text style={[styles.clearIcon, { color: theme.textTertiary }]}>✕</Text>
            </TouchableOpacity>
          ) : null}
        </View>

        <View style={styles.controlsRow}>
          <View style={styles.filterRow}>
            {FILTERS.map((f) => (
              <TouchableOpacity
                key={f.key}
                style={[
                  styles.filterChip,
                  {
                    backgroundColor:
                      filter === f.key ? theme.chipActive : theme.chipInactive,
                  },
                ]}
                onPress={() => setFilter(f.key)}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    {
                      color:
                        filter === f.key
                          ? theme.chipTextActive
                          : theme.chipTextInactive,
                    },
                  ]}
                >
                  {f.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={[styles.sortButton, { backgroundColor: theme.surfaceSecondary }]}
            onPress={() =>
              setSortBy((s) => (s === "created" ? "dueDate" : "created"))
            }
          >
            <Text style={[styles.sortText, { color: theme.textSecondary }]}>
              {sortBy === "created" ? "Sort: Recent" : "Sort: Due Date"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.listContainer}>
        <TaskList
          tasks={filteredTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
          sortBy={sortBy}
          ListEmptyComponent={<EmptyState />}
        />
      </View>

      <FAB onPress={handleOpenVoice} />

      <TouchableOpacity
        style={[
          styles.addButton,
          { backgroundColor: theme.primary, shadowColor: theme.primaryShadow },
        ]}
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
  },
  header: {
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
  },
  headerSubtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  themeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  themeIcon: {
    fontSize: 22,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 12,
    height: 44,
  },
  searchIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 0,
  },
  clearIcon: {
    fontSize: 16,
    fontWeight: "600",
    padding: 4,
  },
  controlsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  filterRow: {
    flexDirection: "row",
    gap: 8,
  },
  filterChip: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: "600",
  },
  sortButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  sortText: {
    fontSize: 12,
    fontWeight: "600",
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
    alignItems: "center",
    justifyContent: "center",
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
