import { Venta } from "./ventas.model.js";
import { VentaItem } from "./ventasItems.model.js";
import { Producto } from "./producto.model.js";

// RELACIÓN VENTA → ITEMS
Venta.hasMany(VentaItem, { as: "items", foreignKey: "ventaId" });
VentaItem.belongsTo(Venta, { foreignKey: "ventaId" });

// RELACIÓN PRODUCTO → ITEMS
Producto.hasMany(VentaItem, { foreignKey: "productoId" });
VentaItem.belongsTo(Producto, { foreignKey: "productoId" });

export { Venta, VentaItem, Producto };
