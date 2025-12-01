export class Paginacion {

  constructor(items, porPagina = 4) {
    this.items = items;
    this.paginaActual = 1;
    this.porPagina = porPagina;
  }

  setItems(items) {
    this.items = items;
    this.paginaActual = 1;
  }

  obtenerPaginaActual() {
    const inicio = (this.paginaActual - 1) * this.porPagina;
    const fin = inicio + this.porPagina;
    return this.items.slice(inicio, fin);
  }

  totalPaginas() {
    return Math.max(1, Math.ceil(this.items.length / this.porPagina));
  }

  siguiente() {
    if (this.paginaActual < this.totalPaginas()) {
      this.paginaActual++;
    }
  }

  anterior() {
    if (this.paginaActual > 1) {
      this.paginaActual--;
    }
  }

  irA(pagina) {
    const total = this.totalPaginas();
    this.paginaActual = Math.min(total, Math.max(1, pagina));
  }

}
