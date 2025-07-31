// Helper functions for API data transformation if needed
export const transformClienteForAPI = (cliente) => {
  // Transform cliente data for API request (RequestDTO format)
  return {
    nombre: cliente.nombre,
    email: cliente.email,
    telefono: cliente.telefono
  };
};

export const transformDireccionForAPI = (direccion) => {
  // Transform direccion data for API request (RequestDTO format)
  return {
    calle: direccion.calle,
    ciudad: direccion.ciudad,
    pais: direccion.pais,
    clienteId: parseInt(direccion.clienteId)
  };
};

export const handleApiError = (error) => {
  console.error('API Error:', error);
  
  if (error.response) {
    // Server responded with error status
    const status = error.response.status;
    const data = error.response.data;
    
    switch (status) {
      case 404:
        return 'Recurso no encontrado';
      case 400:
        return data.message || 'Datos inválidos';
      case 500:
        return 'Error interno del servidor';
      default:
        return `Error ${status}: ${data.message || 'Error desconocido'}`;
    }
  } else if (error.request) {
    // Request made but no response received
    return 'No se pudo conectar con el servidor';
  } else {
    // Error in request setup
    return 'Error en la configuración de la petición';
  }
};