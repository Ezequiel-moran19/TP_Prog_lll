export class ProductosView {
    static crearElemento(tag, className, innerHTML = '') {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (innerHTML) element.innerHTML = innerHTML;
        return element;
    }

    static renderizaProducto(producto) {
        const card = this.crearElemento('div', 'card');
        card.style.width = "18rem";
        card.innerHTML = `
        <img src="http://localhost:3000${producto.rutaImg}" class="card-img-top" alt="${producto.nombre}">
        <div class="card-body">
        <h5 class="card-title">Nombre: ${producto.nombre}</h5>
        <p class="card-text">Descripcion ${producto.descripcion}</p>
            <p class="card-text">Precio: $${producto.precio}</p>
            <p class="card-text">Stock: ${producto.stock}</p>
            <p class="card-text">Categoria: ${producto.categoria}</p>
            <div class="d-flex justify-content-center">
            <button class="btn btn-danger boton-card align-items-center btnAgregar" type="button">
              Agregar al carrito
            </button>
            </div>
        </div>`;
        return card;
    }

    static mostrarProducto(contenedor, listaProductos, carrito) {
        contenedor.innerHTML = "";
        listaProductos.forEach((producto) => {
            if (producto.estado) {
                const card = this.renderizaProducto(producto);
                const itemEnCarrito = carrito.items.find(p => p.id === producto.id);

                if (itemEnCarrito) {
                    this.configurarCardConCarrito(card, producto, carrito);
                }
                contenedor.appendChild(card);
            }
        });
    }

    static configurarCardConCarrito(card, producto, carrito) {
        const btnAgregar = card.querySelector(".btnAgregar");
        if (btnAgregar) btnAgregar.style.display = "none";

        const contenedorExistente = card.querySelector("div.mt-2");
        if (contenedorExistente) contenedorExistente.remove();

        const contenedorBotones = this.crearContenedorBotones();
        const itemEnCarrito = carrito.items.find(p => p.id === producto.id);
        contenedorBotones.querySelector("span").textContent = itemEnCarrito.cantidad;
        card.querySelector(".card-body").appendChild(contenedorBotones);

        this.agregarEventosCard(card, producto, carrito);
    }

    static crearBoton(tipo) {
        const clases = {
            sumar: "btn btn-light btn-sm btn-mas mas",
            restar: "btn btn-light btn-sm btn-menos menos"
        };
        const btn = this.crearElemento('a', clases[tipo]);
        btn.href = "#";
        btn.textContent = tipo === 'sumar' ? "+" : "-";
        return btn;
    }

    static manejarCantidad(card, producto, carrito, operacion) {
        const contador = card.querySelector("span");
        const itemIndex = carrito.items.findIndex(p => p.id === producto.id);
        const item = carrito.items[itemIndex];

        if (!item) return;

        if (operacion === 'incrementar') {
            if (item.cantidad < producto.stock) {
                item.cantidad += 1;
            } else {
                alert(`No hay más stock disponible (${producto.stock})`);
                return;
            }
        } else {
            item.cantidad -= 1;
        }

        if (item.cantidad <= 0) {
            carrito.items.splice(itemIndex, 1);
            this.restaurarCard(card);
        } else {
            item.subtotal = item.cantidad * item.precio;
            contador.textContent = item.cantidad;
        }

        carrito.guardar();
    }

    static manejarBotonMas(card, producto, carrito) {
        this.manejarCantidad(card, producto, carrito, 'incrementar');
    }

    static manejarBotonMenos(card, producto, carrito) {
        this.manejarCantidad(card, producto, carrito, 'decrementar');
    }

    static restaurarCard(card) {
        const btnAgregar = card.querySelector(".btnAgregar");
        if (btnAgregar) btnAgregar.style.display = "block";

        const contenedorBotones = card.querySelector("div.mt-2");
        if (contenedorBotones) contenedorBotones.remove();
    }

    static renderContador() {
        const contador = this.crearElemento('span', 'fw-bold mx-2');
        contador.textContent = "1";
        return contador;
    }

    static agregarEventosCard(card, producto, carrito) {
        const contenedorBotones = card.querySelector("div.mt-2");
        if (!contenedorBotones) return;

        const nuevoContenedor = contenedorBotones.cloneNode(true);
        contenedorBotones.parentNode.replaceChild(nuevoContenedor, contenedorBotones);

        nuevoContenedor.addEventListener("click", (e) => {
            e.preventDefault();

            if (e.target.classList.contains("btn-mas")) {
                this.manejarBotonMas(card, producto, carrito);
            } else if (e.target.classList.contains("btn-menos")) {
                this.manejarBotonMenos(card, producto, carrito);
            }
            ProductosView.actualizarContadorCarrito(carrito);
        });
    }

    static crearContenedorBotones() {
        const btnSumar = this.crearBoton('sumar')
        const contador = this.renderContador();
        const btnRestar = this.crearBoton('restar');

        const contenedorBotones = this.crearElemento('div',
            'd-flex justify-content-between align-items-center mt-2');
        contenedorBotones.append(btnRestar, contador, btnSumar);

        return contenedorBotones;
    }

    static actualizarContadorCarrito(carrito) {
        const contador = document.getElementById("contador-carrito");
        if (!contador) return;

        contador.textContent = carrito.totalUnidades();
    }
}
