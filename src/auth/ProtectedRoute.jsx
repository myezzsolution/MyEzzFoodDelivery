// src/auth/ProtectedRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Prefer sessionStorage (useful for development), fallback to localStorage
    const stored = sessionStorage.getItem("myezz_user") || localStorage.getItem("myezz_user");
    setIsAuthenticated(!!stored);
    setIsChecking(false);
  }, []);

  if (isChecking) {
    return <div className="text-center p-6">Checking authentication...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}
