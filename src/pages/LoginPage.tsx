import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginPage: React.FC = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return <div>Welcome!</div>;
  }

  return (
    <div>
      <h2>Login to access your task manager!</h2>
      <button
        onClick={() => loginWithRedirect()} 
      >
        Login Here!
      </button>
    </div>
  );
};

export default LoginPage;
