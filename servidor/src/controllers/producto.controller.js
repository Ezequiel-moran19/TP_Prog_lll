import { ProductoService } from "../services/producto.service.js";
import { FileService } from "../services/file.service.js";
import { obtenerDatosDelBody, obtenerDatosActualizacion } from "../utils/producto.utils.js";

class ProductoController {
  static async listar(req, res) {
    try {
      const productos = await ProductoService.listarProductos();
      res.json({
        message: "Lista de productos",
        status: 200,
        body: productos
      });
    } catch (error) {
      console.error("Error en ProductoController.listar:", error);
      res.status(500).json({ error: "Error al listar productos" });
    }
  }

  static async buscar(req, res) {
    try {
      const { q } = req.query;
      const productos = await ProductoService.buscarProductos(q);
      res.json({
        message: "Resultados",
        status: 200,
        body: productos
      });
    } catch (error) {
      console.error("Error en ProductoController.buscar:", error);
      res.status(500).json({ error: "Error en la búsqueda" });
    }
  }

  static async obtenerUno(req, res) {
    try {
      const producto = await ProductoService.obtenerProducto(req.params.id);
      if (!producto) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }
      res.json(producto);
    } catch (error) {
      console.error("Error en ProductoController.obtenerUno:", error);
      res.status(404).json({ error: "Producto no encontrado" });
    }
  }

  static async crear(req, res) {
    try {
      const rutaImg = FileService.guardarImagen(req.file);
      const datos = obtenerDatosDelBody(req.body, rutaImg);
      await ProductoService.crearProducto(datos);
      return res.redirect("/admin/dashboard");
    } catch (error) {
      console.error("Error en ProductoController.crear:", error);
      return res.status(500).send("Error al crear producto");
    }
  }

  static async actualizar(req, res) {
    try {
      const producto = await ProductoService.obtenerProducto(req.params.id);
      if (!producto) return res.status(404).send("Producto no encontrado");

      const rutaImg = FileService.guardarImagen(req.file) ?? producto.rutaImg;
      const datos = obtenerDatosActualizacion(req.body, producto, rutaImg);
      await ProductoService.actualizarProducto(req.params.id, datos);
      return res.redirect("/admin/dashboard");
    } catch (error) {
      console.error("Error en ProductoController.actualizar:", error);
      res.status(500).send("Error al actualizar producto");
    }
  }

  static async cambiarEstado(req, res) {
    try {
      const { id } = req.params;
      const { estado } = req.body;
      await ProductoService.cambiarEstado(id, estado);
      return res.json({ ok: true, msg: "Estado actualizado", estado });
    } catch (error) {
      console.error("Error en ProductoController.cambiarEstado:", error);
      return res.status(500).json({ ok: false, msg: "Error al actualizar estado" });
    }
  }
}

export default ProductoController;
