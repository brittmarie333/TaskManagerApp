import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Welcome to Your Task Manager!</h1>
      <p>
        This is a simple Task Manager app that allows you to:
      </p>
      <ul>
        <li>Store tasks you need to complete</li>
        <li>Update your tasks when your plans change</li>
        <li>Delete tasks that are no longer needed</li>
      </ul>
      <p>
        All your tasks can be managed at your convenience, whenever you need to!
      </p>
      <p>
        If you’d like to get started, please <Link to="/login">log in</Link> to access your task dashboard.
      </p>
    </div>
  );
};

export default HomePage;
