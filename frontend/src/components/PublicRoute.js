import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function PublicRoute({ children }) {
  const { token, loading } = useContext(AuthContext);

  if (loading) return null; // or a loader
  if (token) return <Navigate to="/dashboard" replace />; // already logged in

  return children;
}
