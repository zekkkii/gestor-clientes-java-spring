import React, { useState } from 'react';
import './App.css';
import ClienteList from './components/ClienteList';
import ClienteForm from './components/ClienteForm';
import DireccionList from './components/DireccionList';
import DireccionForm from './components/DireccionForm';
import { clienteService, direccionService } from './services/api';

function App() {
  const [currentView, setCurrentView] = useState('clientes');
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [selectedDireccion, setSelectedDireccion] = useState(null);
  const [selectedClienteId, setSelectedClienteId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState('');

  const showMessage = (msg, type = 'success') => {
    setMessage({ text: msg, type });
    setTimeout(() => setMessage(''), 3000);
  };

  const handleCreateCliente = () => {
    setSelectedCliente(null);
    setShowForm(true);
    setCurrentView('cliente-form');
  };

  const handleEditCliente = (cliente) => {
    setSelectedCliente(cliente);
    setShowForm(true);
    setCurrentView('cliente-form');
  };

  const handleSaveCliente = async (clienteData) => {
    try {
      if (selectedCliente) {
        await clienteService.update(selectedCliente.id, clienteData);
        showMessage('Cliente actualizado exitosamente');
      } else {
        await clienteService.create(clienteData);
        showMessage('Cliente creado exitosamente');
      }
      setCurrentView('clientes');
      setShowForm(false);
      setSelectedCliente(null);
    } catch (error) {
      showMessage('Error al guardar el cliente', 'error');
      console.error('Error saving cliente:', error);
    }
  };

  const handleDeleteCliente = async (id) => {
    try {
      await clienteService.delete(id);
      showMessage('Cliente eliminado exitosamente');
    } catch (error) {
      showMessage('Error al eliminar el cliente', 'error');
      console.error('Error deleting cliente:', error);
    }
  };

  const handleViewAddresses = (clienteId) => {
    setSelectedClienteId(clienteId);
    setCurrentView('direcciones-cliente');
  };

  const handleCreateDireccion = () => {
    setSelectedDireccion(null);
    setShowForm(true);
    setCurrentView('direccion-form');
  };

  const handleEditDireccion = (direccion) => {
    setSelectedDireccion(direccion);
    setShowForm(true);
    setCurrentView('direccion-form');
  };

  const handleSaveDireccion = async (direccionData) => {
    try {
      if (selectedDireccion) {
        await direccionService.update(selectedDireccion.id, direccionData);
        showMessage('Dirección actualizada exitosamente');
      } else {
        await direccionService.create(direccionData);
        showMessage('Dirección creada exitosamente');
      }
      
      if (selectedClienteId) {
        setCurrentView('direcciones-cliente');
      } else {
        setCurrentView('direcciones');
      }
      setShowForm(false);
      setSelectedDireccion(null);
    } catch (error) {
      showMessage('Error al guardar la dirección', 'error');
      console.error('Error saving direccion:', error);
    }
  };

  const handleDeleteDireccion = async (id) => {
    try {
      await direccionService.delete(id);
      showMessage('Dirección eliminada exitosamente');
    } catch (error) {
      showMessage('Error al eliminar la dirección', 'error');
      console.error('Error deleting direccion:', error);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedCliente(null);
    setSelectedDireccion(null);
    
    if (selectedClienteId && (currentView === 'direccion-form' || currentView === 'direcciones-cliente')) {
      setCurrentView('direcciones-cliente');
    } else if (currentView === 'direccion-form') {
      setCurrentView('direcciones');
    } else {
      setCurrentView('clientes');
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'clientes':
        return (
          <ClienteList
            onEdit={handleEditCliente}
            onDelete={handleDeleteCliente}
            onViewAddresses={handleViewAddresses}
          />
        );
      
      case 'cliente-form':
        return (
          <ClienteForm
            cliente={selectedCliente}
            onSave={handleSaveCliente}
            onCancel={handleCancel}
          />
        );
      
      case 'direcciones':
        return (
          <DireccionList
            onEdit={handleEditDireccion}
            onDelete={handleDeleteDireccion}
          />
        );
      
      case 'direcciones-cliente':
        return (
          <DireccionList
            clienteId={selectedClienteId}
            onEdit={handleEditDireccion}
            onDelete={handleDeleteDireccion}
          />
        );
      
      case 'direccion-form':
        return (
          <DireccionForm
            direccion={selectedDireccion}
            preselectedClienteId={selectedClienteId}
            onSave={handleSaveDireccion}
            onCancel={handleCancel}
          />
        );
      
      default:
        return <ClienteList />;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Sistema de Gestión de Clientes</h1>
        <nav>
          <button 
            onClick={() => setCurrentView('clientes')}
            className={currentView === 'clientes' ? 'active' : ''}
          >
            Clientes
          </button>
          <button 
            onClick={() => setCurrentView('direcciones')}
            className={currentView === 'direcciones' ? 'active' : ''}
          >
            Direcciones
          </button>
        </nav>
      </header>

      {message && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      <main className="App-main">
        <div className="action-bar">
          {currentView === 'clientes' && (
            <button onClick={handleCreateCliente} className="primary">
              Nuevo Cliente
            </button>
          )}
          {(currentView === 'direcciones' || currentView === 'direcciones-cliente') && (
            <>
              <button onClick={handleCreateDireccion} className="primary">
                Nueva Dirección
              </button>
              {currentView === 'direcciones-cliente' && (
                <button onClick={() => setCurrentView('clientes')} className="secondary">
                  Volver a Clientes
                </button>
              )}
            </>
          )}
        </div>

        {renderContent()}
      </main>
    </div>
  );
}

export default App;
