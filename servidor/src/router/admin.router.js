import { Router } from "express";
import { verificarAdmin } from "../middlewares/verificarAdmin.js";
import { adminController } from "../controllers/admin.controller.js";

const adminRouter = Router();

adminRouter.get("/login", adminController.login);

adminRouter.get("/dashboard", verificarAdmin,adminController.dashboard);

adminRouter.get("/alta-producto", verificarAdmin,adminController.altaProducto);

adminRouter.get("/editar-producto/:id", verificarAdmin, adminController.editarProducto);

adminRouter.post("/login", adminController.ingresar);
 
adminRouter.get("/logout",adminController.salir);

// con postman 
adminRouter.post("/registrar",adminController.registrar);

export default adminRouter;