import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  // Check if user is logged in
  const loggedIn = localStorage.getItem("loggedInUser");

  // If logged in, render the children components(Focus List); otherwise, redirect to login Page
  return loggedIn ? children : <Navigate to="/login" replace />;
}
