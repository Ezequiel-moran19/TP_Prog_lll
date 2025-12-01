import { TablaProductosView } from "../views/dashboardView.js";
import { ProductosService } from "../services/productosService.js";
import { Paginacion } from "../utils/paginacion.js";
import { Filtros } from "../utils/filtros.js";

export class TablaProductosController {
  static productos = [];

  static async init() {
    this.productos = await ProductosService.listar();
    Filtros.actualizarContadores(this.productos);

    if (!Filtros.categoriaActual) Filtros.categoriaActual = "Guitarra";

    this.renderizar();
    this.asignarBuscador();
    Filtros.asignarBotones((categoria) => this.cambiarCategoria(categoria));
    this.asignarPaginacion();
  }

  static obtenerListaFiltrada() {
    if (!Filtros.categoriaActual) return this.productos;
    return this.productos.filter(p => p.categoria === Filtros.categoriaActual);
  }

  static renderizar() {
    new TablaProductosView(Paginacion.obtenerPagina(this.obtenerListaFiltrada()), {
      toggleEstado: async (id, nuevoEstado) => {
        await ProductosService.actualizarEstado(id, nuevoEstado);
        await this.init();
      },
      cambiarPagina: (pagina) => Paginacion.mostrarPagina(pagina, () => this.renderizar())
    }).renderizarVista("productos");

    this.actualizarIndicador();
  }

  static actualizarIndicador() {
    const actualEl = document.getElementById("pagina-actual");
    const totalEl  = document.getElementById("total-paginas");
    if (actualEl) actualEl.textContent = Paginacion.paginaActual;
    if (totalEl)  totalEl.textContent  = Paginacion.obtenerTotalPaginas(this.obtenerListaFiltrada());
  }

  static cambiarCategoria(categoria) {
    Filtros.categoriaActual = categoria;
    Paginacion.paginaActual = 1;
    this.renderizar();
  }

  static asignarPaginacion() {
    const btnAnt = document.getElementById("pagina-anterior");
    const btnSig = document.getElementById("pagina-siguiente");

    if (btnAnt) btnAnt.onclick = () => {
      const nueva = Math.max(1, Paginacion.paginaActual - 1);
      Paginacion.mostrarPagina(nueva, () => this.renderizar());
    };
    if (btnSig) btnSig.onclick = () => {
      const total = Paginacion.obtenerTotalPaginas(this.obtenerListaFiltrada());
      const nueva = Math.min(total, Paginacion.paginaActual + 1);
      Paginacion.mostrarPagina(nueva, () => this.renderizar());
    };
  }

  static async asignarBuscador(){
    const input = document.getElementById("barra-busqueda");
    if (!input) return;

    input.addEventListener("input", async (e) => {
      const texto = e.target.value.trim();
      this.productos = await ProductosService.buscar(texto);
      Paginacion.paginaActual = 1;
      this.renderizar();
    });
  }
}
