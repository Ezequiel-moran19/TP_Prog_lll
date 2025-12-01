const API = "http://localhost:3000";
export async function guardarTicketBD(ventas) {
    await fetch(`${API}/api/ventas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ventas)
    });
}
