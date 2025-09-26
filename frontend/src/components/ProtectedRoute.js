import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { token, loading } = useContext(AuthContext);

  if (loading) return null; // or a loader
  if (!token) return <Navigate to="/login" replace />; // redirect if not logged in

  return children;
}
