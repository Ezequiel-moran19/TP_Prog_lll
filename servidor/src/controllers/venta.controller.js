import { VentaService } from "../services/venta.service.js";

export class VentaController {
  static async crear(req, res) {
    try {
      const venta = await VentaService.crearVenta(req.body);
      res.json(venta);
    } catch (error) {
      res.status(500).json({ error: "Error al crear venta" });
    }
  }
}

export default VentaController;