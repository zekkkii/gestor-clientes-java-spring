import React, { useState, useEffect } from 'react';
import { clienteService } from '../services/api';

const ClienteList = ({ onEdit, onDelete, onViewAddresses }) => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      setLoading(true);
      const response = await clienteService.getAll();
      setClientes(response.data);
      setError(null);
    } catch (err) {
      setError('Error al cargar los clientes');
      console.error('Error fetching clientes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este cliente?')) {
      try {
        await onDelete(id);
        await fetchClientes();
      } catch (err) {
        setError('Error al eliminar el cliente');
      }
    }
  };

  if (loading) return <div>Cargando clientes...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="cliente-list">
      <h2>Lista de Clientes</h2>
      {clientes.length === 0 ? (
        <p>No hay clientes registrados.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map(cliente => (
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>{cliente.nombre}</td>
                <td>{cliente.email}</td>
                <td>{cliente.telefono}</td>
                <td>
                  <button onClick={() => onEdit(cliente)}>Editar</button>
                  <button onClick={() => handleDelete(cliente.id)}>Eliminar</button>
                  <button onClick={() => onViewAddresses(cliente.id)}>Ver Direcciones</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ClienteList;