import './App.css';
import { useState, useEffect } from 'react';
import PedidoForm from './components/pedido/PedidoForm';
import PedidoList from './components/pedido/PedidoList';

function App() {
  const [pedidos, setPedidos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPedido, setEditingPedido] = useState(null);

  // Cargar pedidos al montar el componente
  useEffect(() => {
    fetchPedidos();
  }, []);

  const fetchPedidos = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/tienda');
      if (response.ok) {
        const data = await response.json();
        console.log('Pedidos recibidos del backend:', data);
        // Extraemos los pedidos y les agregamos el id
        const pedidosData = data.map(item => ({
          ...item.pedido,
          id: item.id
        }));
        
        setPedidos(pedidosData);
      } else {
        console.error('Error al cargar los pedidos:', response.status);
      }
    } catch (error) {
      console.error('Error de conexión:', error);
    }
  };

  const handleCreate = () => {
    setEditingPedido(null);
    setShowForm(true);
  };

  const handleEdit = (pedido) => {
    setEditingPedido(pedido);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este pedido?')) {
      try {
        const response = await fetch(`http://localhost:8080/api/tienda/${id}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          // Recargar la lista de pedidos después de eliminar
          fetchPedidos();
        } else {
          alert('Error al eliminar el pedido');
        }
      } catch (error) {
        console.error('Error al eliminar:', error);
        alert('Error al eliminar el pedido');
      }
    }
  };

  const handleSubmit = async (formData) => {
    try {
      const url = editingPedido 
        ? `http://localhost:8080/api/tienda/${editingPedido.id}`
        : 'http://localhost:8080/api/tienda';
      
      const method = editingPedido ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'accept': '*/*'
        },
        body: JSON.stringify({ pedido: formData })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Pedido guardado:', data);
        setShowForm(false);
        setEditingPedido(null);
        // Recargar la lista de pedidos después de guardar
        fetchPedidos();
      } else {
        const errorText = await response.text();
        console.error('Error del servidor:', errorText);
        alert('Error al guardar el pedido');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error de conexión con el servidor');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingPedido(null);
  };

  return (
    <div className="App">
      <section className="crud-container"> 
        <header>
          SySale-Ramos - Gestión de Pedidos
        </header>
        <main>
          {!showForm && (
            <div className="action-bar">
              <button className="btn-add" onClick={handleCreate}>
                ➕ Nuevo Pedido
              </button>
            </div>
          )}
          
          {showForm ? (
            <PedidoForm 
              pedido={editingPedido}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          ) : (
            <PedidoList 
              pedidos={pedidos}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </main>
        <footer>
          © 2025 SySale-Ramos | Total de pedidos: {pedidos.length}
        </footer>
      </section>
    </div>
  );
}

export default App;
