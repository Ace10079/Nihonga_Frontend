import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // Show loading spinner while checking auth state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d2b3db]"></div>
      </div>
    );
  }

  // If user is logged in, render children; otherwise redirect to home
  return user ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
