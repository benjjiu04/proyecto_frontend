export {obtenerUsuariosRegistrados, 
       registrarEnLocalStorage,
       verificarSiUsuarioExiste}

function obtenerUsuariosRegistrados(){

    const usuarios = localStorage.getItem("usuarios_db");
    return usuarios ? JSON.parse(usuarios) : [];
};

function registrarEnLocalStorage(nuevoUsuario){

    const usuarios = obtenerUsuariosRegistrados();
    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios_db", JSON.stringify(usuarios));
};

function verificarSiUsuarioExiste(rut){

    const usuarios = obtenerUsuariosRegistrados();
    return usuarios.find(usuario => usuario.rut === rut);
};