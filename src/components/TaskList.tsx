import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Task } from "../types";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  ListEmptyComponent: React.ReactElement;
  sortBy: "created" | "dueDate";
}

const TaskList = ({
  tasks,
  onToggle,
  onDelete,
  ListEmptyComponent,
  sortBy,
}: TaskListProps) => {
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    if (sortBy === "dueDate") {
      if (!a.dueDate && !b.dueDate) return b.createdAt - a.createdAt;
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return a.dueDate - b.dueDate;
    }
    return b.createdAt - a.createdAt;
  });

  return (
    <FlatList
      data={sortedTasks}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TaskItem task={item} onToggle={onToggle} onDelete={onDelete} />
      )}
      ListEmptyComponent={ListEmptyComponent}
      contentContainerStyle={sortedTasks.length === 0 ? styles.emptyList : styles.list}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    paddingVertical: 8,
    paddingBottom: 100,
  },
  emptyList: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TaskList;
