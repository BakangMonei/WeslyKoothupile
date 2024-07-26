import React, { useState } from 'react';
import { auth, firestore } from '../database/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const RegistrationPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== repassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      // Create a new user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Add user to Firestore
      const usersCollection = collection(firestore, 'users');
      await addDoc(usersCollection, {
        uid: user.uid,
        firstName,
        lastName,
        email: user.email,
        phoneNumber,
      });

      // Show registration success popup
      alert('Registration successful!');

      // Clear fields
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setRepassword('');
      setPhoneNumber('');

      // Redirect to login page
      navigate('/login');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">

      <form onSubmit={handleRegister} className="max-w-md mx-auto p-4 pt-6 md:p-6 lg:p-12 bg-white shadow-md rounded">
        <div className="mb-4">
          <h1 className="text-3xl font-bold mb-4 text-center">Register</h1>
          <label className="block text-sm font-bold mb-2">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-2 border rounded"
            required
            placeholder="Enter first name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-2 border rounded"
            required
            placeholder="Enter last name"
          />
        </div>
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
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Phone Number</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full p-2 border rounded"
            required
            placeholder="Enter phone number"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
            placeholder="Enter password"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Confirm Password</label>
          <input
            type="password"
            value={repassword}
            onChange={(e) => setRepassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
            placeholder="Confirm password"
          />
        </div>
        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationPage;