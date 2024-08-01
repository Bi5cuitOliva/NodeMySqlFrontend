import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = ({ onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !role) {
      toast.error('Please fill in all fields.', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/User/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();
      if (response.ok) {
        if (
          data.message &&
          data.message.includes('User registered successfully')
        ) {
          onRegister(data); // Update state or UI based on registration success
          toast.success(data.message, {
            position: 'top-right',
            autoClose: 3000,
          });
          window.location.href = '/view-students'; // Redirect on success
        } else {
          // Handle unexpected success responses
          console.error('Unexpected response:', data);
          toast.error('An unexpected error occurred.', {
            position: 'top-right',
            autoClose: 3000,
          });
        }
      } else {
        // Handle server errors
        toast.error(
          data.message || 'An error occurred while registering the user.',
          {
            position: 'top-right',
            autoClose: 3000,
          }
        );
      }
    } catch (error) {
      console.error('Registration failed:', error.message);
      toast.error('An error occurred while registering the user.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  return (
    <div
      className='register-form'
      style={{
        marginLeft: '500px',
        marginTop: '300px',
      }}
    >
      <h3 className='mytext'>Register</h3>
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
        <input
          type='text'
          value={role}
          placeholder='Enter your role here'
          onChange={(e) => setRole(e.target.value)}
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
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
