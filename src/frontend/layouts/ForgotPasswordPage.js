import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleForgotPassword = (e) => {
    e.preventDefault();
    // Implement forgot password logic here
    // If successful, provide feedback to the user
    navigate('/login');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
      <form onSubmit={handleForgotPassword}>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full p-2 border rounded"
            required 
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Reset Password</button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
