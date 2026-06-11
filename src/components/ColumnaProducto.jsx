import React from 'react';
import { BotonReact } from './BotonReact';
export { ColumnaProducto };

function ColumnaProducto({ productos, onActualizarCantidad, onBorrar, onCambiarEstado }){
  
  return (

    <>
    <div className = "tabla-productos-container">
      
      <table className = "tabla-productos">      
        <thead>  
          <tr>
            <th> ID </th>
            <th> Nombre </th>
            <th> Precio </th>
            <th> Cantidad </th>
            <th> Estado </th>
            <th> Acciones </th>
            
          </tr>
        </thead>

        <tbody>
          
          {productos.map((producto) => (
            <tr key={producto._id}>
              <td>{producto._id}</td>
              <td><strong>{producto.nombre_producto}</strong></td>
              <td>${producto.precio.toLocaleString('es-CL')}</td>
              <td>
                <div className = "cantidad-control">
                  <span>{producto.cantidad}</span>
                  
                  <BotonReact 
                    texto="+" 
                    color="#2ecc71" 
                    classname="btn-sm" 
                    onclick={() => onActualizarCantidad(producto._id, producto.cantidad + 1)}
                  />
                  
                  <BotonReact 
                    texto="-" 
                    color="#e67e22" 
                    classname="btn-sm" 
                    onclick={() => onActualizarCantidad(producto._id, Math.max(0, producto.cantidad - 1))}
                  />

                </div>
              </td>
              <td>
                <span className={`badge ${producto.estado === 'Disponible' ? 'badge-ok' : 'badge-danger'}`}>
                  {producto.estado}
                </span>
              </td>
              <td>
                <div className="acciones-cell">
                  
                  <BotonReact 
                    texto="Alternar Estado" 
                    color="#3498db" 
                    classname="btn-md" 
                    onclick={() => onCambiarEstado(producto._id, producto.estado === 'Disponible' ? 'Agotado' : 'Disponible')}
                  />

                  <BotonReact 
                    texto="Eliminar" 
                    color="#e74c3c" 
                    classname="btn-md" 
                    onclick={() => onBorrar(producto._id)}
                  />

                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    </>
  );
};