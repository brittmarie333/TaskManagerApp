import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/tasks');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
      <h2>Login to access your task manager!</h2>
      <button onClick={() => loginWithRedirect()}>
        Login Here!
      </button>
    </div>
  );
};

export default LoginPage;
