import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const clienteService = {
  getAll: () => api.get('/clientes'),
  getById: (id) => api.get(`/clientes/${id}`),
  create: (cliente) => api.post('/clientes', cliente),
  update: (id, cliente) => api.put(`/clientes/${id}`, cliente),
  delete: (id) => api.delete(`/clientes/${id}`),
};

export const direccionService = {
  getAll: () => api.get('/direcciones'),
  getById: (id) => api.get(`/direcciones/${id}`),
  create: (direccion) => api.post('/direcciones', direccion),
  update: (id, direccion) => api.put(`/direcciones/${id}`, direccion),
  delete: (id) => api.delete(`/direcciones/${id}`),
};

export default api;