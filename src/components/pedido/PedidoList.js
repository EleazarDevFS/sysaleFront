import React from 'react';
import './PedidoList.css';

function PedidoList({ pedidos, onEdit, onDelete }) {
  return (
    <div className="pedido-list">
      <h2>Lista de Pedidos</h2>
      {pedidos.length === 0 ? (
        <p className="no-data">No hay pedidos registrados</p>
      ) : (
        <div className="pedidos-container">
          {pedidos.map((pedido) => (
            <div key={`${pedido.tipo}-${pedido.id}`} className="pedido-card">
              <div className="pedido-header">
                <div className="pedido-id">
                  Pedido #{pedido.id} 
                  <span className={`tipo-badge tipo-${pedido.tipo}`}>
                    {pedido.tipo === 'physical' ? ' Tienda Física' : 
                     pedido.tipo === 'online' ? ' Online' : 
                     ' Físico-Online'}
                  </span>
                </div>
                <div className={`pedido-estado estado-${pedido.estado?.toLowerCase()}`}>
                  {pedido.estado}
                </div>
              </div>
              
              <div className="pedido-body">
                <div className="pedido-info">
                  <div className="info-item">
                    <span className="label">Cliente:</span>
                    <span className="value">{pedido.cliente?.nombre}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Email:</span>
                    <span className="value">{pedido.cliente?.email}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Teléfono:</span>
                    <span className="value">{pedido.cliente?.telefono}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Dirección:</span>
                    <span className="value">
                      {pedido.cliente?.direccion?.calle}, {pedido.cliente?.direccion?.ciudad}, {pedido.cliente?.direccion?.pais}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="label">Fecha:</span>
                    <span className="value">{pedido.fechaPedido}</span>
                  </div>
                </div>

                <div className="pedido-productos">
                  <h4>Productos:</h4>
                  {pedido.detalles?.map((detalle, index) => (
                    <div key={index} className="producto-detalle">
                      <span className="producto-nombre">{detalle.producto?.nombre}</span>
                      <span className="producto-cantidad">x{detalle.cantidad}</span>
                      <span className="producto-precio">${detalle.precioUnitario?.toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="pedido-total">
                  <strong>Total: ${pedido.total?.toFixed(2)}</strong>
                </div>
              </div>

              <div className="pedido-actions">
                <button className="btn-edit" onClick={() => onEdit(pedido)} title="Editar">
                 Editar
                </button>
                <button className="btn-delete" onClick={() => onDelete(pedido.id, pedido.tipo)} title="Eliminar">
                 Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PedidoList;
