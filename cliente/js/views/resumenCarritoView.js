import { Persona } from "../models/Personas.js";

export class ResumenCarritoView {

    constructor(contenedor, carrito, confirmarCallback) {
        this.contenedor = contenedor;
        this.carrito = carrito;
        this.confirmarCallback = confirmarCallback;
        this.elemento = this.contenedor;
    }

    render() {
        this.asignarEventos();
        this.actualizar();
    }

    asignarEventos() {
        const btnFinalizar = this.elemento.querySelector("#finalizarCompra");
        if (!btnFinalizar) return;

        btnFinalizar.addEventListener("click", async () => {
            if (this.carrito.items.length === 0) return;

            const cliente = Persona.obtenerNombre();

            const ticket = {
                nombreCliente: cliente,
                fecha: new Date().toISOString(),
                productos: this.carrito.items,
                total: this.carrito.calcularTotal()
            };

            const r1 = await fetch("/api/ticket", {
                method: "POST",
                body: JSON.stringify(ticket),
                headers: { "Content-Type": "application/json" }
            });

            if (!r1.ok) {
                console.error("Error guardando ticket");
                return;
            }

            const ticketGuardado = await r1.json();
            ticket.id = ticketGuardado.id;
            Persona.borrarNombre();
            localStorage.clear();
            sessionStorage.clear(); 
            window.location.href = `/api/ticket/${ticket.id}`;
            this.carrito.vaciar();
            window.history.pushState(null, "", window.location.href);
            window.onpopstate = function () {
            window.location.href = "/pages/bienvenida.html";
          };
        });
    }

    actualizar() {
        if (!this.elemento) return;

        const total = this.carrito.calcularTotal();
        const formato = `$${total.toFixed(2)}`;

        this.elemento.querySelector(".resumen-subtotal").textContent = formato;
        this.elemento.querySelector(".resumen-total").textContent = formato;
    }
}
