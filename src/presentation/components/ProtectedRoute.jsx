import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

/*
  ProtectedRoute.jsx:
  - Protege rutas que requieren autenticación
  - Redirige a landing si no está autenticado
  - Opcionalmente verifica rol de admin
*/

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const { isAuthenticated, isAdmin, loading, isGuest } = useAuth();

  // Mostrar loading mientras verifica token
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Si es modo invitado, permitir acceso (pero sin guardar)
  if (isGuest) {
    return children;
  }

  // Si no está autenticado, redirigir a landing
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Si requiere admin y no es admin, redirigir
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/create-invoice" replace />;
  }

  return children;
}
