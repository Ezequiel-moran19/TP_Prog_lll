export const Paginacion = {
  paginaActual: 1,
  productosPorPagina: 4,

  obtenerTotalPaginas(lista) {
    return Math.max(1, Math.ceil(lista.length / this.productosPorPagina));
  },

  obtenerPagina(lista) {
    const inicio = (this.paginaActual - 1) * this.productosPorPagina;
    return lista.slice(inicio, inicio + this.productosPorPagina);
  },

  mostrarPagina(nuevaPagina, renderCallback) {
    this.paginaActual = nuevaPagina;
    renderCallback();
  }
};
