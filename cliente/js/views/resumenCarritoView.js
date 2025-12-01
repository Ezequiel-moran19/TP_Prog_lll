import { Persona } from "../models/Personas.js";
import { guardarTicket } from "../api/ventasApi.js";

export class ResumenCarritoView {
  constructor(contenedor, carrito) {
    this.contenedor = contenedor;
    this.carrito = carrito;
    this.elemento = contenedor;
  }

  render() {
    this.asignarEventos();
    this.actualizar();
  }

  asignarEventos() {
    const btnFinalizar = this.elemento.querySelector("#finalizarCompra");
    if (!btnFinalizar) return;

    btnFinalizar.addEventListener("click", () => this.finalizarCompra());
  }

  async finalizarCompra() {
    if (this.carrito.items.length === 0) return;

    const cliente = Persona.obtenerNombre();
    const ticket = {
      nombreCliente: cliente,
      fecha: new Date().toISOString(),
      productos: this.carrito.items,
      total: this.carrito.calcularTotal()
    };

    try {
      const ticketGuardado = await guardarTicket(ticket);
      ticket.id = ticketGuardado.id;
      this.limpiarCarrito();
      window.location.href = `/api/ticket/${ticket.id}`;
    } catch (err) {
      console.error(err);
    }
  }

  limpiarCarrito() {
    Persona.borrarNombre();
    localStorage.clear();
    sessionStorage.clear();
    this.carrito.vaciar();
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = () => {
      window.location.href = "/pages/bienvenida.html";
    };
  }

  actualizar() {
    if (!this.elemento) return;
    const total = this.carrito.calcularTotal();
    const formato = `$${total.toFixed(2)}`;
    this.elemento.querySelector(".resumen-subtotal").textContent = formato;
    this.elemento.querySelector(".resumen-total").textContent = formato;
  }
}