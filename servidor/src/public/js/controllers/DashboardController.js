import { TablaProductosView } from "../views/dashboardView.js";
import { obtenerProductos, actualizarEstadoProducto } from "/js/api/productosApi.js";

export class TablaProductosController {
  static paginaActual = 1;
  static productosPorPagina = 4;
  static categoriaActual = null;
  static productos = [];
  static CATEGORIAS = [
    { name: "Guitarra", btnId: "filtro-guitarra" },
    { name: "Piano", btnId: "filtro-pianos" } 
  ];

  static async init() {
    this.productos = await obtenerProductos();
    this.actualizarContadores(this.productos);

    if (this.categoriaActual === null) {
      this.categoriaActual = "Guitarra";
    }

    this.renderizar();
    this.asignarBuscador();
    this.asignarFiltros();
    this.asignarPaginacion();
  }

  static obtenerListaFiltrada() {
    if (!this.categoriaActual) return this.productos;
    return this.productos.filter(p => p.categoria === this.categoriaActual);
  }

  static obtenerPaginaActual() {
    const lista = this.obtenerListaFiltrada();
    const inicio = (this.paginaActual - 1) * this.productosPorPagina;
    const fin = inicio + this.productosPorPagina;
    return lista.slice(inicio, fin);
  }

  static obtenerTotalPaginas() {
    return Math.max(1, Math.ceil(this.obtenerListaFiltrada().length / this.productosPorPagina));
  }

  static mostrarPagina(pagina) {
    this.paginaActual = pagina;
    this.renderizar();
  }

  static cambiarCategoria(categoria) {
    this.categoriaActual = categoria;
    this.paginaActual = 1;
    this.renderizar();
  }

  static renderizar() {
    new TablaProductosView(this.obtenerPaginaActual(), {
      toggleEstado: async (id, nuevoEstado) => {
        await actualizarEstadoProducto(id, nuevoEstado);
        await this.init(); 
      },
      cambiarPagina: (pagina) => this.mostrarPagina(pagina)
    }).renderizarVista("productos");

    this.actualizarIndicador();
  }

  static actualizarIndicador() {
    const actualEl = document.getElementById("pagina-actual");
    const totalEl  = document.getElementById("total-paginas");
    if (actualEl) actualEl.textContent = this.paginaActual;
    if (totalEl)  totalEl.textContent  = this.obtenerTotalPaginas();
  }

  static actualizarContadores(productos) {
    this.CATEGORIAS.forEach(({ name, btnId }) => {
      const cantidad = productos.filter(p => p.categoria === name).length;
      const btn = document.getElementById(btnId);
      if (btn) btn.textContent = `${name}s (${cantidad})`;
    });
  }

  static asignarFiltros() {
    this.CATEGORIAS.forEach(({ name, btnId }) => {
      const el = document.getElementById(btnId);
      if (!el) return;
      el.onclick = null; // elimina handler directo si existiera
      el.addEventListener("click", () => this.cambiarCategoria(name));
    });
  }

  static asignarPaginacion() {
    const btnAnt = document.getElementById("pagina-anterior");
    const btnSig = document.getElementById("pagina-siguiente");

    if (btnAnt) {
      btnAnt.onclick = () => {
        const actual = this.paginaActual;
        const nueva = Math.max(1, actual - 1);
        this.mostrarPagina(nueva);
      };
    }

    if (btnSig) {
      btnSig.onclick = () => {
        const actual = this.paginaActual;
        const total = this.obtenerTotalPaginas();
        const nueva = Math.min(total, actual + 1);
        this.mostrarPagina(nueva);
      };
    }
  }

  static async asignarBuscador(){
    const input = document.getElementById("barra-busqueda");

    input.addEventListener("input", async (e) => {
      const texto = e.target.value.trim();
      
      if (texto === "") {
        this.productos = await obtenerProductos();
        this.paginaActual = 1;
        this.renderizar()
        return;
      }

      const res = await fetch(`/api/productos/buscar?q=${texto}`);
      const data = await res.json()

      this.productos = data.body;
      this.paginaActual = 1;
      this.renderizar();
    });
  }
}
