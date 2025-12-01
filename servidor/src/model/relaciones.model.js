import { Venta } from "./ventas.model.js";
import { VentaItem } from "./ventasItems.model.js";
import { Producto } from "./producto.model.js";

// RELACIÓN VENTA → ITEMS
Venta.hasMany(VentaItem, { as: "items", foreignKey: "ventaId" });
VentaItem.belongsTo(Venta, { foreignKey: "ventaId" });

// RELACIÓN PRODUCTO → ITEMS
Producto.hasMany(VentaItem, { foreignKey: "productoId" });
VentaItem.belongsTo(Producto, { foreignKey: "productoId" });

Producto.belongsToMany(Venta, {
  through: VentaItem,
  foreignKey: "productoId",
  otherKey: "ventaId"
});

Venta.belongsToMany(Producto, {
  through: VentaItem,
  foreignKey: "ventaId",
  otherKey: "productoId"
});

export { Venta, VentaItem, Producto };