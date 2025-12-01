import { DataTypes } from "sequelize"
import { sequelize } from "../database/db.js"

export const VentaItem = sequelize.define("VentaItem", {
    ventaId: { type: DataTypes.INTEGER },
    productoId: { type: DataTypes.INTEGER },
    cantidad: DataTypes.INTEGER,
    precio: DataTypes.DECIMAL(10, 2),
    subtotal: DataTypes.DECIMAL(10, 2)
}, { tableName: "venta_items", timestamps: false });

export default { VentaItem };
