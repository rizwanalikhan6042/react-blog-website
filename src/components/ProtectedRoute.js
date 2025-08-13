// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import useAuthLogic from "../hooks/useAuthLogic";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }) {
  const { token, user } = useAuthLogic();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    // Simulate auth check delay (optional)
    setCheckingAuth(false);
  }, [token]);

  if (checkingAuth) {
    return <div>Loading...</div>; // Spinner ya skeleton bhi laga sakte ho
  }

  if (!token || !user) {
    return <Navigate to="/login" />;
  }

  return children;
}
