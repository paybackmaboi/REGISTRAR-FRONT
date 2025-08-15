import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../../utils/api'; 

function Login({ onLoginSuccess }) {
  const [idNumber, setIdNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Automatically clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ idNumber, password }) 
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Login failed');
      localStorage.setItem('token', data.token);
      localStorage.setItem('userRole', data.user.role);
      localStorage.setItem('idNumber', data.user.idNumber);

      if (data.user.role === 'student') {
        const fullName = `${data.user.firstName} ${data.user.middleName || ''} ${data.user.lastName}`;
        localStorage.setItem('fullName', fullName.trim());
        localStorage.setItem('course', data.user.course);
      }

      onLoginSuccess(data.user.role);
    } catch (err) { 
      setError(err.message); 
    }
  };

  return (
    <div className="container mt-5">
  <div className="row align-items-center justify-content-center">
    {/* Logo - hides automatically on small screens */}
    <div className="col-md-5 d-flex justify-content-center d-none d-md-flex">
      <img
        src="/bcleads.png"
        alt="Registrar Logo"
        className="mb-4 img-fluid"
        style={{ maxWidth: '850px', width: '100%', height: 'auto' }}
      />
    </div>

    {/* Login Card */}
    <div className="col-12 col-md-7 d-flex justify-content-center">
      <div
        className="loginCard shadow-lg p-4 w-100 d-flex flex-column align-items-center"
        style={{ maxWidth: '400px' }}
      >
        <div className="d-flex justify-content-center mb-2">
          <img src="/benedicto2.png" alt="Registrar Logo" className="img-fluid"  style={{ fontSize: '2.5rem'}}/>
        </div>
        <h2
          className="text-center mb-4 fw-bold"
          style={{
            color: '#dd5618',
            fontSize: '2rem',
            fontFamily: 'Poppins, Arial, sans-serif',
          }}
        >
          Login
        </h2>
        <form onSubmit={handleSubmit} className="w-100">
          <div className="d-flex flex-column align-items-center">
            <div className="mb-3 w-100 d-flex flex-column align-items-center">
              <label htmlFor="idNumber" className="mb-1 fs-6" style={{ color: '#dd5618', fontFamily: 'Poppins, Arial, sans-serif'}}>
                ID Number
              </label>
              <input
                  type="text"
                  className="form-control rounded-3 text-center"
                  style={{
                    maxWidth: '320px',
                    border: error ? '1px solid red' : '', // 🔹 Red border if error exists
                  }}
                  id="idNumber"
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                  required
                  placeholder="Enter your ID number"
                />
            </div>
            <div className="mb-3 w-100 d-flex flex-column align-items-center">
              <label htmlFor="password" className="mb-1 fs-6" style={{ color: '#dd5618', fontFamily: 'Poppins, Arial, sans-serif' }}>
                Password
              </label>
              <input
                  type="password"
                  className="form-control rounded-3 text-center"
                  style={{
                    maxWidth: '320px',
                    border: error ? '1px solid red' : '', // 🔹 Red border if error exists
                  }}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"/>
            </div>
          </div>

          {/* Error message */}
          <div style={{ height: '24px', marginBottom: '10px' }}>
            {error && <div style={{ color: 'red', fontWeight: 500, fontFamily: 'Poppins, Arial, sans-serif' }}>{error}</div>}
          </div>

          {/* Buttons */}
          <div className="d-grid gap-2">
            <button
              type="submit"
              className="btn rounded-pill mt-2 login-btn"
              style={{ fontFamily: 'Poppins, Arial, sans-serif' }}
            >
              Login
            </button>
            <Link
              to="/register"
              className="btn btn-outline-secondary my-2"
              style={{ transition: 'filter 0.2s', fontFamily: 'Poppins, Arial, sans-serif' }}
              onMouseOver={(e) => (e.currentTarget.style.filter = 'brightness(0.97)')}
              onMouseOut={(e) => (e.currentTarget.style.filter = 'none')}
            >
              Register as a New Student
            </Link>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

  );
}

export default Login;