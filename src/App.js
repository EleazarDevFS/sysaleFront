import './App.css';
import { useState, useEffect } from 'react';
import PedidoForm from './components/pedido/PedidoForm';
import PedidoList from './components/pedido/PedidoList';

function App() {
  const [pedidos, setPedidos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPedido, setEditingPedido] = useState(null);
  const [tipoPedido, setTipoPedido] = useState('fisico-online'); // 'physical', 'online', 'fisico-online'

  // Cargar pedidos al montar el componente
  useEffect(() => {
    fetchPedidos();
  }, []);

  const fetchPedidos = async () => {
    try {
      // Obtener pedidos de los tres endpoints
      const [physicalResponse, onlineResponse, fisicoOnlineResponse] = await Promise.all([
        fetch('http://localhost:8080/api/tienda/physical'),
        fetch('http://localhost:8080/api/tienda/online')//,
        // fetch('http://localhost:8080/api/tienda')
      ]);

      const allPedidos = [];

      if (physicalResponse.ok) {
        const physicalData = await physicalResponse.json();
        const physicalPedidos = physicalData.map(item => ({
          ...item.pedido,
          id: item.id,
          tipo: 'physical'
        }));
        allPedidos.push(...physicalPedidos);
      }

      if (onlineResponse.ok) {
        const onlineData = await onlineResponse.json();
        const onlinePedidos = onlineData.map(item => ({
          ...item.pedido,
          id: item.id,
          tipo: 'online'
        }));
        allPedidos.push(...onlinePedidos);
      }

      // if (fisicoOnlineResponse.ok) {
      //   const fisicoOnlineData = await fisicoOnlineResponse.json();
      //   const fisicoOnlinePedidos = fisicoOnlineData.map(item => ({
      //     ...item.pedido,
      //     id: item.id,
      //     tipo: 'fisico-online'
      //   }));
      //   allPedidos.push(...fisicoOnlinePedidos);
      // }

      console.log('Todos los pedidos:', allPedidos);
      setPedidos(allPedidos);
    } catch (error) {
      console.error('Error de conexión:', error);
    }
  };

  const handleCreate = (tipo) => {
    setTipoPedido(tipo);
    setEditingPedido(null);
    setShowForm(true);
  };

  const handleEdit = (pedido) => {
    setTipoPedido(pedido.tipo || 'fisico-online');
    setEditingPedido(pedido);
    setShowForm(true);
  };

  const handleDelete = async (id, tipo) => {
    if (window.confirm('¿Estás seguro de eliminar este pedido?')) {
      try {
        let url;
        switch(tipo) {
          case 'physical':
            url = `http://localhost:8080/api/tienda/physical/${id}`;
            break;
          case 'online':
            url = `http://localhost:8080/api/tienda/online/${id}`;
            break;
          default:
            url = `http://localhost:8080/api/tienda/${id}`;
        }

        const response = await fetch(url, {
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
      let url, method;

      if (editingPedido) {
        // Editando pedido existente
        method = 'PUT';
        switch(tipoPedido) {
          case 'physical':
            url = `http://localhost:8080/api/tienda/physical/${editingPedido.id}`;
            break;
          case 'online':
            url = `http://localhost:8080/api/tienda/online/${editingPedido.id}`;
            break;
          default:
            url = `http://localhost:8080/api/tienda/${editingPedido.id}`;
        }
      } else {
        // Creando nuevo pedido
        method = 'POST';
        switch(tipoPedido) {
          case 'physical':
            url = 'http://localhost:8080/api/tienda/physical';
            break;
          case 'online':
            url = 'http://localhost:8080/api/tienda/online';
            break;
          default:
            url = 'http://localhost:8080/api/tienda';
        }
      }

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
              <button className='btn-add' onClick={() => handleCreate('physical')}>
                ➕ Nuevo Pedido En tienda fisica
              </button>
              <button className='btn-add' onClick={() => handleCreate('online')}>
                ➕ Nuevo Pedido Online
              </button>
              {/* <button className="btn-add" onClick={() => handleCreate('fisico-online')}>
                ➕ Nuevo Pedido Fisico-Online
              </button> */}
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
