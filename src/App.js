import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import Navbar from './components/Navbar';
import AdminNavbar from './components/AdminNavbar';
import ReimbursementForm from './components/ReimbursementForm';
import CheckStatus from './components/CheckStatus';
import AdminPage from './components/AdminPage';
import ViewSubmissions from './components/ViewSubmissions';
import SubmissionDetails from './components/SubmissionDetails';
import ForgotPassword from './components/ForgotPassword'; // Import ForgotPassword component

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = (admin = false) => {
    setIsLoggedIn(true);
    setIsAdmin(admin);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  return (
    <Router>
      <div className="App">
        {isLoggedIn && !isAdmin && <Navbar onLogout={handleLogout} />}
        {isLoggedIn && isAdmin && <AdminNavbar onLogout={handleLogout} />}
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Add Forgot Password route */}
          <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
          <Route path="/reimbursement-form" element={isLoggedIn ? <ReimbursementForm /> : <Navigate to="/login" />} />
          <Route path="/check-status" element={isLoggedIn ? <CheckStatus /> : <Navigate to="/login" />} />
          
          <Route path="/admin" element={isLoggedIn && isAdmin ? <AdminPage /> : <Navigate to="/login" />} />
          <Route path="/admin/view-submissions" element={isLoggedIn && isAdmin ? <ViewSubmissions /> : <Navigate to="/login" />} />
          <Route path="/submission/:id" element={isLoggedIn && isAdmin ? <SubmissionDetails /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
