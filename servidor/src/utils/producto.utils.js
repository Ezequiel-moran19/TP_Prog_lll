export function obtenerDatosDelBody(body, rutaImg = null) {
  const { nombre, descripcion, precio, categoria, estado, stock } = body;

  return {
    nombre,
    descripcion,
    precio: parseFloat(precio),
    categoria,
    estado: estado ?? true,
    stock: stock ? parseInt(stock) : 0,
    rutaImg,
  };
}

export function obtenerDatosActualizacion(body, producto, rutaImg) {
  return {
    nombre: body.nombre,
    descripcion: body.descripcion,
    precio: parseFloat(body.precio),
    categoria: body.categoria,
    stock: body.stock ? parseInt(body.stock) : producto.stock,
    estado: producto.estado, 
    rutaImg,
  };
}
