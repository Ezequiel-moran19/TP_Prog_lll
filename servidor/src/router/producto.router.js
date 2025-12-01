import { Router } from "express";
import multer from "multer";
// Controllers
import ProductoController from "../controllers/producto.controller.js";
import VentaController from "../controllers/venta.controller.js";
import TicketController from "../controllers/ticket.controller.js";
// Middlewares
import { verificarAdmin } from "../middlewares/verificarAdmin.js";
import { validarProducto } from "../middlewares/validarProducto.js";
import { validarVenta } from "../middlewares/validarVenta.js";

const router = Router();
const upload = multer({ dest: "servidor/src/uploads" });

// PRODUCTOS
router.get("/productos", ProductoController.listar);
router.get("/productos/buscar", ProductoController.buscar);
router.get("/productos/:id", verificarAdmin, ProductoController.obtenerUno);

router.post(
  "/productos",
  verificarAdmin,
  upload.single("imgProductos"),
  validarProducto,
  ProductoController.crear
);

router.post(
  "/productos/:id",
  verificarAdmin,
  upload.single("imgProductos"),
  validarProducto,
  ProductoController.actualizar
);

router.patch("/productos/:id", verificarAdmin, ProductoController.cambiarEstado);

// VENTAS 
router.post("/venta", validarVenta, VentaController.crear);

// TICKET 
router.post("/ticket", TicketController.guardarTicket);
router.post("/ticket/pdf", TicketController.generarPDF);
router.get("/ticket/:id", TicketController.obtenerTicketHTML);

export default router;
