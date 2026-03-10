import { createContext, useContext, useState, useEffect } from "react";
import { getProfile } from "../infrastructure/auth.api";

/*
  AuthContext.jsx:
  - Maneja estado global de autenticación
  - Provee user, token, login, logout a toda la app
  - Persiste sesión en localStorage
*/

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);

  // Verificar token al cargar la app
  useEffect(() => {
    async function checkAuth() {
      if (token) {
        try {
          const profileData = await getProfile(token);
          setUser(profileData);
        } catch {
          // Token inválido, limpiar
          localStorage.removeItem("token");
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    }
    checkAuth();
  }, [token]);

  // Iniciar sesión
  const login = (userData, accessToken) => {
    setUser(userData);
    setToken(accessToken);
    setIsGuest(false);
    localStorage.setItem("token", accessToken);
  };

  // Cerrar sesión
  const logout = () => {
    setUser(null);
    setToken(null);
    setIsGuest(false);
    localStorage.removeItem("token");
  };

  // Modo invitado (prueba gratuita)
  const enterGuestMode = () => {
    setIsGuest(true);
    setUser(null);
    setToken(null);
  };

  // Salir del modo invitado
  const exitGuestMode = () => {
    setIsGuest(false);
  };

  // Verificar si es admin
  const isAdmin = user?.role?.name === "admin";

  // Verificar si está autenticado
  const isAuthenticated = !!user && !!token;

  const value = {
    user,
    token,
    loading,
    isGuest,
    isAdmin,
    isAuthenticated,
    login,
    logout,
    enterGuestMode,
    exitGuestMode,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook para usar el contexto
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
}
