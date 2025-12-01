function cerrarSesion() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/pages/bienvenida.html";
}
