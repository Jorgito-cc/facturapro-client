import axios from "axios";

// Usar variable de entorno para la URL de la API
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

/*
  auth.api.js:
  - Comunicación con endpoints de autenticación
  - Login, registro, perfil, verificación de token
*/

// Registrar nuevo usuario
export async function registerUser(userData) {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  return response.data;
}

// Iniciar sesión
export async function loginUser(credentials) {
  const response = await axios.post(`${API_URL}/auth/login`, credentials);
  return response.data;
}

// Obtener perfil del usuario autenticado
export async function getProfile(token) {
  const response = await axios.get(`${API_URL}/auth/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

// Verificar si el token es válido
export async function verifyToken(token) {
  const response = await axios.get(`${API_URL}/auth/verify`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

// Obtener estadísticas (solo admin)
export async function getStats(token) {
  const response = await axios.get(`${API_URL}/invoices/stats`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

// Obtener todos los usuarios (solo admin)
export async function getAllUsers(token) {
  const response = await axios.get(`${API_URL}/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

// Actualizar usuario (solo admin)
export async function updateUser(token, userId, data) {
  const response = await axios.patch(`${API_URL}/users/${userId}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

// Eliminar usuario (solo admin)
export async function deleteUser(token, userId) {
  const response = await axios.delete(`${API_URL}/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}
