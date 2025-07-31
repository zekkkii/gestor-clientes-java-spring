import React, { useState, useEffect } from 'react';
import { clienteService } from '../services/api';

const DireccionForm = ({ direccion, onSave, onCancel, preselectedClienteId }) => {
  const [formData, setFormData] = useState({
    calle: '',
    ciudad: '',
    pais: '',
    clienteId: preselectedClienteId || ''
  });
  const [clientes, setClientes] = useState([]);
  const [errors, setErrors] = useState({});
  const [loadingClientes, setLoadingClientes] = useState(true);

  useEffect(() => {
    fetchClientes();
  }, []);

  useEffect(() => {
    if (direccion) {
      setFormData({
        calle: direccion.calle || '',
        ciudad: direccion.ciudad || '',
        pais: direccion.pais || '',
        clienteId: direccion.clienteId || preselectedClienteId || ''
      });
    } else {
      setFormData({
        calle: '',
        ciudad: '',
        pais: '',
        clienteId: preselectedClienteId || ''
      });
    }
  }, [direccion, preselectedClienteId]);

  const fetchClientes = async () => {
    try {
      const response = await clienteService.getAll();
      setClientes(response.data);
    } catch (err) {
      console.error('Error fetching clientes:', err);
    } finally {
      setLoadingClientes(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.calle.trim()) {
      newErrors.calle = 'La calle es requerida';
    }
    
    if (!formData.ciudad.trim()) {
      newErrors.ciudad = 'La ciudad es requerida';
    }
    
    if (!formData.pais.trim()) {
      newErrors.pais = 'El país es requerido';
    }
    
    if (!formData.clienteId) {
      newErrors.clienteId = 'Debe seleccionar un cliente';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave({
        ...formData,
        clienteId: parseInt(formData.clienteId)
      });
    }
  };

  return (
    <div className="direccion-form">
      <h2>{direccion ? 'Editar Dirección' : 'Nueva Dirección'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="calle">Calle:</label>
          <input
            type="text"
            id="calle"
            name="calle"
            value={formData.calle}
            onChange={handleChange}
            className={errors.calle ? 'error' : ''}
          />
          {errors.calle && <span className="error-message">{errors.calle}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="ciudad">Ciudad:</label>
          <input
            type="text"
            id="ciudad"
            name="ciudad"
            value={formData.ciudad}
            onChange={handleChange}
            className={errors.ciudad ? 'error' : ''}
          />
          {errors.ciudad && <span className="error-message">{errors.ciudad}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="pais">País:</label>
          <input
            type="text"
            id="pais"
            name="pais"
            value={formData.pais}
            onChange={handleChange}
            className={errors.pais ? 'error' : ''}
          />
          {errors.pais && <span className="error-message">{errors.pais}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="clienteId">Cliente:</label>
          <select
            id="clienteId"
            name="clienteId"
            value={formData.clienteId}
            onChange={handleChange}
            className={errors.clienteId ? 'error' : ''}
            disabled={preselectedClienteId && !direccion}
          >
            <option value="">Seleccionar cliente...</option>
            {clientes.map(cliente => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nombre} - {cliente.email}
              </option>
            ))}
          </select>
          {errors.clienteId && <span className="error-message">{errors.clienteId}</span>}
          {loadingClientes && <span>Cargando clientes...</span>}
        </div>

        <div className="form-actions">
          <button type="submit">
            {direccion ? 'Actualizar' : 'Crear'}
          </button>
          <button type="button" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default DireccionForm;