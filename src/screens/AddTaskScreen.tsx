import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useTaskContext } from "../context/TaskContext";
import { useTheme } from "../context/ThemeContext";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const AddTaskScreen = ({ navigation }: any) => {
  const { addTask } = useTaskContext();
  const { theme } = useTheme();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleAdd = async () => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      Alert.alert("Error", "Task title cannot be empty.");
      return;
    }
    await addTask(trimmedTitle, description.trim(), dueDate?.getTime() ?? null);
    navigation.goBack();
  };

  const formatDisplayDate = (d: Date): string => {
    return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  };

  const quickDates = [
    { label: "Today", value: new Date() },
    { label: "Tomorrow", value: new Date(Date.now() + 86400000) },
    { label: "Next Week", value: new Date(Date.now() + 7 * 86400000) },
    { label: "No Date", value: null },
  ];

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View
        style={[
          styles.header,
          { backgroundColor: theme.headerBackground, shadowColor: theme.headerShadow },
        ]}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.backText, { color: theme.primary }]}>← Back</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>New Task</Text>
      </View>

      <View style={styles.form}>
        <Text style={[styles.label, { color: theme.textSecondary }]}>Title *</Text>
        <TextInput
          style={[
            styles.titleInput,
            {
              backgroundColor: theme.surface,
              color: theme.text,
              shadowColor: theme.headerShadow,
            },
          ]}
          placeholder="What needs to be done?"
          placeholderTextColor={theme.textMuted}
          value={title}
          onChangeText={setTitle}
          autoFocus
          maxLength={100}
        />

        <Text style={[styles.label, { color: theme.textSecondary }]}>Description</Text>
        <TextInput
          style={[
            styles.descriptionInput,
            {
              backgroundColor: theme.surface,
              color: theme.text,
              shadowColor: theme.headerShadow,
            },
          ]}
          placeholder="Add details (optional)"
          placeholderTextColor={theme.textMuted}
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={3}
          textAlignVertical="top"
          maxLength={300}
        />

        <Text style={[styles.label, { color: theme.textSecondary }]}>Due Date</Text>
        <TouchableOpacity
          style={[styles.dateButton, { backgroundColor: theme.surface }]}
          onPress={() => setShowDatePicker(!showDatePicker)}
        >
          <Text
            style={[
              styles.dateButtonText,
              { color: dueDate ? theme.text : theme.textMuted },
            ]}
          >
            {dueDate ? formatDisplayDate(dueDate) : "Select a due date (optional)"}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <View style={styles.quickDateRow}>
            {quickDates.map((qd) => (
              <TouchableOpacity
                key={qd.label}
                style={[
                  styles.quickDateChip,
                  {
                    backgroundColor:
                      (qd.value === null && dueDate === null) ||
                      (qd.value && dueDate?.toDateString() === qd.value.toDateString())
                        ? theme.chipActive
                        : theme.chipInactive,
                  },
                ]}
                onPress={() => {
                  setDueDate(qd.value);
                  setShowDatePicker(false);
                }}
              >
                <Text
                  style={[
                    styles.quickDateText,
                    {
                      color:
                        (qd.value === null && dueDate === null) ||
                        (qd.value && dueDate?.toDateString() === qd.value.toDateString())
                          ? theme.chipTextActive
                          : theme.chipTextInactive,
                    },
                  ]}
                >
                  {qd.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <TouchableOpacity
          style={[
            styles.submitButton,
            { backgroundColor: theme.primary, shadowColor: theme.primaryShadow },
          ]}
          onPress={handleAdd}
        >
          <Text style={styles.submitText}>Add Task</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
  backButton: {
    marginBottom: 8,
  },
  backText: {
    fontSize: 16,
    fontWeight: "600",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
  },
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  titleInput: {
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 20,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  descriptionInput: {
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 20,
    minHeight: 100,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  dateButton: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  dateButtonText: {
    fontSize: 16,
  },
  quickDateRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 24,
  },
  quickDateChip: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  quickDateText: {
    fontSize: 14,
    fontWeight: "600",
  },
  submitButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "700",
  },
});

export default AddTaskScreen;
