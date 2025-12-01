import { obtenerProductos, actualizarEstadoProducto } from "/js/api/productosApi.js";

export const ProductosService = {
  async listar() {
    return await obtenerProductos();
  },
  async actualizarEstado(id, estado) {
    await actualizarEstadoProducto(id, estado);
  },
  async buscar(texto) {
    if (!texto) return this.listar();
    const res = await fetch(`/api/productos/buscar?q=${texto}`);
    const data = await res.json();
    return data.body;
  }
};
