import React, { useState, useEffect } from 'react';
import './PedidoForm.css';

function PedidoForm({ pedido, onSubmit, onCancel, tipo }) {
  const [formData, setFormData] = useState({
    cliente: {
      nombre: '',
      email: '',
      telefono: '',
      direccion: {
        calle: '',
        ciudad: '',
        codigoPostal: '',
        pais: ''
      }
    },
    fechaPedido: new Date().toISOString().split('T')[0],
    estado: 'PENDIENTE',
    detalles: [],
    total: 0
  });

  const [productoActual, setProductoActual] = useState({
    producto: {
      nombre: '',
      descripcion: '',
      precio: 0,
      stock: 1,
      activo: true,
      categoria: {
        nombre: '',
        descripcion: '',
        departamento: ''
      }
    },
    cantidad: 1,
    precioUnitario: 0
  });

  useEffect(() => {
    if (pedido) {
      setFormData(pedido);
    }
  }, [pedido]);

  const handleTopLevelChange = (e) => {
    const { name, value, type: inputType, checked } = e.target;
    let v = value;
    if (inputType === 'checkbox') v = checked;
    if (name === 'numeroEmpleados') v = parseInt(v) || 0;
    setFormData({
      ...formData,
      [name]: v
    });
  };

  const handleClienteChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      cliente: {
        ...formData.cliente,
        [name]: value
      }
    });
  };

  const handleDireccionChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      cliente: {
        ...formData.cliente,
        direccion: {
          ...formData.cliente.direccion,
          [name]: value
        }
      }
    });
  };

  const handleProductoChange = (e) => {
    const { name, value } = e.target;
    setProductoActual({
      ...productoActual,
      producto: {
        ...productoActual.producto,
        [name]: name === 'precio' || name === 'stock' ? parseFloat(value) || 0 : value
      }
    });
  };

  const handleCategoriaChange = (e) => {
    const { name, value } = e.target;
    setProductoActual({
      ...productoActual,
      producto: {
        ...productoActual.producto,
        categoria: {
          ...productoActual.producto.categoria,
          [name]: value
        }
      }
    });
  };

  const handleCantidadChange = (e) => {
    const cantidad = parseInt(e.target.value) || 1;
    setProductoActual({
      ...productoActual,
      cantidad,
      precioUnitario: productoActual.producto.precio
    });
  };

  const agregarProducto = () => {
    if (!productoActual.producto.nombre || productoActual.cantidad <= 0) {
      alert('Complete los datos del producto');
      return;
    }

    const nuevoDetalle = {
      ...productoActual,
      precioUnitario: productoActual.producto.precio
    };

    const nuevosDetalles = [...formData.detalles, nuevoDetalle];
    const nuevoTotal = nuevosDetalles.reduce((sum, det) => sum + (det.cantidad * det.precioUnitario), 0);

    setFormData({
      ...formData,
      detalles: nuevosDetalles,
      total: nuevoTotal
    });

    // Resetear producto actual
    setProductoActual({
      producto: {
        nombre: '',
        descripcion: '',
        precio: 0,
        stock: 1,
        activo: true,
        categoria: {
          nombre: '',
          descripcion: '',
          departamento: ''
        }
      },
      cantidad: 1,
      precioUnitario: 0
    });
  };

  const eliminarProducto = (index) => {
    const nuevosDetalles = formData.detalles.filter((_, i) => i !== index);
    const nuevoTotal = nuevosDetalles.reduce((sum, det) => sum + (det.cantidad * det.precioUnitario), 0);
    
    setFormData({
      ...formData,
      detalles: nuevosDetalles,
      total: nuevoTotal
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.detalles.length === 0) {
      alert('Debe agregar al menos un producto');
      return;
    }
    onSubmit(formData);
  };

  return (
    <form className="pedido-form" onSubmit={handleSubmit}>
      <div className="form-section">
        <h3> Datos del Cliente</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Nombre:</label>
            <input type="text" name="nombre" value={formData.cliente.nombre} onChange={handleClienteChange} required />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" name="email" value={formData.cliente.email} onChange={handleClienteChange} required />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Teléfono:</label>
            <input type="tel" name="telefono" value={formData.cliente.telefono} onChange={handleClienteChange} required />
          </div>
          <div className="form-group">
            <label>Fecha:</label>
            <input type="date" value={formData.fechaPedido} onChange={(e) => setFormData({...formData, fechaPedido: e.target.value})} required />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3> Dirección de Entrega</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Calle:</label>
            <input type="text" name="calle" value={formData.cliente.direccion.calle} onChange={handleDireccionChange} required />
          </div>
          <div className="form-group">
            <label>Ciudad:</label>
            <input type="text" name="ciudad" value={formData.cliente.direccion.ciudad} onChange={handleDireccionChange} required />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Código Postal:</label>
            <input type="text" name="codigoPostal" value={formData.cliente.direccion.codigoPostal} onChange={handleDireccionChange} required />
          </div>
          <div className="form-group">
            <label>País:</label>
            <input type="text" name="pais" value={formData.cliente.direccion.pais} onChange={handleDireccionChange} required />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3> Estado del Pedido</h3>
        <div className="form-group">
          <label>Estado:</label>
          <select value={formData.estado} onChange={(e) => setFormData({...formData, estado: e.target.value})}>
            <option value="PENDIENTE">Pendiente</option>
            <option value="EN_PROCESO">En Proceso</option>
            <option value="ENVIADO">Enviado</option>
            <option value="ENTREGADO">Entregado</option>
            <option value="CANCELADO">Cancelado</option>
          </select>
        </div>
      </div>

      {/* Tienda-specific fields */}
      {tipo === 'physical' && (
        <div className="form-section">
          <h3> Datos de la Tienda (Físico)</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Horario de Atención:</label>
              <input type="text" name="horarioAtencion" value={formData.horarioAtencion ?? ''} onChange={handleTopLevelChange} />
            </div>
            <div className="form-group">
              <label>Número de Empleados:</label>
              <input type="number" name="numeroEmpleados" value={formData.numeroEmpleados ?? ''} onChange={handleTopLevelChange} />
            </div>
          </div>
        </div>
      )}

      {tipo === 'online' && (
        <div className="form-section">
          <h3> Datos Online</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Envío Gratis:</label>
              <input type="checkbox" name="envioGratis" checked={!!formData.envioGratis} onChange={handleTopLevelChange} />
            </div>
            <div className="form-group">
              <label>URL Web:</label>
              <input type="text" name="urlWeb" value={formData.urlWeb ?? ''} onChange={handleTopLevelChange} />
            </div>
          </div>
        </div>
      )}

      <div className="form-section">
        <h3> Agregar Productos</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Nombre Producto:</label>
            <input type="text" name="nombre" value={productoActual.producto.nombre} onChange={handleProductoChange} />
          </div>
          <div className="form-group">
            <label>Descripción:</label>
            <input type="text" name="descripcion" value={productoActual.producto.descripcion} onChange={handleProductoChange} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Precio:</label>
            <input type="number" step="0.01" name="precio" value={productoActual.producto.precio} onChange={handleProductoChange} />
          </div>
          <div className="form-group">
            <label>Stock:</label>
            <input type="number" name="stock" value={productoActual.producto.stock} onChange={handleProductoChange} />
          </div>
          <div className="form-group">
            <label>Cantidad:</label>
            <input type="number" min="1" value={productoActual.cantidad} onChange={handleCantidadChange} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Categoría:</label>
            <input type="text" name="nombre" value={productoActual.producto.categoria.nombre} onChange={handleCategoriaChange} />
          </div>
          <div className="form-group">
            <label>Departamento:</label>
            <input type="text" name="departamento" value={productoActual.producto.categoria.departamento} onChange={handleCategoriaChange} />
          </div>
        </div>
        <button type="button" className="btn btn-add-product" onClick={agregarProducto}>
           Agregar Producto
        </button>
      </div>

      {formData.detalles.length > 0 && (
        <div className="form-section">
          <h3>🛒 Productos en el Pedido</h3>
          <div className="productos-lista">
            {formData.detalles.map((detalle, index) => (
              <div key={index} className="producto-item">
                <div className="producto-info">
                  <strong>{detalle.producto.nombre}</strong>
                  <span>Cantidad: {detalle.cantidad}</span>
                  <span>Precio Unit: ${detalle.precioUnitario.toFixed(2)}</span>
                  <span>Subtotal: ${(detalle.cantidad * detalle.precioUnitario).toFixed(2)}</span>
                </div>
                <button type="button" className="btn-delete-small" onClick={() => eliminarProducto(index)}>🗑️</button>
              </div>
            ))}
          </div>
          <div className="total-section">
            <h3>Total: ${formData.total.toFixed(2)}</h3>
          </div>
        </div>
      )}

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {pedido ? 'Actualizar Pedido' : 'Crear Pedido'}
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default PedidoForm;
