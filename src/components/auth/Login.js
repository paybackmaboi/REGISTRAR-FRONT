import React, { useState } from 'react';
import { API_BASE_URL } from '../../utils/api'; 

function Login({ onLoginSuccess }) {
  const [idNumber, setIdNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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
      onLoginSuccess(data.user.role);
    } catch (err) { 
      setError(err.message); 
    }
  };

  return (
    <div className="container mt-5 w-75">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg p-4">
            <h2 className="text-center mb-4 text-white">Registrar Portal</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3 d-flex flex-column align-items-center">
                <label htmlFor="idNumber" class="text-white m-2">ID Number</label>
                <input
                  type="text"
                  className="form-control bg-transparent border-2 border-info rounded-pill w-75"
                  placeholder='Enter ID'
                  id="idNumber"
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3 d-flex flex-column align-items-center">
                <label htmlFor="password" class="text-white m-2">Password</label>
                <input
                  type="password"
                  className="form-control bg-transparent border-2 border-info  rounded-pill w-75"
                  placeholder='Enter password'
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
              <div class="text-center">
                <button type="submit" className="btn btn-outline-primary btn-md rounded-pill w-50">Login</button>
              </div>
              <p class="text-center mt-3 text-white">
                <small>Dummy Accounts: Student (S001/password) | Admin (A001/adminpass)</small>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;