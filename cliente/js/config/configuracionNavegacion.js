import { PersonaController } from "../controllers/PersonaController.js";
import { Persona } from "../models/Personas.js";

export class ConfiguradorNavegacion {

    static configurar() {

        // botón inicio / salir según situación
        document.querySelectorAll('a[href="./bienvenida.html"]').forEach(link => {

            link.addEventListener("click", (e) => {
                e.preventDefault();

                const usuario = Persona.obtenerNombre();

                // si hay usuario → cerrar sesión
                if (usuario) {
                    PersonaController.cerrarSesion();
                    return;
                }

                // si no hay → ir a bienvenida
                window.location.href = "bienvenida.html";
            });
        });

        // botón ir a productos si hay sesión
        document.querySelectorAll('a[href="./productos.html"]').forEach(link => {
            link.addEventListener("click", (e) => {
                e.preventDefault();

                const usuario = Persona.obtenerNombre();
                window.location.href = usuario ? "productos.html" : "bienvenida.html";
            });
        });

    }
}
