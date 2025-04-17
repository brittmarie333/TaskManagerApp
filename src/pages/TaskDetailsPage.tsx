import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTaskContext } from '../context/TaskContext';
import { Task } from '../types/task';

const TaskDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { tasks, updateTask } = useTaskContext();
  const [task, setTask] = useState<Task | null>(null);
  const [updatedTask, setUpdatedTask] = useState<Task | null>(null);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const foundTask = tasks.find((task: Task) => task.id === id);
      if (foundTask) {
        setTask(foundTask);
        setUpdatedTask(foundTask);
      } else {
        navigate('/tasks');
      }
    }
  }, [id, tasks, navigate]);

  const handleUpdateTask = () => {
    if (!updatedTask) return;
    updateTask(updatedTask);
    alert('Task updated!');
    setTask(updatedTask);
    setEditMode(false);
  };

  if (!task || !updatedTask) return <div>Loading...</div>;

  return (
    <div className="task-details-container">
      <div className="card">
        <div className="card-body">
          {editMode ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateTask();
              }}
            >
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  className="form-control"
                  value={updatedTask.title}
                  onChange={(e) =>
                    setUpdatedTask({ ...updatedTask, title: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  value={updatedTask.description}
                  onChange={(e) =>
                    setUpdatedTask({ ...updatedTask, description: e.target.value })
                  }
                />
              </div>
              <button className="btn btn-success me-2" type="submit">
                Save
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
            </form>
          ) : (
            <>
              <h2 className="card-title">{task.title}</h2>
              <p className="card-text">{task.description}</p>
              <button
                className="btn btn-primary me-2"
                onClick={() => setEditMode(true)}
              >
                Edit Task
              </button>
              <button className="btn btn-secondary" onClick={() => navigate('/tasks')}>
                Return to Dashboard
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
