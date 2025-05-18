// src/components/LoginPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/LoginPage.css"; // Optional: Create a CSS file for styling

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Here you would typically handle authentication logic
    // For now, we'll just log the user in and redirect to the home page
    console.log("Logging in with:", { email, password });
    // Redirect to home page after login
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col space-y-4">
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border px-4 py-2 rounded-md"
          required
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border px-4 py-2 rounded-md"
          required
        />
        <button type="submit" className="bg-black text-white px-6 py-2 rounded-md">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
