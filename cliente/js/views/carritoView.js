import { ResumenCarritoView } from "./resumenCarritoView.js";

export class CarritoView {

    constructor(carrito, confirmarCallback) {
        this.carrito = carrito;
        this.contenedorCarrito = document.getElementById("carrito");
        this.contenedorResumen = document.getElementById("resumen");
        this.resumenView = new ResumenCarritoView(this.contenedorResumen, carrito, confirmarCallback);
        this.inicializarEventos();
    }

    // INICIALIZAR EVENTOS
    inicializarEventos() {
        this.contenedorCarrito.addEventListener("click", (e) => {
            const btn = e.target.closest(".sumar, .restar, .btn-eliminar");
            if (!btn) return;

            const index = Number(btn.dataset.index); // Aseguramos número
            if (btn.classList.contains("sumar")) this.cambiarCantidad(index, 1);
            if (btn.classList.contains("restar")) this.cambiarCantidad(index, -1);
            if (btn.classList.contains("btn-eliminar")) this.eliminarItem(index);
        });
    }

    // RENDER PRINCIPAL
    mostrarCarrito() {
        this.contenedorCarrito.innerHTML = "";

        if (!this.carrito.items.length) {
            this.contenedorCarrito.innerHTML = `<div class="alert alert-info text-center"> Tu carrito está vacío </div>`;
        } else {
            this.contenedorCarrito.innerHTML = this.carrito.items
                .map((item, i) => this.generarCardItem(item, i))
                .join("");
        }

        this.resumenView.render();
        this.actualizarContador();
    }

    // GENERAR TARJETA DE PRODUCTO
    generarCardItem(item, index) {
        return `<div class="d-flex gap-4 border rounded p-3 mb-3 align-items-center shadow-sm" data-index="${index}">
                    ${this.generarImagen(item)}
                    ${this.generarInfoProducto(item)}
                    ${this.generarControles(item, index)}
                </div>`;
    }

    generarImagen(item) {
        return `<img src="http://localhost:3000${item.rutaImg}" 
                     alt="${item.nombre}" 
                     class="rounded object-fit-cover"
                     style="width: 100px; height: 100px;">`;
    }

    generarInfoProducto(item) {
        return `<div class="flex-grow-1">
                    <h5 class="fw-semibold mb-1">${item.nombre}</h5>
                    <p class="text-muted mb-2 descripcion">${item.descripcion || "Sin descripción"}</p>
                    <p class="fw-bold text-danger mb-0">$${item.precio}</p>
                    <p class="text-sm text-danger mb-0">Stock: ${item.stock}</p>
                </div>`;
    }

    generarControles(item, index) {
        return `<div class="d-flex flex-column align-items-end gap-2">
                    <button class="btn btn-outline-danger btn-sm btn-eliminar" data-index="${index}">
                        <i class="bi bi-trash"></i>
                    </button>
                    <div class="d-flex align-items-center gap-2">
                        <button class="btn btn-outline-secondary btn-sm restar" data-index="${index}">-</button>
                        <span class="fw-semibold cantidad">${item.cantidad}</span>
                        <button class="btn btn-outline-secondary btn-sm sumar" data-index="${index}">+</button>
                    </div>
                    <p class="fw-semibold text-sm mb-0 subtotal"> Subtotal: $${item.subtotal} </p>
                </div>`;
    }

    // CAMBIAR CANTIDAD
    cambiarCantidad(index, cambio) {
        const item = this.carrito.items[index];
        if (!item) return;

        const nuevaCantidad = item.cantidad + cambio;

        if (nuevaCantidad <= 0) return this.eliminarItem(index);

        if (nuevaCantidad > item.stock) {
            item.cantidad = item.stock;
        } else {
            item.cantidad = nuevaCantidad;
        }

        item.subtotal = item.cantidad * item.precio;
        this.carrito.guardar();
        this.actualizarItem(index);
        this.resumenView.actualizar();
        this.actualizarContador();
    }

    // ELIMINAR ITEM
    eliminarItem(index) {
        this.carrito.eliminar(index);
        this.mostrarCarrito();
    }

    // ACTUALIZAR ITEM INDIVIDUAL EN EL DOM
    actualizarItem(index) {
        const item = this.carrito.items[index];
        const card = this.contenedorCarrito.querySelector(`[data-index="${index}"]`);
        if (!card) return;

        card.querySelector(".cantidad").textContent = item.cantidad;
        card.querySelector(".subtotal").textContent = `Subtotal: $${item.subtotal}`;
    }

    // ACTUALIZAR CONTADOR GENERAL
    actualizarContador() {
        const total = this.carrito.items.reduce((acc, p) => acc + p.cantidad, 0);
        const badge = document.querySelector("#contadorCarrito");
        if (badge) badge.textContent = total;
    }
}

/*
export class CarritoView {
    constructor(carrito, confirmarCallback) {
        this.carrito = carrito;
        this.items = carrito.items;
        this.confirmarCallback = confirmarCallback;

        // Tomamos las referencias una sola vez
        this.contenedorCarrito = document.getElementById("carrito");
        this.contenedorResumen = document.getElementById("resumen");
        this.resumenContainer = null;
    }

    // Función útil para evitar repetir toFixed()
    formatearDinero(valor) {
        return `$${valor.toFixed(2)}`;
    }

    static crearElemento(tag, className, innerHTML = '') {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (innerHTML) element.innerHTML = innerHTML;
        return element;
    }

    mostrarCarrito() {
        if (!this.contenedorCarrito) return;

        this.contenedorCarrito.innerHTML = "";
        this.limpiarResumen();

        if (!this.items.length) {
            this.contenedorCarrito.innerHTML = `
                <div class="alert alert-info text-center">
                    Tu carrito está vacío
                </div>`;
        } else {
            this.contenedorCarrito.innerHTML = this.items
                .map((item, i) => this.generarCardItem(item, i))
                .join('');

            this.mostrarResumen();
            this.asignarEventos();
        }

        this.actualizarContador();
    }

    limpiarResumen() {
        if (this.contenedorResumen) this.contenedorResumen.innerHTML = "";
        this.resumenContainer = null;
    }

    generarCardItem(item, index) {
        return `
            <div class="d-flex gap-4 border rounded p-3 mb-3 align-items-center shadow-sm" 
                 data-item-id="${item.id}">
                
                <img src="http://localhost:3000${item.rutaImg}" 
                     alt="${item.nombre}" 
                     class="rounded object-fit-cover"
                     style="width: 100px; height: 100px;">

                <div class="flex-grow-1">
                    <h5 class="fw-semibold mb-1">${item.nombre}</h5>
                    <p class="text-muted mb-2 descripcion">${item.descripcion || "Sin descripción"}</p>
                    <p class="fw-bold text-danger mb-0">$${item.precio}</p>
                    <p class="text-sm text-danger mb-0">Stock: ${item.stock}</p>
                </div>

                <div class="d-flex flex-column align-items-end gap-2">
                    <button class="btn btn-outline-danger btn-sm btn-eliminar" data-index="${index}">
                        <i class="bi bi-trash"></i>
                    </button>

                    <div class="d-flex align-items-center gap-2">
                        <button class="btn btn-outline-secondary btn-sm restar" data-index="${index}">-</button>
                        <span class="fw-semibold cantidad" data-index="${index}">${item.cantidad}</span>
                        <button class="btn btn-outline-secondary btn-sm sumar" data-index="${index}">+</button>
                    </div>

                    <p class="fw-semibold text-sm mb-0 subtotal" data-index="${index}">
                        Subtotal: $${item.subtotal}
                    </p>
                </div>
            </div>`;
    }

    mostrarResumen() {
        const subtotal = this.carrito.calcularTotal();

        this.resumenContainer = CarritoView.crearElemento(
            'div',
            'p-3 bg-light rounded shadow-sm',
            this.generarResumenHTML(subtotal)
        );

        if (this.contenedorResumen) {
            this.contenedorResumen.innerHTML = "";
            this.contenedorResumen.appendChild(this.resumenContainer);
        }

        document
            .getElementById("finalizarCompra")
            ?.addEventListener("click", () => {
                if (this.confirmarCallback) this.confirmarCallback();
                window.location.href = "./ticket.html";
            });
    }

    generarResumenHTML(subtotal) {
        const total = this.formatearDinero(subtotal);

        return `
            <div class="p-3 bg-light rounded">
                <h4 class="fw-bold mb-3">Resumen</h4>

                <div class="d-flex justify-content-between mb-2">
                    <span>Subtotal</span>
                    <span class="resumen-subtotal">${total}</span>
                </div>

                <div class="d-flex justify-content-between fw-bold fs-5 text-danger">
                    <span>Total</span>
                    <span class="resumen-total">${total}</span>
                </div>

                <div class="mt-3">
                    <button class="btn btn-danger w-100 mb-2" id="finalizarCompra">
                        Finalizar Compra
                    </button>

                    <a href="./productos.html" class="btn btn-outline-secondary w-100">
                        Seguir comprando
                    </a>
                </div>
            </div>`;
    }

    asignarEventos() {
        this.configurarEventosBoton(".restar", (i) => this.cambiarCantidad(i, -1));
        this.configurarEventosBoton(".sumar", (i) => this.cambiarCantidad(i, 1));
        this.configurarEventosBoton(".btn-eliminar", (i) => this.eliminarItem(i));
    }

    // Delegación de eventos más simple
    configurarEventosBoton(selector, handler) {
        this.contenedorCarrito.addEventListener("click", (e) => {
            const btn = e.target.closest(selector);
            if (!btn) return;

            const index = btn.dataset.index;
            handler(index);
        });
    }

    eliminarItem(index) {
        this.carrito.eliminar(index);
        this.items = this.carrito.items;
        this.mostrarCarrito();
    }

    cambiarCantidad(index, delta) {
        const item = this.carrito.items[index];
        if (!item) return;

        if (delta > 0 && item.cantidad >= item.stock) {
            alert(`No hay más stock disponible (${item.stock})`);
            return;
        }

        item.cantidad += delta;

        if (item.cantidad <= 0) {
            this.carrito.eliminar(index);
            this.items = this.carrito.items;
            this.mostrarCarrito();
        } else {
            item.subtotal = item.cantidad * item.precio;
            this.carrito.guardar();
            this.actualizarVistaParcial(index);
        }
    }

    actualizarItemDom(index, item) {
        const cantidad = document.querySelector(`.cantidad[data-index="${index}"]`);
        const subtotal = document.querySelector(`.subtotal[data-index="${index}"]`);

        if (cantidad) cantidad.textContent = item.cantidad;
        if (subtotal) subtotal.textContent = `Subtotal: $${item.subtotal}`;
    }

    actualizarVistaParcial(index) {
        const item = this.carrito.items[index];
        if (!item) return;

        this.actualizarItemDom(index, item);
        this.actualizarResumen();
        this.actualizarContador();
    }

    actualizarResumen() {
        if (!this.resumenContainer) return;

        const subtotal = this.carrito.calcularTotal();
        const formatted = this.formatearDinero(subtotal);

        this.resumenContainer.querySelector(".resumen-subtotal").textContent = formatted;
        this.resumenContainer.querySelector(".resumen-total").textContent = formatted;
    }

    actualizarContador() {
        const cont = document.getElementById("contador_carrito");
        if (!cont) return;

        const cantidad = this.items.length;
        const total = this.carrito.calcularTotal();

        cont.className = "alert alert-secondary mt-3 text-center";
        cont.textContent = cantidad
            ? `🛒 ${cantidad} producto(s) - Total: $${total}`
            : "🛒 Carrito vacío (0 productos)";
    }
}

*/