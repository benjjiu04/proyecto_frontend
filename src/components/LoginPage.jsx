import React, { useState } from "react";
import { mod11_rut } from "../validaciones/rut/mod11_rut.js";

// Importando las funciones desde tu archivo local de datos
import { verificarSiUsuarioExiste, 
        obtenerUsuariosRegistrados,
        registrarEnLocalStorage }  from "./retrieve_data.jsx";

export { LoginPage };

function LoginPage({ onLoginSuccess }){
    
    const [nombre, set_nombre] = useState("");
    const [rut, set_rut] = useState("");
    const [errores, set_errores] = useState({ nombre: "", rut: "" });

    const formulario_es_valido = () => {
        const nuevos_errores = { nombre: "", rut: "" };
        let es_valido = true;

        if (nombre.trim() === "") {
            nuevos_errores.nombre = "El campo de nombre no puede estar vacío.";
            es_valido = false;
        }

        if (!mod11_rut(rut)) {
            nuevos_errores.rut = "El RUT ingresado no es válido.";
            es_valido = false;
        }

        set_errores(nuevos_errores);
        return es_valido;
    };

    const manejar_registro = () => {
        if (!formulario_es_valido()) return;

        const usuarioExistente = verificarSiUsuarioExiste(rut);
        if (usuarioExistente) {
            set_errores(prev => ({ ...prev, rut: "Este RUT ya se encuentra registrado." }));
            return;
        }

        const nuevoUsuario = { nombre: nombre, rut: rut };
        registrarEnLocalStorage(nuevoUsuario);
        
        alert("¡Usuario registrado con éxito!");
        set_nombre("");
        set_rut("");
    };

    const manejar_login = () => {
        if (!formulario_es_valido()) return;

        const usuarioEncontrado = verificarSiUsuarioExiste(rut);

        if (!usuarioEncontrado) {
            set_errores(prev => ({ 
                ...prev, 
                rut: "El usuario no existe. Por favor, regístrese primero." 
            }));
            return;
        }

        if (usuarioEncontrado.nombre.toLowerCase() !== nombre.toLowerCase()) {
            set_errores(prev => ({ 
                ...prev, 
                nombre: "El nombre no coincide con el RUT registrado." 
            }));
            return;
        }

        localStorage.setItem("sesion_activa", JSON.stringify(usuarioEncontrado));
        alert(`¡Bienvenido de vuelta, ${usuarioEncontrado.nombre}!`);

        // Ejecuta la función que le pasó GestionProducto para cambiar el estado y cargar la app
        if (onLoginSuccess) {
            onLoginSuccess();
        }
    };

    return (
        <div className="form_background_image">
            <form onSubmit={(evento) => evento.preventDefault()}>

                <div className="login-screen-container">
                    <div className="card">
                        
                        <label htmlFor="nombre" className="form-loggin">Ingrese su nombre</label>
                        <input 
                            type="text" 
                            className="form-control form-loggin"
                            value={nombre}
                            onChange={(e) => set_nombre(e.target.value)}
                        />
                        {errores.nombre && <p style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>{errores.nombre}</p>}

                        <label htmlFor="rut" className="form-loggin">Ingrese su RUT</label>
                        <input 
                            type="text" 
                            className="form-control form-loggin"
                            value={rut}
                            onChange={(e) => set_rut(e.target.value)}
                        />
                        {errores.rut && <p style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>{errores.rut}</p>}
                        
                        <div className="container_botones_form">
                            <button type="button" className="form-control boton_loggin" onClick={manejar_registro}>
                                Registrarme
                            </button>
                            <button type="button" className="form-control boton_loggin" onClick={manejar_login}>
                                Iniciar Sesión
                            </button>
                        </div>

                    </div>
                </div>
            </form>
        </div>
    );
}