import { Admin } from "../model/admin.model.js";
import bcrypt from "bcrypt";

export const crearAdmin = async () => {
  const adminExistente = await Admin.findOne({ where: { nombre: "admin" } });

  if (!adminExistente) {
    const hash = await bcrypt.hash("1234", 10);
    await Admin.create({ nombre: "admin", pass: hash });
    console.log("Administrador creado por defecto");
  }
};

