import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import './AdminNavbar.css';

const AdminNavbar = ({ onLogout }) => {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <p className="navbar__welcome">Admin Portal</p>
        <ul className="navbar__links">
        <li className="navbar__item" onClick={() => navigate('/admin')}>Home</li>
          <li className="navbar__item" onClick={() => navigate('/admin/view-submissions')}>View Submissions</li>
          <li className="navbar__item navbar__item--logout" onClick={handleLogout}>Logout</li>
        </ul>
      </div>
    </nav>
  );
};

export default AdminNavbar;
