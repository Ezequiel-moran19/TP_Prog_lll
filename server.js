import app from "./servidor/src/app/app.js";
import { sequelize } from "./servidor/src/database/db.js";
import { crearAdmin } from "./servidor/src/utils/crearAdmin.js"; 
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Conexión a MySQL OK");

    await sequelize.sync();
    console.log("Tablas sincronizadas");

    await crearAdmin();

    app.listen(port, () => {
      console.log(`Servidor en http://localhost:${port}`);
    });

  } catch (error) {
    console.error("Error al iniciar servidor:", error);
  }
}

startServer();
