
import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';  
import TaskForm from '../components/TaskForm';  


const TaskDashboard: React.FC = () => {
  const { tasks, deleteTask } = useTaskContext();  // get tasks and deleteTask function from context
  const [showForm, setShowForm] = useState(false);  // state to show/hide task form

  const handleShowForm = () => {
    setShowForm(true); 
  };

  const handleCloseForm = () => {
    setShowForm(false);  
  };

  const handleDelete = (taskId: string) => {
    deleteTask(taskId);  
  };

  return (
    <div>
      <h1>Task Dashboard</h1>
      <button onClick={handleShowForm}>Add Task</button>

      {/* show task form (if showForm is true) */}
      {showForm && (
        <div>
          <TaskForm />
          <button onClick={handleCloseForm}>Close</button>
        </div>
      )}

      <div>
        <h2>Your Tasks</h2>
        {tasks.length === 0 ? (
          <p>No tasks available</p>
        ) : (
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <button onClick={() => handleDelete(task.id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TaskDashboard;
