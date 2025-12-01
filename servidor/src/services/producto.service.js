import { Producto } from "../model/producto.model.js";
import { Op } from "sequelize";

export class ProductoService {
  static async listarProductos() {
    return await Producto.findAll({
      order: [
        ["estado", "DESC"],
        ["stock", "DESC"]   
      ]
    });
  }

  static async buscarProductos(termino) {
    return await Producto.findAll({
      where: {
        nombre: {
          [Op.like]: `%${termino}%`
        }
      }
    });
  }

  static async obtenerProducto(id) {
    return await Producto.findByPk(id);
  }

  static async crearProducto(datos) {
    return await Producto.create(datos);
  }

  static async actualizarProducto(id, datos) {
    const producto = await Producto.findByPk(id);
    if (!producto) throw new Error("Producto no encontrado");
    
    return await producto.update(datos);
  }

  static async cambiarEstado(id, estado) {
    const producto = await Producto.findByPk(id);
    if (!producto) throw new Error("Producto no encontrado");
    
    return await producto.update({ estado });
  }

  static async actualizarStock(id, cantidad) {
    return await Producto.increment(
      { stock: -cantidad },
      { where: { id } }
    );
  }
}