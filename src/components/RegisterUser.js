import React, { useState } from 'react';

const RegisterUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement registration logic here
    
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-12">
          <label htmlFor="inputEmail4" className="form-label">Email</label>
          <input type="email" className="form-control" id="inputEmail4" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputPassword4" className="form-label">Password</label>
          <input type="password" className="form-control" id="inputPassword4" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputConfirmPassword4" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="inputConfirmPassword4" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>
        <div className="col-md-12">
          <button type="submit" className="btn btn-primary">Register</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterUser;