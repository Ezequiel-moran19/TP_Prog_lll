export class Carrito {
  constructor(nombreUsuario, clave, items = []) {
    this.nombreUsuario = nombreUsuario;
    this.clave = clave;
    this.items = items;
  }

  static crearDesdeLocalStorage(nombreUsuario) {
    const clave = `Carrito_${nombreUsuario}`;
    const items = JSON.parse(sessionStorage.getItem(clave)) || [];
    return new Carrito(nombreUsuario, clave, items);
  }

  guardar() {
    sessionStorage.setItem(this.clave, JSON.stringify(this.items));
  }

  agregar(producto) {
      const existente = this.items.find(p => p.id === producto.id);

      if (existente) {
          existente.cantidad += producto.cantidad || 1;
          existente.subtotal = existente.cantidad * existente.precio;
      } else {
          this.items.push({
              ...producto,
              cantidad: producto.cantidad || 1,
              subtotal: (producto.cantidad || 1) * producto.precio
          });
      }

      this.guardar();
      return true;
  }

  eliminar(index) {
    this.items.splice(index, 1);
    this.guardar();
  }

  vaciar() {
    this.items = [];
    this.guardar();
  }

  calcularTotal() {
      return this.items.reduce((acc, item) => acc + Number(item.subtotal), 0);
  }
  
  totalUnidades() {
    return this.items.reduce((acc, item) => acc + item.cantidad, 0);
  }
}
