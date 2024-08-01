// src/components/Homepage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';


const Homepage = (props) => {
  const { loggedIn, email } = props;
  const navigate = useNavigate();

  const onButtonClick = () => {
    navigate('/login');
  };
  const onClick = () => {
    navigate('/register');
  };

  return (
    <div
      className='mainContainer'
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#e9ebee',
      }}
    >
      <div className={'titleContainer'} style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#333' }}>
          Stokeley
        </h1>
      </div>
      <p
        style={{
          fontSize: '1.2rem',
          maxWidth: '600px',
          textAlign: 'center',
          marginBottom: '20px',
          color: '#666',
        }}
      >
        Discover the world of technology development.
      </p>
      <div
        className={'buttonContainer'}
        style={{ display: 'flex', gap: '10px', marginTop: '20px' }}
      >
        <button
          className={'inputButton'}
          onClick={onButtonClick}
          style={{
            padding: '10px 20px',
            backgroundColor: '#3b92ef',
            color: 'white',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
            flexGrow: 1,
            margin: '0 5px',
          }}
        >
          {loggedIn ? 'Log out' : 'Log in'}
        </button>
        <button
          className={'inputButton'}
          onClick={onClick}
          style={{
            padding: '10px 20px',
            backgroundColor: '#00A693',
            color: 'white',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
            flexGrow: 1,
            margin: '0 5px',
          }}
        >
          Register
        </button>
      </div>
      {loggedIn && (
        <p style={{ fontSize: '1rem', marginTop: '10px' }}>
          Your email address is {email}
        </p>
      )}
    </div>
  );
};

export default Homepage;