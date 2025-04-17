import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTaskContext } from '../context/TaskContext'; 
import { Task } from '../types/task';  


const TaskDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // grab task id from the URL
  const { tasks } = useTaskContext(); 
  const [task, setTask] = useState<Task | null>(null); 
  const navigate = useNavigate();  

  useEffect(() => {
    if (id) {
      const foundTask = tasks.find((task: Task) => task.id === id);  // use task id to search
      if (foundTask) {
        setTask(foundTask);
      } else {
        navigate('/tasks'); // navigate back to the dashboard if zero tasks
      }
    }
  }, [id, tasks, navigate]);

  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <div className="task-details-container">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">{task.title}</h2>
          <p className="card-text">{task.description}</p>
          <button className="btn btn-primary" onClick={() => navigate('/tasks')}>
            Return to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
