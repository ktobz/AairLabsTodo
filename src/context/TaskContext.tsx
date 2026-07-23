import React, { createContext, useContext, ReactNode } from "react";
import { Task } from "../types";
import { useTasks } from "../hooks/useTasks";

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  addTask: (title: string, description: string) => Promise<void>;
  toggleTask: (id: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const { tasks, loading, addTask, toggleTask, deleteTask } = useTasks();

  return (
    <TaskContext.Provider
      value={{ tasks, loading, addTask, toggleTask, deleteTask }}
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
