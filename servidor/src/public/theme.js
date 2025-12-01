export function inicializarModoOscuro() {
  const btnDark = document.getElementById("modo-oscuro");
  if (!btnDark) return;

  const icon = document.getElementById("icono-modo");
  const body = document.body;

  const modoActual = localStorage.getItem("modo") || "claro";
  if (modoActual === "oscuro") {
    body.classList.add("modo-oscuro");
    actualizarIcono(icon, true);
  } else {
    actualizarIcono(icon, false);
  }

  btnDark.addEventListener("click", () => {
    const esOscuro = body.classList.toggle("modo-oscuro");
    localStorage.setItem("modo", esOscuro ? "oscuro" : "claro");
    actualizarIcono(icon, esOscuro);
  });
}

function actualizarIcono(icon, esOscuro) {
  icon.className = esOscuro ? "bi bi-sun-fill" : "bi bi-moon-fill";
}
inicializarModoOscuro()