import { useState, useEffect, useCallback } from "react";
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
    async (title: string, description: string, dueDate: number | null = null) => {
      const newTask: Task = {
        id: Date.now().toString(),
        title: title.trim(),
        description: description.trim(),
        completed: false,
        createdAt: Date.now(),
        dueDate,
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

  const updateTaskDate = useCallback(
    async (id: string, dueDate: number | null) => {
      const updated = tasks.map((t) =>
        t.id === id ? { ...t, dueDate } : t
      );
      await persistAndSet(updated);
    },
    [tasks, persistAndSet]
  );

  return { tasks, loading, addTask, toggleTask, deleteTask, updateTaskDate };
};
