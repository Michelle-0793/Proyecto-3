import { postSolicitud } from "../servicios/postSolicitud";
import { getSolicitud } from "../servicios/getSolicitud";


const nombre = document.getElementById("nombre");
const codigoComputadora = document.getElementById("codigoComputadora");
const sede = document.getElementById("sede");
const fechaSalida = document.getElementById("fechaSalida");
const fechaRegreso = document.getElementById("fechaRegreso");
const terminosCondiciones = document.getElementById("terminosCondiciones");
const btnEnviar = document.getElementById("btnEnviar");
const btnHistorial = document.getElementById("btnHistorial");
const mensaje = document.getElementById("mensaje");


// Función para manejar el evento click del botón "Enviar"
async function enviarSolicitud() {

// Validar que todos los campos estén llenos
    if (!nombre.value || !codigoComputadora.value || !sede.value || !fechaSalida.value || !fechaRegreso.value) {
        mensaje.textContent = "Por favor, complete todos los campos";
        return;
    }

// Validar que se hayan aceptado los términos y condiciones
    if (!terminosCondiciones.checked) {
        mensaje.textContent = "Acepte los términos y condiciones";
        return;
    }

//Obtener las solicitudes existentes
const solicitudes = await getSolicitud();

// Nueva solicitud con los datos del formulario
const nuevaSolicitud = {
    nombreUsuario: nombre.value,
    codigoComputadora: codigoComputadora.value,
    sede: sede.value,
    fechaSalida: fechaSalida.value,
    fechaRegreso: fechaRegreso.value,
    };

// Limpiar los campos
nombre.value = "";
codigoComputadora.value = "";
sede.value = "";
fechaSalida.value = "";
fechaRegreso.value = "";

// Enviar la nueva solicitud usando postSolicitudes
    const response = await postSolicitud(nuevaSolicitud);
    mensaje.textContent = "Solicitud enviada exitosamente";

}
// Función para manejar el evento click del botón "Ver historial"
async function verHistorial() {
    window.location.href = 'historial.html';
}


// Asignar la función al evento click del botón
btnEnviar.addEventListener("click", enviarSolicitud);

// Asignar la función al evento click del botón "Ver historial"
btnHistorial.addEventListener("click", verHistorial);