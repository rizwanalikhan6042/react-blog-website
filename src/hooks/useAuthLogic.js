// src/hooks/useAuthLogic.js
import { useState, useEffect } from "react";

function useAuthLogic() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // --- Login handler ---
  const handleLogin = async () => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setUser(data.user);

    } catch (err) {
      console.error("Login failed:", err.message);
    }
  };

  // --- Logout handler ---
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
  };

  // --- Check logged-in user on page load / token change ---
  useEffect(() => {
    if (token) {
      fetch("/api/me", {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => {
          if (!res.ok) throw new Error("Unauthorized");
          return res.json();
        })
        .then(data => setUser(data.user))
        .catch(() => {
          handleLogout(); // token invalid → logout
        });
    }
  }, [token]);

  return {
    user,
    token,
    email,
    password,
    setEmail,
    setPassword,
    handleLogin,
    handleLogout
  };
}

export default useAuthLogic;
