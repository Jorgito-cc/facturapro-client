import axios from "axios";

// Usar variable de entorno para la URL de la API
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

/*
  invoice.api.js:
  - Comunicación con endpoints de facturas
  - Soporta modo invitado y autenticado
*/

// Crear factura (modo invitado - no guarda)
export const createInvoiceGuest = async (invoice) => {
  const response = await axios.post(`${API_URL}/invoices/guest`, invoice);
  return response.data;
};

// Crear factura (usuario autenticado - guarda en BD)
export const createInvoiceApi = async (invoice, token) => {
  const response = await axios.post(`${API_URL}/invoices`, invoice, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return response.data;
};

// Obtener facturas del usuario
export const getMyInvoices = async (token) => {
  const response = await axios.get(`${API_URL}/invoices/my-invoices`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Obtener factura por ID (con verificación de propietario)
export const getInvoiceById = async (id, token) => {
  const response = await axios.get(`${API_URL}/invoices/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
