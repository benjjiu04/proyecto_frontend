// BaseDatosMongo.js
export class BaseDatosMongo {
  constructor(conection_string) {
    this.conection_string = conection_string;
    this.dbName = "productos_db";
  }

  async iniciar_bd() {
    // Simula una conexión asíncrona a MongoDB
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!localStorage.getItem(this.dbName)) {
          const productosIniciales = [
            { _id: 1, nombre_producto: "Laptop Gamer", precio: 1200000, cantidad: 15, estado: "Disponible" },
            { _id: 2, nombre_producto: "Teclado Mecánico", precio: 85000, cantidad: 0, estado: "Agotado" },
            { _id: 3, nombre_producto: "Monitor 4K", precio: 350000, cantidad: 8, estado: "Disponible" }
          ];
          localStorage.setItem(this.dbName, JSON.stringify(productosIniciales));
        }
        console.log(`Conectado exitosamente a: ${this.conection_string}`);
        resolve(true);
      }, 800);
    });
  }

  create(producto) {
    const db = JSON.parse(localStorage.getItem(this.dbName)) || [];
    db.push(producto);
    localStorage.setItem(this.dbName, JSON.stringify(db));
  }

  read() {
    // Retorna un string JSON tal como lo pide tu diagrama (-> string)
    return localStorage.getItem(this.dbName) || "[]";
  }

  update(id, productoActualizado) {
    let db = JSON.parse(localStorage.getItem(this.dbName)) || [];
    db = db.map(p => p._id === id ? { ...p, ...productoActualizado } : p);
    localStorage.setItem(this.dbName, JSON.stringify(db));
  }

  delete(id) {
    let db = JSON.parse(localStorage.getItem(this.dbName)) || [];
    db = db.filter(p => p._id !== id);
    localStorage.setItem(this.dbName, JSON.stringify(db));
  }
}