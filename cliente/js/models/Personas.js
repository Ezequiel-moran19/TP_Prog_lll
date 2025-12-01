export class Persona { 
    constructor(idPersona, nombre) {
        this.idPersona = idPersona;
        this.nombre = nombre;
    }

    static guardarNombre(nombre) {
        sessionStorage.setItem("nombreUsuario", nombre);
        sessionStorage.setItem("sesionActiva", "true");
    }

    static obtenerNombre() {
        if (sessionStorage.getItem("sesionActiva") !== "true") return null;
        return sessionStorage.getItem("nombreUsuario");
    }

    static borrarNombre() {
        sessionStorage.removeItem("nombreUsuario");
        sessionStorage.removeItem("sesionActiva");
    }

    static validar(nombre) {
        return nombre.trim() !== "";
    }
}
