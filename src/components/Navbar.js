import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import './Navbar.css';

const Navbar = ({ onLogout }) => {
  const navigate = useNavigate();
  const auth = getAuth(); // Get the auth instance

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user
      onLogout(); // Update the state in App.js
      navigate('/login'); // Redirect to the login page
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div>
      <nav className="navbar">
        <h1 className="navbar-title">Student Portal</h1>
        <ul className="navbar-links">
        <li onClick={() => navigate('/home')}>Home</li>
          <li onClick={() => navigate('/reimbursement-form')}>Reimbursement Form</li>
          <li onClick={() => navigate('/check-status')}>Check Status</li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
