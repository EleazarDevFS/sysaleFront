import React from 'react';
import './TiendaList.css';

function TiendaList({ tiendas, onEdit, onDelete }) {
  return (
    <div className="tienda-list">
      <h2>Lista de Tiendas</h2>
      {tiendas.length === 0 ? (
        <p className="no-data">No hay tiendas registradas</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tiendas.map((tienda) => (
              <tr key={tienda.id}>
                <td>{tienda.id}</td>
                <td>{tienda.nombre}</td>
                <td>{tienda.direccion}</td>
                <td>{tienda.telefono}</td>
                <td>{tienda.email}</td>
                <td className="actions">
                  <button
                    className="btn-edit"
                    onClick={() => onEdit(tienda)}
                    title="Editar"
                  >
    
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => onDelete(tienda.id)}
                    title="Eliminar"
                  >
                    
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TiendaList;
