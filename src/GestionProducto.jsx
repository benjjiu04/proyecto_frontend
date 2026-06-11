// GestionProducto.jsx
import React, { useState, useEffect } from 'react';
import { BaseDatosMongo } from '../src/components/mongoDB/BaseDatosMongo.jsx';
import { Filtro } from '../src/components/Filtro.jsx';
import { ColumnaProducto } from '../src/components/ColumnaProducto.jsx';
import { BotonReact } from '../src/components/BotonReact.jsx';
import { LoginPage } from '../src/components/LoginPage.jsx'; 

// 🚀 CORREGIDO: Sin espacios en el nombre de la variable importada
import diagramaClasesFrontEnd from './assets/diagrama de clases front end.drawio.png';

export { GestionProducto };

/* Creación de una instancia de la clase BaseDatosMongo. 
Simula una conexion hacia una base de datos.*/
const mongoDB = new BaseDatosMongo("mongodb://localhost:27017/empresa_ficticia");

function GestionProducto(){
  
  // Estado para controlar si el usuario pasó por el Login
  const [sesionActiva, setSesionActiva] = useState(false);

  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Estados de los filtros individuales
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroCantidad, setFiltroCantidad] = useState("");
  const [filtroDisponibilidad, setFiltroDisponibilidad] = useState("Todos");

  // Formulario para añadir nuevos productos (Método Create)
  const [nuevoProd, setNuevoProd] = useState({ nombre_producto: "", precio: "", cantidad: "", estado: "Disponible" });

  // Verificar si ya había una sesión guardada al abrir la página
  useEffect(() => {
    const usuario = localStorage.getItem("sesion_activa");
    if (usuario) {
      setSesionActiva(true);
    }
  }, []);

  // Iniciar BD solo CUANDO la sesión esté activa
  useEffect(() => {
    if (!sesionActiva) return; 
    
    const conectar = async () => {
      await mongoDB.iniciar_bd();
      refrescarLista();
    };
    conectar();
  }, [sesionActiva]); 

  // Aplicar filtros combinados cada vez que cambia la lista o los inputs
  useEffect(() => {
    let resultado = [...productos];

    if (filtroNombre) {
      resultado = resultado.filter(p => p.nombre_producto.toLowerCase().includes(filtroNombre.toLowerCase()));
    }
    if (filtroCantidad) {
      resultado = resultado.filter(p => p.cantidad >= parseInt(filtroCantidad, 10));
    }
    if (filtroDisponibilidad !== "Todos") {
      resultado = resultado.filter(p => p.estado === filtroDisponibilidad);
    }

    setProductosFiltrados(resultado);
  }, [productos, filtroNombre, filtroCantidad, filtroDisponibilidad]);

  const refrescarLista = () => {
    const dataString = mongoDB.read();
    const data = JSON.parse(dataString);
    setProductos(data);
    setCargando(false);
  };

  // Métodos del modelo Producto reflejados en el Handler de la página
  const handleActualizarCantidad = (id, nuevaCantidad) => {
    const prod = productos.find(p => p._id === id);
    const nuevoEstado = nuevaCantidad > 0 ? prod.estado : "Agotado";
    mongoDB.update(id, { cantidad: nuevaCantidad, estado: nuevoEstado });
    refrescarLista();
  };

  const handleCambiarEstado = (id, nuevoEstado) => {
    mongoDB.update(id, { estado: nuevoEstado });
    refrescarLista();
  };

  const handleBorrarProducto = (id) => {
    mongoDB.delete(id);
    refrescarLista();
  };

  const handleCrearProducto = (e) => {
    e.preventDefault();
    if (!nuevoProd.nombre_producto || !nuevoProd.precio) return;

    const productoFinal = {
      _id: Date.now(), 
      nombre_producto: nuevoProd.nombre_producto,
      precio: Number(nuevoProd.precio),
      text: Number(nuevoProd.cantidad || 0),
      estado: Number(nuevoProd.cantidad) > 0 ? nuevoProd.estado : "Agotado"
    };

    mongoDB.create(productoFinal);
    setNuevoProd({ nombre_producto: "", precio: "", cantidad: "", estado: "Disponible" });
    refrescarLista();
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("sesion_activa");
    setSesionActiva(false);
  };

  // 1. SI NO HAY SESIÓN: Bloqueamos la pantalla con el Login
  if (!sesionActiva) {
    return <LoginPage onLoginSuccess={() => setSesionActiva(true)} />;
  }

  // 2. SI HAY SESIÓN PERO LA BD ESTÁ CARGANDO: Muestra el loading
  if (cargando) {
    return <div className="loading">Conectandose a la Base de Datos...</div>;
  }

  // 3. SI PASÓ AMBAS: Renderiza el panel completo de productos
  return (
    <div className="gestion-container">
      {/* Header */}
      <header className="gestion-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Sistema de Gestión de Productos</h1>
          <p>Endpoint: <code>{mongoDB.conection_string}</code></p>
        </div>
        <BotonReact 
          texto="Cerrar Sesión" 
          color="#e74c3c" 
          classname="btn-logout" 
          onclick={handleLogout} 
        />
      </header>

      <div className="gestion-content">
        {/* Formulario de Inserción Lateral */}
        <aside className="panel-lateral">
          <form onSubmit={handleCrearProducto} className="form-producto">
            <h3>Añadir Producto</h3>
            <div className="form-group">
              <label>Nombre:</label>
              <input 
                type="text" 
                value={nuevoProd.nombre_producto} 
                onChange={e => setNuevoProd({...nuevoProd, nombre_producto: e.target.value})} 
                required
              />
            </div>
            <div className="form-group">
              <label>Precio:</label>
              <input 
                type="number" 
                value={nuevoProd.precio} 
                onChange={e => setNuevoProd({...nuevoProd, precio: e.target.value})} 
                required
              />
            </div>
            <div className="form-group">
              <label>Cantidad:</label>
              <input 
                type="number" 
                value={nuevoProd.cantidad} 
                onChange={e => setNuevoProd({...nuevoProd, cantidad: e.target.value})} 
              />
            </div>
            <BotonReact 
              texto="Guardar en Base de Datos" 
              color="#2c3e50" 
              classname="btn-block" 
              onclick={() => {}} 
            />
          </form>

          {/* Componente Filtro mapeado */}
          <Filtro 
            onFiltrarNombre={setFiltroNombre}
            onFiltrarCantidad={setFiltroCantidad}
            onFiltrarDisponibilidad={setFiltroDisponibilidad}
            enFiltroActivo={filtroNombre || filtroCantidad || filtroDisponibilidad !== "Todos"}
          />
        </aside>

        {/* Componente ColumnaProducto */}
        <main className="panel-principal">
          <ColumnaProducto 
            productos={productosFiltrados}
            onActualizarCantidad={handleActualizarCantidad}
            onCambiarEstado={handleCambiarEstado}
            onBorrar={handleBorrarProducto}
          />
        </main>
      </div>

      {/* SECCIÓN DIAGRAMAS (CORREGIDA) */}
      <section className="seccion-diagramas" style={{ marginTop: '30px', backgroundColor: 'var(--bg-card)', padding: '20px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
        <h2 style={{ marginTop: 0, marginBottom: '15px', fontFamily: 'Segoe UI, sans-serif' }}>Diagramas</h2>

        <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: 'var(--bg-secondary)', padding: '20px', borderRadius: '6px', boxShadow: 'inset 0 0 10px rgba(0,0,0,0.3)' }}>
          <img 
            src={diagramaClasesFrontEnd} 
            alt="Diagrama de clases Front End" 
            style={{ maxWidth: '100%', height: 'auto', display: 'block' }} 
          />
        </div>
      </section>

    </div>
  );
}