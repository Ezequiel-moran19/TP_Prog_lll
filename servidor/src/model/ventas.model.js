import { DataTypes } from "sequelize"
import { sequelize } from "../database/db.js"

export const Venta = sequelize.define("Venta", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    fecha: { type: DataTypes.DATE, allowNull: false },
    nombreCliente: { type: DataTypes.STRING, allowNull: false },
    total: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
}, { tableName: "ventas", timestamps: false });
