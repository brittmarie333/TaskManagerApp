import React from 'react';
import { useAuth0, Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TaskDashboard from './pages/TaskDashboardPage';
import TaskDetails from './pages/TaskDetailsPage';
import TaskForm from './components/TaskForm';
import LoginPage from './pages/LoginPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TaskProvider } from './context/TaskContext';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isLoading } = useAuth0();
  if (isLoading) return <div>Loading...</div>;
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App: React.FC = () => {
  const { logout, isAuthenticated } = useAuth0();

  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN || ''}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID || ''}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <TaskProvider>
        <Router>
          <div className="App">
            {/* NAVBAR */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <Link className="navbar-brand" to="/tasks">Task Manager</Link>
              <div className="collapse navbar-collapse">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link" to="/tasks">Dashboard</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/tasks/create">Create Task</Link>
                  </li>
                  {!isAuthenticated && (
                    <li className="nav-item">
                      <Link className="nav-link" to="/login">Login</Link>
                    </li>
                  )}
                  {isAuthenticated && (
                    <li className="nav-item">
                      <button
                        className="btn btn-link nav-link"
                        onClick={() =>
                          logout({
                            logoutParams: {
                              returnTo: window.location.origin + '/login',
                            },
                          })
                        }
                      >
                        Logout
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            </nav>

            {/* ROUTES */}
            <div className="container mt-4">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route
                  path="/tasks"
                  element={
                    <PrivateRoute>
                      <TaskDashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/tasks/create"
                  element={
                    <PrivateRoute>
                      <TaskForm />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/tasks/details/:id"
                  element={
                    <PrivateRoute>
                      <TaskDetails />
                    </PrivateRoute>
                  }
                />
                <Route path="/login" element={<LoginPage />} />
              </Routes>
            </div>
          </div>
        </Router>
      </TaskProvider>
    </Auth0Provider>
  );
};

export default App;
