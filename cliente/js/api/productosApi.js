const API = "http://localhost:3000";

export async function obtenerProductos() { 
  try {
      const res = await fetch(`${API}/api/productos`);
      const data = await res.json();
      return data.body;
  } catch (error) {
      console.error("Error al obtener productos desde la API:", error);
      return [];
  }
}

export const eliminarProducto = async (id) => {
  await fetch(`${API}/api/productos/${id}`, { method: "DELETE" });
};

export const actualizarEstadoProducto = async (id, estado) => {
  await fetch(`${API}/api/productos/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ estado })
  });
};