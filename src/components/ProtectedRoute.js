import { Navigate } from "react-router-dom";
import useAuthLogic from "../hooks/useAuthLogic";

export default function ProtectedRoute({ children }) {
//   const { user } = useAuthLogic();
//   return user ? children : <Navigate to="/login" />;
   const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
} 