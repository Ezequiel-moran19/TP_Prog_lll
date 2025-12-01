export const Filtros = {
  CATEGORIAS: [
    { name: "Guitarra", btnId: "filtro-guitarra" },
    { name: "Piano", btnId: "filtro-pianos" }
  ],
  categoriaActual: null,

  asignarBotones(cambiarCategoriaCallback) {
    this.CATEGORIAS.forEach(({ name, btnId }) => {
      const el = document.getElementById(btnId);
      if (!el) return;
      el.onclick = null;
      el.addEventListener("click", () => cambiarCategoriaCallback(name));
    });
  },

  actualizarContadores(productos) {
    this.CATEGORIAS.forEach(({ name, btnId }) => {
      const cantidad = productos.filter(p => p.categoria === name).length;
      const btn = document.getElementById(btnId);
      if (btn) btn.textContent = `${name}s (${cantidad})`;
    });
  }
};
