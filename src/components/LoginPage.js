// src/components/LoginPage.js
import React from "react";
import useAuthLogic from "../hooks/useAuthLogic";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
const navigate = useNavigate();
   
  const { email, password, setEmail, setPassword, handleLogin } = useAuthLogic();
  const doLogin = async () => {
    await handleLogin();
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  };
  
  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
