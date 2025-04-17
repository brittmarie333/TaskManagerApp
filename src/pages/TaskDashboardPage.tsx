import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';  
import TaskForm from '../components/TaskForm';  
import { Link } from 'react-router-dom'; // ✅ Import Link

const TaskDashboard: React.FC = () => {
  const { tasks, deleteTask } = useTaskContext();
  const [showForm, setShowForm] = useState(false);

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
                
                {/* ✅ View Details link */}
                <Link to={`/tasks/details/${task.id}`}>
                  <button>View Details</button>
                </Link>

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
