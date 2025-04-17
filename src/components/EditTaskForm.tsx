
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTaskContext } from '../context/TaskContext';
import { Task } from '../types/task';

const EditTaskForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();   
  const { tasks, updateTask } = useTaskContext();  
  const navigate = useNavigate();

  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    if (id) {
      const taskToEdit = tasks.find((task) => task.id === id);
      if (taskToEdit) {
        setTask(taskToEdit);
      }
    }
  }, [id, tasks]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (task) {
      const { name, value } = e.target;
      setTask({ ...task, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (task) {
      updateTask(task);  
      navigate('/tasks'); 
    }
  };

  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Description</label>
        <input
          type="text"
          name="description"
          value={task.description}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Save Task</button>
    </form>
  );
};

export default EditTaskForm;
