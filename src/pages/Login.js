import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: API integration here
    console.log('Login with:', "email: " + email, "pass: " + password);
    navigate('/dashboard');
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2 className="login-title">TenantHub</h2>
        <p className="login-subtitle">SaaS Tenant Management Platform</p>
        <form onSubmit={handleSubmit}>
          <div className='mb-2'>
            <label>Email </label>
            <input type="email" placeholder="Enter your email" value={email} required onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='mb-2'>
            <label>Password </label>
            <input type="password" placeholder="Enter your password" value={password} required onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="login-options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <Link href="/" className="forgot-link">Forgot password?</Link>
          </div>
          <button type="submit" className='submit-button'>Sign in</button>
          <p className="demo-info">Demo: Use any email/password</p>
        </form>
      </div>
    </div>
  );
};

export default Login;
