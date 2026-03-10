import { Routes, Route } from "react-router-dom";
import LandingPage from "../presentation/pages/LandingPage";
import LoginPage from "../presentation/pages/LoginPage";
import RegisterPage from "../presentation/pages/RegisterPage";
import CreateInvoicePage from "../presentation/pages/CreateInvoicePage";
import AdminPage from "../presentation/pages/AdminPage";
import ProfilePage from "../presentation/pages/ProfilePage";
import ProtectedRoute from "../presentation/components/ProtectedRoute";

/*
  AppRoutes.jsx:
  - Define las rutas principales de la aplicación
  - Rutas públicas: landing, login, registro
  - Rutas protegidas: crear factura, admin, perfil
*/

export default function AppRoutes() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Rutas protegidas */}
      <Route
        path="/create-invoice"
        element={
          <ProtectedRoute>
            <CreateInvoicePage />
          </ProtectedRoute>
        }
      />

      {/* Ruta perfil */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      {/* Ruta admin */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute requireAdmin>
            <AdminPage />
          </ProtectedRoute>
        }
      />

      {/* Ruta fallback */}
      <Route
        path="*"
        element={
          <h1 className="text-center py-20 text-2xl">Página no encontrada</h1>
        }
      />
    </Routes>
  );
}
