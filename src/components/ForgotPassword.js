import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import './styles.css';

const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const onSubmit = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      const userDocRef = doc(db, 'users', data.email);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        await updateDoc(userDocRef, { password: data.newPassword });
        setSuccessMessage('Password updated successfully. You can now login.');
        navigate('/login', { replace: true });
      } else {
        setErrorMessage('User not found');
      }
    } catch (error) {
      console.error("Error updating password:", error);
      setErrorMessage('Password update failed. Please try again later.');
    }
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <h2 className="form-header">Reset Password</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input className="form-input" {...register('email', { required: true })} placeholder="Email" />
          {errors.email && <span className="error-message">Email is required</span>}
          <input className="form-input" type="password" {...register('newPassword', { required: true })} placeholder="New Password" />
          {errors.newPassword && <span className="error-message">New Password is required</span>}
          <input className="form-input" type="password" {...register('confirmPassword', { required: true })} placeholder="Confirm Password" />
          {errors.confirmPassword && <span className="error-message">Confirm Password is required</span>}
          <button className="form-button" type="submit">Submit</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
