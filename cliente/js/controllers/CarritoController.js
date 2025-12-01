import { Carrito } from "../models/Carrito.js";
import { CarritoView } from "../views/carritoView.js";
import { Persona } from "../models/Personas.js";

export class CarritoController {

  static initCarrito() {
    const nombre = Persona.obtenerNombre();

    if (!nombre) {
      window.location.href = "bienvenida.html";
      return;
    }

    const carrito = Carrito.crearDesdeLocalStorage(nombre);

    const vista = new CarritoView(carrito, () => {
      vista.mostrarCarrito();
    });

    vista.mostrarCarrito();
  }

  static conseguirCarrito() {
    const nombre = Persona.obtenerNombre();
    return Carrito.crearDesdeLocalStorage(nombre);
  }
}
