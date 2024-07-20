import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import './styles.css';

const Login = ({ onLogin }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (data) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', data.email));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.password === data.password) { // Verify the password
          onLogin(false);
          navigate('/home', { replace: true });
        } else {
          setErrorMessage('Incorrect password');
        }
      } else {
        setErrorMessage('User not found. Please sign up.');
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage('Login failed. Please try again later.');
    }
  };

  const onAdminLogin = (data) => {
    const adminCredentials = { email: 'admin', password: 'admin' };
    if (data.email === adminCredentials.email && data.password === adminCredentials.password) {
      onLogin(true);
      navigate('/admin', { replace: true });
    } else {
      setErrorMessage('Invalid admin credentials.');
    }
  };

  const handleAdminLoginSubmit = handleSubmit(onAdminLogin);

  return (
    <div className="container">
      <div className="form-wrapper">
        <h2 className="form-header">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input className="form-input" {...register('email', { required: true })} placeholder="Email" />
          {errors.email && <span className="error-message">Email is required</span>}
          <input className="form-input" type="password" {...register('password', { required: true })} placeholder="Password" />
          {errors.password && <span className="error-message">Password is required</span>}
          <button className="form-button" type="submit">Login as User</button>
        </form>
        <form onSubmit={handleAdminLoginSubmit}>
          <button className="form-button" type="submit">Login as Admin</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <p className="link-text">Don't have an account? <a href="/signup">Sign up here</a></p>
        <p className="link-text"><Link to="/forgot-password">Forgot Password?</Link></p>
      </div>
    </div>
  );
};

export default Login;
