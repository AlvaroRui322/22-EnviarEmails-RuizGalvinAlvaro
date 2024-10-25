document.addEventListener('DOMContentLoaded', () => {
    // Selectores
    const inputEmail = document.querySelector("#email");
    const inputAsunto = document.querySelector("#asunto");
    const inputMensaje = document.querySelector("#mensaje");
    const inputCC = document.querySelector("#CC");
    const formulario = document.querySelector("#formulario");
    const btnSubmit = document.querySelector(`#formulario button[type="submit"]`);
    const btnReset = document.querySelector(`#formulario button[type="reset"]`);
    const spinner = document.querySelector("#spinner");

    // Objeto para almacenar el contenido del formulario
    const emailObj = {
        email: "",
        asunto: "",
        mensaje: ""
    };

    // Listeners
    inputEmail.addEventListener("blur", validar);
    inputAsunto.addEventListener("blur", validar);
    inputMensaje.addEventListener("blur", validar);
    btnReset.addEventListener("click", (e) => {
        e.preventDefault();
        resetearFormulario();
    });

    formulario.addEventListener("submit", (e) => {
        activarSpinner(e);
    });

    // Funciones
    function validar(e) {
        if (e.target.value.trim() === "") {
            const mensaje = `El campo ${e.target.id} es obligatorio`;
            mostrarAlerta(mensaje, e.target.parentElement);
            comprobarEmail();
            return;
        }
        if (e.target.id === "email" && !validarEmail(e.target.value)) {
            mostrarAlerta("Email no válido", e.target.parentElement);
            comprobarEmail();
            return;
        }
        limpiarAlerta(e.target.parentElement);
        emailObj[e.target.name] = e.target.value.trim().toLowerCase();
        comprobarEmail();
    }

    function mostrarAlerta(mensaje, referencia) {
        limpiarAlerta(referencia);
        const error = document.createElement("P");
        error.textContent = mensaje;  // Usar el mensaje pasado
        error.classList.add("bg-red-600", "text-center", "text-white", "p-2");
        referencia.appendChild(error); // Añadir el mensaje a la referencia correcta
    }

    function limpiarAlerta(referencia) {
        const alerta = referencia.querySelector(".bg-red-600");
        if (alerta) {
            alerta.remove();
        }
    }

    function validarEmail(email) {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    }

    // Comprobamos si podemos habilitar el botón
    function comprobarEmail() {
        const values = Object.values(emailObj);
        if (values.includes("")) {
            btnSubmit.classList.add("opacity-50");
            btnSubmit.disabled = true;  // Cambiar a 'disabled'
        } else {
            btnSubmit.classList.remove("opacity-50");
            btnSubmit.disabled = false;  // Cambiar a 'disabled'
        }
    }

    function activarSpinner(e) {
        e.preventDefault();
        spinner.classList.remove("hidden"); // Activa el spinner

        setTimeout(() => {
            spinner.classList.add("hidden");
            resetearFormulario();

            // Mostrar mensaje de éxito después de restablecer el formulario
            const alerta = document.createElement("p");
            alerta.classList.add("bg-green-500", "p-2", "rounded-lg", "text-sm", "uppercase", "mt-10", "text-white", "text-center", "font-bold");
            alerta.textContent = "El mensaje se ha enviado con éxito";
            formulario.appendChild(alerta);
        }, 3000);
    }

    function resetearFormulario() {
        emailObj.email = "";
        emailObj.asunto = "";
        emailObj.mensaje = "";

        formulario.reset();
        comprobarEmail();

        while (formulario.querySelector(".bg-red-600")) {
            limpiarAlerta(formulario);
        }
    }
});
