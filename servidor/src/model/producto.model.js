import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

export const Producto = sequelize.define("Producto", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false }, 
    descripcion: { type: DataTypes.STRING, allowNull: true },
    precio: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    rutaImg: { type: DataTypes.STRING, allowNull: true },
    categoria: { type: DataTypes.STRING, allowNull: false },
    estado: { type: DataTypes.BOOLEAN, defaultValue: true },
    stock: { type: DataTypes.INTEGER, defaultValue: 0 },
}, { tableName: "productos", timestamps: false });

export default { Producto };