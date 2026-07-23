import React, { createContext, useContext, ReactNode } from "react";
import { Task } from "../types";
import { useTasks } from "../hooks/useTasks";

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  addTask: (title: string, description: string, dueDate?: number | null) => Promise<void>;
  toggleTask: (id: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  updateTaskDate: (id: string, dueDate: number | null) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const { tasks, loading, addTask, toggleTask, deleteTask, updateTaskDate } =
    useTasks();

  return (
    <TaskContext.Provider
      value={{ tasks, loading, addTask, toggleTask, deleteTask, updateTaskDate }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
