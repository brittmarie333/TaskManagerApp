
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Task } from '../types/task'; 

interface TaskContextType {
  tasks: Task[];  
  addTask: (task: Task) => void;  
  updateTask: (updatedTask: Task) => void;  
  deleteTask: (id: string) => void; 
}
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// custom hook 
export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

interface TaskProviderProps {
  children: ReactNode;  
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const loadTasksFromStorage = () => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  };

  const [tasks, setTasks] = useState<Task[]>(loadTasksFromStorage);
  // save task when changeed
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // function to add task
  const addTask = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  // function to update existing task
  const updateTask = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  // function to delete a task by id
  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};
