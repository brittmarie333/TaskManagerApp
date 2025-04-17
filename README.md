# React Typescript - Task Manager App

Welcome to the Task Manager app! This simple application allows users to manage their tasks by creating, updating, and deleting them. The app is built with React and TypeScript, utilizing Auth0 for authentication, Bootstrap for layout, and local storage for data persistence.

## Features

- **Create tasks**: Add new tasks.
- **Edit tasks**: Update existing tasks to reflect changes.
- **Delete tasks**: Remove tasks that are no longer needed.
- **Protected routes**: Secure components and pages with authentication via Auth0.
- **Task dashboard**: View all your tasks in a dashboard.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **TypeScript**: A superset of JavaScript that adds static typing to the language.
- **Auth0**: Authentication and authorization platform for securing app access.
- **Bootstrap**: Frontend framework for responsive design and styling.
- **React Router**: For navigation and routing between pages.
- **Context API**: For managing global state, specifically for tasks.

#### Resources used: :mag:
[TypeScriptLang.org](https://www.typescriptlang.org/docs/handbook/2/functions.html)
[Auth0](https://auth0.auth0.com/)
[DevCommunity](https://dev.to)
[YouTube](https://youtube.com)
[geeksforgeeks](https://www.geeksforgeeks.org/)
[ChatGPT](https://chatgpt.com)


##HomePage
![welcome message](homeimg.jpg)

##LoginPage
![login page](loginimage.jpg)
I have also provided my callback page below: 

```
const CallbackPage: React.FC = () => {
  const { handleRedirectCallback, isAuthenticated, error } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    const processAuthCallback = async () => {
      try {
        await handleRedirectCallback(); // Process Auth0 callback
        navigate('/tasks'); // Redirect to the task dashboard (or any protected route)
      } catch (e) {
        console.error('Error processing the callback', e);
        navigate('/login'); // Redirect back to login if something goes wrong
      }
    };

    processAuthCallback();
  }, [handleRedirectCallback, navigate]);

  return (
    <div>
      <p>Processing authentication...</p>
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
    </div>
  );
};

export default CallbackPage;

```


##TaskDashboardPage
This page will show your tasks but will also allow you to add a task w/pop up taskform
``` 

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

```

##TaskDetailsPage
This page shows current tasks and will take you back to dashboard if no tasks are available. I set this page up to have uniform display with the dashboard.
```
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

```

##Components
In components you will find the TaskForm which is used to create a new task and you'll find EditTaskForm which is available to update current tasks. 
I have provided the code for EditTaskform:
```
const EditTaskForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();   
  const { tasks, updateTask } = useTaskContext();  
  const navigate = useNavigate();

  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    if (id) {
      const foundTask = tasks.find((task) => task.id === id);
      if (foundTask) {
        setTask(foundTask);  
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


```

##Context/Interface
Since Interface is straightforward and simple I have provided part of my Context code to showcase a custom hook and functions! 
```
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

```

#### Where can I find the program?
[Typescript Task Manager App](https://github.com/brittmarie333/TaskManagerApp.git) :computer: