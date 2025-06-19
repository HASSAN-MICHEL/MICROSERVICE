// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }
  return children;
};

// Exemple d'utilisation dans App.js
<Route path="/depenses" element={
  <ProtectedRoute allowedRoles={["Depenses", "Admin"]}>
    <DepensesPage />
  </ProtectedRoute>
} />