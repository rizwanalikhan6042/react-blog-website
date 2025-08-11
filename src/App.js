import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import BlogApp from "./components/BlogApp";
import useAuthLogic from "./hooks/useAuthLogic"; // tumhara login form
import LoginPage from "./components/LoginPage";
import LogoutButton from "./components/LogoutButton";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Protected Route */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <BlogApp />
             </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
