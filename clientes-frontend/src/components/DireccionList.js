import React, { useState, useEffect } from 'react';
import { direccionService } from '../services/api';

const DireccionList = ({ clienteId, onEdit, onDelete }) => {
  const [direcciones, setDirecciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDirecciones();
  }, [clienteId]);

  const fetchDirecciones = async () => {
    try {
      setLoading(true);
      const response = await direccionService.getAll();
      const filteredDirecciones = clienteId 
        ? response.data.filter(dir => dir.clienteId === clienteId)
        : response.data;
      setDirecciones(filteredDirecciones);
      setError(null);
    } catch (err) {
      setError('Error al cargar las direcciones');
      console.error('Error fetching direcciones:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta dirección?')) {
      try {
        await onDelete(id);
        await fetchDirecciones();
      } catch (err) {
        setError('Error al eliminar la dirección');
      }
    }
  };

  if (loading) return <div>Cargando direcciones...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="direccion-list">
      <h3>{clienteId ? 'Direcciones del Cliente' : 'Todas las Direcciones'}</h3>
      {direcciones.length === 0 ? (
        <p>No hay direcciones registradas.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Calle</th>
              <th>Ciudad</th>
              <th>País</th>
              {!clienteId && <th>Cliente ID</th>}
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {direcciones.map(direccion => (
              <tr key={direccion.id}>
                <td>{direccion.id}</td>
                <td>{direccion.calle}</td>
                <td>{direccion.ciudad}</td>
                <td>{direccion.pais}</td>
                {!clienteId && <td>{direccion.clienteId}</td>}
                <td>
                  <button onClick={() => onEdit(direccion)}>Editar</button>
                  <button onClick={() => handleDelete(direccion.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DireccionList;