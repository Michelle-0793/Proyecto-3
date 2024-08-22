import { postSolicitud } from "../servicios/postSolicitud";
import { getSolicitud } from "../servicios/getSolicitud";
import { updateSolicitud } from "../servicios/updateSolicitud";

// Obtener referencias a los elementos del DOM
const nombre = document.getElementById("nombre");
const codigoComputadora = document.getElementById("codigoComputadora");
const sede = document.getElementById("sede");
const fechaSalida = document.getElementById("fechaSalida");
const fechaRegreso = document.getElementById("fechaRegreso");
const terminosCondiciones = document.getElementById("terminosCondiciones");
const btnEnviar = document.getElementById("btnEnviar");
const btnHistorial = document.getElementById("btnHistorial");
const mensaje = document.getElementById("mensaje");
const cuerpoTabla = document.getElementById("cuerpoTabla");

// Función para obtener y mostrar solicitudes
async function cargarSolicitudes() {
    const solicitudes = await getSolicitud();
    // Renderizar las solicitudes en la tabla
    renderizarSolicitudes(solicitudes);
}


//ACEPTAR SOLICITUD
// Función para manejar el evento click del botón "Aceptar"
async function aceptarSolicitud(idSolicitud) {
    const solicitudActualizada = {
        estado: "Aceptado"
    };

    const response = await updateSolicitud(idSolicitud, solicitudActualizada);
    mensaje.textContent = "Solicitud aceptada con éxito";

    // Esperar 2 segundos antes de mover al historial
    setTimeout(async () => {
        await moverSolicitudAlHistorial(solicitudActualizada);
    }, 2000);

    cargarSolicitudes(); // Recargar la lista de solicitudes
}

//RECHAZAR SOLICITUD
// Función para manejar el evento click del botón "Rechazar"
async function rechazarSolicitud(idSolicitud) {
    const solicitudActualizada = {
        estado: "Rechazado"
    };
// Enviar la solicitud actualizada con updateSolicitud
    const response = await updateSolicitud(idSolicitud, solicitudActualizada);
    mensaje.textContent = "Solicitud rechazada con éxito";   
    // Esperar 2 segundos antes de mover al historial
    setTimeout(async () => {
        await moverSolicitudAlHistorial(solicitudActualizada);
    }, 2000);

    cargarSolicitudes(); // Recargar la lista de solicitudes
}

//ENVIAR AL HISTORIAL
// Función para mover la solicitud al historial
async function moverSolicitudAlHistorial(solicitud) {
   const response = await postSolicitud(solicitud, "historial"); 
}


// Función para renderizar solicitudes en la tabla
function renderizarSolicitudes(solicitudes) {
    console.log('Datos recibidos para renderizar:', solicitudes)
    // Limpiar la tabla antes de renderizar nuevas filas
    cuerpoTabla.innerHTML = '';

    solicitudes.forEach(solicitud => {
        // Crear la fila para cada solicitud
        const fila = document.createElement('tr');

        fila.innerHTML = `
            <td>${solicitud.nombreUsuario}</td>
            <td>${solicitud.codigoComputadora}</td>
            <td>${solicitud.sede}</td>
            <td>${solicitud.fechaSalida}</td>
            <td>${solicitud.fechaRegreso}</td>
            <td>${solicitud.estado || 'Pendiente'}</td>
        `;

        // Crear las celdas con los botones
        const celdaBotones = document.createElement('td');

        // Botón para aceptar la solicitud
        const btnAceptar = document.createElement('button');
        btnAceptar .textContent = "Aceptar";
        btnAceptar.addEventListener('click', () => aceptarSolicitud(solicitud.id));

        // Botón para rechazar la solicitud
        const  btnRechazar = document.createElement('button');
        btnRechazar.textContent = "Rechazar";
        btnRechazar.addEventListener('click', () => rechazarSolicitud(solicitud.id));

        // Agregar botones a la celda
        celdaBotones.appendChild(btnAceptar);
        celdaBotones.appendChild( btnRechazar);

        // Añadir la celda de botones a la fila
        fila.appendChild(celdaBotones);

        // Añadir la fila al cuerpo de la tabla
        cuerpoTabla.appendChild(fila);
    });
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

    // Crear un objeto con los datos de la nueva solicitud
    const nuevaSolicitud = {
        nombreUsuario: nombre.value,
        codigoComputadora: codigoComputadora.value,
        sede: sede.value,
        fechaSalida: fechaSalida.value,
        fechaRegreso: fechaRegreso.value
    };

// Limpiar los campos del formulario
    nombre.value = "";
    codigoComputadora.value = "";
    sede.value = "";
    fechaSalida.value = "";
    fechaRegreso.value = "";

    // Enviar la nueva solicitud usando postSolicitud
    const response = await postSolicitud(nuevaSolicitud);
    mensaje.textContent = "Solicitud enviada exitosamente";
    
    // Recargar las solicitudes para ver la nueva solicitud
    cargarSolicitudes();
}

// Función para manejar el evento click del botón "Ver historial"
function verHistorial() {
    window.location.href = 'historial.html';
}
// Asignar la función al evento click del botón "Ver historial"
btnHistorial.addEventListener("click", verHistorial);

// Asignar la función al evento click del botón "Enviar"
btnEnviar.addEventListener("click", enviarSolicitud);


// Cargar solicitudes al cargar la página
cargarSolicitudes();

