import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Task } from "../types";
import { saveTasks, loadTasks } from "../utils/storage";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTasks().then((saved) => {
      setTasks(saved);
      setLoading(false);
    });
  }, []);

  const persistAndSet = useCallback(async (newTasks: Task[]) => {
    setTasks(newTasks);
    await saveTasks(newTasks);
  }, []);

  const addTask = useCallback(
    async (title: string, description: string) => {
      const newTask: Task = {
        id: Date.now().toString(),
        title: title.trim(),
        description: description.trim(),
        completed: false,
        createdAt: Date.now(),
        dueDate: null,
      };
      await persistAndSet([...tasks, newTask]);
    },
    [tasks, persistAndSet]
  );

  const toggleTask = useCallback(
    async (id: string) => {
      const updated = tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      );
      await persistAndSet(updated);
    },
    [tasks, persistAndSet]
  );

  const deleteTask = useCallback(
    async (id: string) => {
      const filtered = tasks.filter((t) => t.id !== id);
      await persistAndSet(filtered);
    },
    [tasks, persistAndSet]
  );

  return { tasks, loading, addTask, toggleTask, deleteTask };
};
