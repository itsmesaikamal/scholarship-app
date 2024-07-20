import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import './styles.css';

const Signup = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');

  const onSubmit = async (data) => {
    try {
      await setDoc(doc(db, 'users', data.email), {
        name: data.name,
        registrationNumber: data.registrationNumber,
        email: data.email,
        phoneNumber: data.phoneNumber
      });
      setSuccessMessage('Signup successful! Data has been stored in the database.');
      setTimeout(() => {
        navigate('/home',{replace:true});
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <h2 className="form-header">Signup</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input className="form-input" {...register('name', { required: true })} placeholder="Name" />
          {errors.name && <span className="error-message">Name is required</span>}
          <input className="form-input" {...register('registrationNumber', { required: true })} placeholder="Registration Number" />
          {errors.registrationNumber && <span className="error-message">Registration Number is required</span>}
          <input className="form-input" {...register('email', { required: true })} placeholder="Email" />
          {errors.email && <span className="error-message">Email is required</span>}
          <input className="form-input" {...register('phoneNumber', { required: true })} placeholder="Phone Number" />
          {errors.phoneNumber && <span className="error-message">Phone Number is required</span>}
          <input className="form-input" type="password" {...register('password', { required: true })} placeholder="Password" />
          {errors.password && <span className="error-message">Password is required</span>}
          <input className="form-input" type="password" {...register('confirmPassword', {
            validate: value => value === watch('password')
          })} placeholder="Confirm Password" />
          {errors.confirmPassword && <span className="error-message">Passwords do not match</span>}
          <button className="form-button" type="submit">Sign Up</button>
        </form>
        {successMessage && <p className="success-message">{successMessage}</p>}
        <p className="link-text">Already have an account? <a href="/login">Login here</a></p>
      </div>
    </div>
  );
};

export default Signup;
