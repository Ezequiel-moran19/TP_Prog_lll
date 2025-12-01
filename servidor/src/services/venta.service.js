import { ProductoService } from "./producto.service.js";
import { Venta, VentaItem } from "../model/relaciones.model.js";

export class VentaService {
  static async crearVenta({ fecha, nombreCliente, total, productos }) {
    // Crear la venta
    const venta = await Venta.create({ fecha, nombreCliente, total });
    // Crear los items relacionados y actualizar stock en paralelo
    await Promise.all(
      productos.map(p =>
        VentaItem.create({
          ventaId: venta.id,
          productoId: p.id,
          cantidad: p.cantidad,
          precio: p.precio,
          subtotal: p.subtotal
        }).then(() => ProductoService.actualizarStock(p.id, p.cantidad))
      )
    );

    return venta;
  }
}
