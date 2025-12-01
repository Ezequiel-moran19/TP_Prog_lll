export class PersonaView {
    constructor(formSelector, inputSelector, saludoSelector) {
        this.form = document.querySelector(formSelector);
        this.input = document.querySelector(inputSelector);
        this.saludo = document.querySelector(saludoSelector);
    }

    mostrarSaludo(nombre) {
        if (this.saludo) this.saludo.textContent = `¡Hola ${nombre}!`;
    }

    ocultarFormulario() {
        if (this.form) this.form.style.display = "none";
    }

    escucharSubmit(callback) {
        if (!this.form) return;
        
        this.form.addEventListener("submit", (e) => {
            e.preventDefault();
            callback(this.input.value);
        });
    }

    mostrarAlerta(mensaje) {
        alert(mensaje);
    }
}