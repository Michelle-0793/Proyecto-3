import { postSolicitud } from "../servicios/postSolicitud";
import { getSolicitud } from "../servicios/getSolicitud";
import { updateSolicitud } from "../servicios/updateSolicitud";


const nombre = document.getElementById("nombre");
const codigoComputadora = document.getElementById("codigoComputadora");
const sede = document.getElementById("sede");
const fechaSalida = document.getElementById("fechaSalida");
const fechaRegreso = document.getElementById("fechaRegreso");
const terminosCondiciones = document.getElementById("terminosCondiciones");
const btnEnviar = document.getElementById("btnEnviar");
const btnHistorial = document.getElementById("btnHistorial");
const mensaje = document.getElementById("mensaje");
const tablaSolicitudes = document.getElementById("tablaSolicitudes");
const cuerpoTabla = document.getElementById("cuerpoTabla");

// Función para obtener y mostrar solicitudes
async function cargarSolicitudes() {
    const solicitudes = await getSolicitud();
    renderizarSolicitudes(solicitudes);
}
cargarSolicitudes() 

// Función para manejar el evento click del botón "Aceptar"
async function aceptarSolicitud (idSolicitud) {
    //Objeto con el nuevo estado de la solicitud
           const solicitudActualizada = {
            estado: "Aceptado"
        }

// Enviar la nueva solicitud usando postSolicitudes
const response = await updateSolicitud (idSolicitud, solicitudActualizada);

cargarSolicitudes()

mensaje.textContent = "Solicitud aceptada con éxito";
}      


// Función para renderizar solicitudes en la tabla
function renderizarSolicitudes(solicitudes) {
    const filas = solicitudes.map(solicitud => `
        <tr>
            <td>${solicitud.nombreUsuario}</td>
            <td>${solicitud.codigoComputadora}</td>
            <td>${solicitud.sede}</td>
            <td>${solicitud.fechaSalida}</td>
            <td>${solicitud.fechaRegreso}</td>
            <td>${solicitud.estado || 'Pendiente'}</td>
            <td>
                <button onclick="rechazarSolicitud('${solicitud.id}')">Rechazar</button>
                <button onclick="aceptarSolicitud('${solicitud.id}')">Aceptar</button>
            </td>
        </tr>
    `);
    
    cuerpoTabla.innerHTML = filas.join('');
}


// Función para manejar el evento click del botón "Enviar"
async function enviarSolicitud() {
// Validar que todos los campos estén llenos
    if (!nombre.value || !codigoComputadora.value || !sede.value || !fechaSalida.value || !fechaRegreso.value) {
        mensaje.textContent = "Por favor, complete todos los campos";
        return;
    }

// Validar que se hayan aceptado los términos y condiciones
    if (!terminosCondiciones.checked) {
        mensaje.textContent = "Debe aceptar los términos y condiciones";
        return;
    }

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
const response = await postSolicitud (nuevaSolicitud);
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
