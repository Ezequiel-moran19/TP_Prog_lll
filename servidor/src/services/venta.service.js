import { ProductoService } from "./producto.service.js";
// import { Venta } from "../model/tablas.js";
import { Venta, VentaItem } from "../model/relaciones.model.js";

export class VentaService {
  static async crearVenta({ fecha, nombreCliente, total, productos }) {

    const venta = await Venta.create({ fecha, nombreCliente, total });

    for (const p of productos) {
      await VentaItem.create({
        ventaId: venta.id,
        productoId: p.id,
        cantidad: p.cantidad,
        precio: p.precio,
        subtotal: p.subtotal
      });

      await ProductoService.actualizarStock(p.id, p.cantidad);
    }

    return venta;
  }
}
