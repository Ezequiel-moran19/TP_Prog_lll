const API = "http://localhost:3000";
export async function guardarTicket(ticket) {
  const res = await fetch(`${API}/api/ticket`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ticket)
  });

  if (!res.ok) throw new Error("Error guardando ticket");

  return await res.json();
}