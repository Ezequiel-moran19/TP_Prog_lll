import { Persona } from "../models/Personas.js";
import { PersonaView } from "../views/personaView.js";

export class PersonaController {

    static init() {
        const view = new PersonaView("form", "#fNombre", "#saludo");
        const nombre = Persona.obtenerNombre();
        const esBienvenida = window.location.pathname.includes("bienvenida.html");

        if (nombre && esBienvenida) return window.location.href = "/pages/productos.html";
        if (!nombre && !esBienvenida) return window.location.href = "/pages/bienvenida.html";

        if (nombre) {
            view.mostrarSaludo(nombre);
            view.ocultarFormulario();
            return;
        }

        view.escucharSubmit((nombreIngresado) => {
            if (!Persona.validar(nombreIngresado)) {
                view.mostrarAlerta("Por favor, ingrese su nombre");
                return;
            }

            Persona.guardarNombre(nombreIngresado);
            view.mostrarSaludo(nombreIngresado);
            view.ocultarFormulario();

            setTimeout(() => { window.location.href = "/pages/productos.html"; }, 500);
        });
    }

    static cerrarSesion() {
        const nombre = Persona.obtenerNombre();
        Persona.borrarNombre();

        if (nombre) sessionStorage.removeItem(`Carrito_${nombre}`);
        sessionStorage.removeItem("carrito");

        window.location.href = "/pages/bienvenida.html";
    }

    static verificarSesion() {
        if (!Persona.obtenerNombre()) {
            window.location.href = "/pages/bienvenida.html";
            return false;
        }
        return true;
    }
}
