import React, { createContext, useContext, useEffect, useState } from 'react';
import { Task } from '../types/task';

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  deleteTask: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load from sessionStorage on mount
  useEffect(() => {
    const stored = sessionStorage.getItem('tasks');
    if (stored) {
      setTasks(JSON.parse(stored));
    }
  }, []);

  // Save to sessionStorage whenever tasks change
  useEffect(() => {
    sessionStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Task) => {
    setTasks((prev) => [...prev, task]);
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};
