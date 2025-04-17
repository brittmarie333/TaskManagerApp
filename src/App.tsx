import React from 'react';
import { useAuth0, Auth0Provider } from '@auth0/auth0-react'; // Add this import
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TaskDashboard from './pages/TaskDashboardPage';
import TaskForm from './components/TaskForm';
import LoginPage from './pages/LoginPage';
import CallbackPage from './pages/CallBackPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TaskProvider } from './context/TaskContext';
import { Link } from 'react-router-dom';

// App component
const App: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  // Private route to ensure user is authenticated before accessing a page
  const PrivateRoute = ({ element }: { element: React.ReactNode }) => {
    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
      // Redirect to login page if not authenticated
      return <Navigate to="/login" />;
    }

    return <>{element}</>; // Render protected route if authenticated
  };

  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN || ''}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID || ''}
      authorizationParams={{
        redirect_uri: window.location.origin + '/callback',
      }}
    >
      <TaskProvider>
        <Router>
          <div className="App">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <Link className="nav-link" to="/tasks/manager">Task Manager</Link>
              <div className="collapse navbar-collapse">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link" to="/tasks">Dashboard</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/tasks/create">Create Task</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                </ul>
              </div>
            </nav>

            <div className="container mt-4">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/tasks" element={<PrivateRoute element={<TaskDashboard />} />} />
                <Route path="/tasks/create" element={<PrivateRoute element={<TaskForm />} />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/callback" element={<CallbackPage />} />
              </Routes>
            </div>
          </div>
        </Router>
      </TaskProvider>
    </Auth0Provider>
  );
};

export default App;
