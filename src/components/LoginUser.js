import React, { useState } from 'react';

const LoginUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement login logic here
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-12">
          <label htmlFor="inputEmail" className="form-label">Email</label>
          <input type="email" className="form-control" id="inputEmail" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="col-md-12">
          <label htmlFor="inputPassword" className="form-label">Password</label>
          <input type="password" className="form-control" id="inputPassword" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="col-md-12">
          <button type="submit" className="btn btn-primary">Login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginUser;