import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const CallbackPage: React.FC = () => {
  const { handleRedirectCallback, isAuthenticated, error } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    const processAuthCallback = async () => {
      try {
        await handleRedirectCallback(); //aut callback
        navigate('/tasks'); // redirects to dashboard
      } catch (e) {
        console.error('Error processing the callback', e);
        navigate('/login'); // back to login if error
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
