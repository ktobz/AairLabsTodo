import AsyncStorage from "@react-native-async-storage/async-storage";
import { Task } from "../types";

const TASKS_KEY = "@aair_todo_tasks";

export const saveTasks = async (tasks: Task[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error("Failed to save tasks:", error);
  }
};

export const loadTasks = async (): Promise<Task[]> => {
  try {
    const json = await AsyncStorage.getItem(TASKS_KEY);
    return json ? JSON.parse(json) : [];
  } catch (error) {
    console.error("Failed to load tasks:", error);
    return [];
  }
};
