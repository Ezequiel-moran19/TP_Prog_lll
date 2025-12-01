export function validarProducto(req, res, next) {
    const { nombre, precio, categoria, stock } = req.body;

    if (!nombre || !precio || !categoria) {
        return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    if (precio <= 0) {
        return res.status(400).json({ error: "Precio inválido" });
    }

    if (stock < 0) {
        return res.status(400).json({ error: "Stock inválido" });
    }

    next();
}
