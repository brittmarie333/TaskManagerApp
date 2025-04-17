import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';  

const TaskForm: React.FC = () => {
  const [task, setTask] = useState({ title: '', description: '' });
  const { addTask } = useTaskContext();  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    const newTask = { ...task, id: Date.now().toString() }; //new task with unique id 
 
    addTask(newTask);

    // clear after submission
    setTask({ title: '', description: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
        placeholder="Title"
        required
      />
      <input
        type="text"
        name="description"
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
        placeholder="Description"
        required
      />
      <button type="submit">Save Task</button>
    </form>
  );
};

export default TaskForm;
