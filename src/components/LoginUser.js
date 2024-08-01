import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginUser = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation
    if (!email || !password) {
      toast.error('Please fill in all fields.', {
        position: 'top-right',
        autoClose: false,
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        onLogin(data); // Handle successful login
        toast.success('Login successful!', {
          position: 'top-right',
          autoClose: false,
        });
        setTimeout(() => {
          window.location.href = '/view-students';
        }, 3000); // Delay in milliseconds
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred during login.', {
        position: 'top-right',
        autoClose: false,
      });
      setTimeout(() => {
        window.location.href = '/login'; // Optionally redirect back to login page on error
      }, 3000); // Delay in milliseconds
    }
  };

  return (
    <div
      className='login-form'
      style={{
        marginLeft: '500px',
        marginTop: '300px',
      }}
    >
      <h3 className='mytext'>Log In</h3>
      <form onSubmit={handleSubmit}>
        <input
          type='email'
          value={email}
          placeholder='Enter your email here'
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: '10px',
            margin: '10px 0',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        />
        <input
          type='password'
          value={password}
          placeholder='Enter your password here'
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: '10px',
            margin: '10px 0',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        />
        <button
          type='submit'
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Log In
        </button>
      </form>
    </div>
  );
};


export default LoginUser;