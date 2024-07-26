import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleForgotPassword = (e) => {
    e.preventDefault();
    // Implement forgot password logic here
    // If successful, provide feedback to the user
    navigate('/login');
  };

  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
      
      <form onSubmit={handleForgotPassword} className="max-w-md mx-auto p-4 pt-6 md:p-6 lg:p-12 bg-white shadow-md rounded">
      <h1 className="text-3xl font-bold mb-4 text-center">Forgot Password</h1>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
            placeholder="Enter email"
          />
        </div>
        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;