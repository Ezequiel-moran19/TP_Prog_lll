export class TablaProductosView {
  static ENCABEZADOS = [ "Imagen","Nombre", "Descripción", "Precio", "Stock", "Estado", "Acciones"];

  constructor(productos = [], callbacks = {}) {
    this.productos = productos;
    this.callbacks = callbacks;
  }

  renderizarVista(contenedorId = "productos") {
    const contenedor = document.getElementById(contenedorId);
    if (!contenedor) return;
    contenedor.innerHTML = "";

    if (!this.productos.length) {
      const alerta = document.createElement("div");
      alerta.className = "alert alert-info text-center";
      alerta.textContent = "No hay productos";
      contenedor.appendChild(alerta);
      return;
    }

    const tabla = document.createElement("table");
    tabla.className = "table table-striped table-bordered align-middle shadow-sm";

    tabla.appendChild(this.crearEncabezado());
    tabla.appendChild(this.crearCuerpoTabla());

    contenedor.appendChild(tabla);
    this.asignarEventos(contenedor);
  }

  crearEncabezado() {
    const thead = document.createElement("thead");
    thead.className = "table-dark text-center";

    const fila = document.createElement("tr");

    TablaProductosView.ENCABEZADOS.forEach(texto => {
      const th = document.createElement("th");
      th.textContent = texto;
      fila.appendChild(th);
    });

    thead.appendChild(fila);
    return thead;
  }

  crearCuerpoTabla() {
    const tbody = document.createElement("tbody");

    this.productos.forEach(producto => {
      const fila = this.crearFila(producto);
      tbody.appendChild(fila);
    });

    return tbody;
  }

  crearFila(producto) {
    const tr = document.createElement("tr");

    const columnas = [
      this.crearColumnaImagen(producto),
      this.crearColumnaTexto(producto.nombre, true),
      this.crearColumnaTexto(producto.descripcion || ""),
      this.crearColumnaPrecio(producto.precio),
      this.crearColumnaStock(producto.stock),
      this.crearColumnaEstado(producto.estado),
      this.crearColumnaAcciones(producto)
    ];

    if (!producto.estado) {
      columnas.slice(0, 6).forEach(col => col.classList.add("opacity-50"));
    }

    columnas.forEach(col => tr.appendChild(col));
    return tr;
  }

  crearColumnaImagen(producto) {
    const td = document.createElement("td");
    td.className = "text-center";

    const img = this.crearImagen(producto)

    td.appendChild(img);
    return td;
  }

  crearColumnaTexto(texto, bold = false) {
    const td = document.createElement("td");
    td.innerHTML = bold ? `<strong>${texto}</strong>` : texto;
    return td;
  }

  crearColumnaPrecio(precio) {
    const td = document.createElement("td");
    td.className = "fw-bold text-danger";
    td.textContent = `$${precio}`;
    return td;
  }

  crearColumnaStock(stock) {
    const td = document.createElement("td");
    td.className = "fw-bold";
    td.innerHTML = `Stock: <span class="text-primary">${stock}</span>`;
    return td;
  }

  crearColumnaEstado(estado) {
    const td = document.createElement("td");
    td.className = "fw-bold text-center";

    const span = document.createElement("span");
    span.className = estado ? "text-success" : "text-danger";
    span.textContent = estado ? "Activo" : "Inactivo";

    td.appendChild(span);
    return td;
  }

  crearColumnaAcciones(producto) {
    const td = document.createElement("td");
    td.className = "text-center d-flex flex-column gap-2";

    const btnEditar = this.crearBotonEditar (producto)
    const btnEstado = this.crearBotonEstado (producto)

    td.appendChild(btnEditar);
    td.appendChild(btnEstado);
    return td;
  }

  crearBotonEditar(producto){
    const btnEditar = document.createElement("a");
      btnEditar.href = `/admin/editar-producto/${producto.id}`;
      btnEditar.className = "btn btn-warning btn-sm";
      btnEditar.textContent = "Editar";
    return btnEditar
  }

  crearBotonEstado(producto){
    const btnEstado = document.createElement("button");
      btnEstado.className = "btn btn-secondary btn-sm btn-estado";
      btnEstado.dataset.id = producto.id;
      btnEstado.dataset.estado = producto.estado;
      btnEstado.textContent = producto.estado ? "Desactivar" : "Activar";
    return btnEstado
  }

  crearImagen(producto){
    const img = document.createElement("img");
      img.src = producto.rutaImg || "#";
      img.alt = producto.nombre;
      img.className = "rounded";
      img.style.width = "70px";
      img.style.height = "70px";
    return img
  }

  asignarEventos(contenedor) {
    contenedor.addEventListener("click", (e) => {
      if (e.target.classList.contains("btn-estado")) {
        const id = e.target.dataset.id;
        const estadoActual = e.target.dataset.estado === "true";
        this.callbacks.toggleEstado(id, !estadoActual);
      }
    });
  }
}
