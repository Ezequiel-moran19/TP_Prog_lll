import { Venta, VentaItem, Producto } from "../model/relaciones.model.js"; 
import { VentaService } from "../services/venta.service.js";
import { normalizarTicket, renderHTMLDesdeEJS } from "../utils/ticket.utils.js";
import { generarPDFdesdeHTML } from "../services/pdf.service.js";

export default class TicketController {

  static async guardarTicket(req, res) {
    try {
      const ventaCreada = await VentaService.crearVenta(req.body);
      res.json(ventaCreada);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async obtenerTicketHTML(req, res) {
    try {
      const id = req.params.id;

      const ticket = await Venta.findByPk(id, {
        include: [
          { model: VentaItem, as: "items", include: [Producto] }
        ]
      });

      if (!ticket) return res.status(404).send("Ticket no encontrado");

      const ticketData = normalizarTicket(ticket);
      res.render("ticket.ejs", { ticket: ticketData });

    } catch (err) {
      res.status(500).send("Error interno");
    }
  }

  static async generarPDF(req, res) {
    try {
      const { id } = req.body;

      const ticket = await Venta.findByPk(id, {
        include: [
          { model: VentaItem, as: "items", include: [Producto] }
        ]
      });

      if (!ticket) {
        return res.status(404).json({ error: "Ticket inexistente" });
      }

      const ticketData = normalizarTicket(ticket);
      const html = await renderHTMLDesdeEJS(res, { ticket: ticketData });
      const pdfBuffer = await generarPDFdesdeHTML(html);

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename=ticket_${id}.pdf`);
      res.send(pdfBuffer);

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}
