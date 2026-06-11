import React from 'react';
export { Filtro };

function Filtro({ onFiltrarNombre, onFiltrarCantidad, onFiltrarDisponibilidad, enFiltroActivo })
{
  return (

    <>

    <div className="filtro-container">
      <h3>Filtros</h3>

      <div className="filtro-group">  
        <input 
          type="text" 
          placeholder="Filtrar por nombre..." 
          onChange={(e) => onFiltrarNombre(e.target.value)}
          className="filtro-input"
        />
        
        <input 
          type="number" 
          placeholder="Cantidad mínima..." 
          onChange={(e) => onFiltrarCantidad(e.target.value)}
          className="filtro-input"
        />

        <select 
          onChange={(e) => onFiltrarDisponibilidad(e.target.value)}
          className="filtro-select"
        >
          <option value="Todos"> Todos los estados </option>
          <option value="Disponible"> Disponible </option>
          <option value="Agotado"> Agotado </option>
        </select>
      </div>
      {enFiltroActivo && <p className="filtro-aviso">Filtrando resultados...</p>}
    </div>

    </>
  );
};