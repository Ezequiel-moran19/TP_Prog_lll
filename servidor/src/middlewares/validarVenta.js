export function validarVenta(req, res, next) {
    const { fecha, nombreCliente, total, productos } = req.body;

    if (!fecha || !nombreCliente || !total || !productos) {
        return res.status(400).json({ error: "Datos incompletos para crear venta" });
    }

    if (!Array.isArray(productos) || productos.length === 0) {
        return res.status(400).json({ error: "Debe haber al menos un producto" });
    }

    for (const p of productos) {
        if (!p.id || !p.cantidad || p.cantidad <= 0) {
            return res.status(400).json({ error: "Producto inválido en la venta" });
        }
    }

    next();
}
