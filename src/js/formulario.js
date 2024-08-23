import { postSolicitud, postSolicitudAceptadas } from "../servicios/postSolicitud";
import { postSolicitudHistorial } from "../servicios/postSolicitud";
import { getSolicitud } from "../servicios/getSolicitud";
import { updateSolicitud} from "../servicios/updateSolicitud";
import { deleteSolicitud } from "../servicios/deleteSolicitud";

import { getSolicitudById } from "../servicios/getSolicitud";


//1 DECLARAR VARIABLES DEL DOM
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

const urlHistorial = "http://localhost:3001/historial"

// Simulación de login - Prellenar campos con un valor para hacer pruebas
function simularLogin() {
    const nombreUsuarioPlaceholder = "UsuarioTest"; //Nombre para testeo
    //Valores para al campo nombre
    nombre.value = nombreUsuarioPlaceholder;
    localStorage.setItem('nombreUsuario', nombreUsuarioPlaceholder);
}
// Llamar a la simulación de login
simularLogin();



//2 FUNCIONES AUXILIARES
// Función para renderizar solicitudes en la tabla
function renderizarSolicitudes(solicitudes) {
    solicitudes.forEach(solicitud => {
        // Fila para cada solicitud
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${solicitud.nombreUsuario}</td>
            <td>${solicitud.codigoComputadora}</td>
            <td>${solicitud.sede}</td>
            <td>${solicitud.fechaSalida}</td>
            <td>${solicitud.fechaRegreso}</td>
            <td>${solicitud.estado || "Pendiente"}</td>
        `;
        //Celdas con los botones
        const celdaBotones = document.createElement("td");

        // Botón para aceptar la solicitud
        const btnAceptar = document.createElement("button");
        btnAceptar.textContent = "Aceptar";
        btnAceptar.addEventListener('click', () => aceptarSolicitud(solicitud.id));

        // Botón para rechazar la solicitud
        const btnRechazar = document.createElement("button");
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

cargarSolicitudes()

//3 FUNCIONES PRINCIPALES

// Función para obtener y mostrar solicitudes
async function cargarSolicitudes() {
    // Obtengo las solicitudes
    const solicitud = await getSolicitud();
    // Limpio el cuerpo de la tabla antes de renderizar nuevas solicitudes
    cuerpoTabla.innerHTML = "";

    // Renderizar las solicitudes en la tabla
    renderizarSolicitudes(solicitud);
}


// Función "Enviar"
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
        fechaRegreso: fechaRegreso.value,
        estado:"Pendiente"
    };

   
// Enviar la nueva solicitud usando postSolicitud
    await postSolicitud(nuevaSolicitud);
    mensaje.textContent = "Solicitud enviada exitosamente";
    console.log(nuevaSolicitud);  
    cargarSolicitudes()

// Limpiar los campos del formulario
    nombre.value = "";
    codigoComputadora.value = "";
    sede.value = "";
    fechaSalida.value = "";
    fechaRegreso.value = "";
}

//ACEPTAR SOLICITUD
async function aceptarSolicitud(idSolicitud) {

    console.log(idSolicitud);
    
    let solicitud = await getSolicitudById(idSolicitud);
    solicitud.estado = "Aceptada";

    console.log(solicitud);
    
    await postSolicitudHistorial(solicitud); // Mueve la solicitud al historial
    await postSolicitudAceptadas (solicitud); // Mueve la solicitud a aceptadas
    await deleteSolicitud(idSolicitud); // Elimina la solicitud del formulario
    cargarSolicitudes(); // Recarga la lista de solicitudes
}

//RECHAZAR SOLICITUD
async function rechazarSolicitud(idSolicitud) {

    console.log(idSolicitud);

    let solicitud = await getSolicitudById(idSolicitud);
    solicitud.estado = "Rechazada";

    console.log(solicitud);

    await postSolicitudHistorial(solicitud); // Mueve la solicitud al historial
    await deleteSolicitud(idSolicitud); // Elimina la solicitud del formulario
    cargarSolicitudes(); // Recarga la lista de solicitudes
}


//ENVIAR AL HISTORIAL
async function moverSolicitudAlHistorial(solicitud) {
    delete solicitud.id; // Se elimina el ID para que no se duplique en el historial
    await postSolicitud(solicitud, urlHistorial);
}

//EVENTO DE LOS BOTONES
// Función "Ver historial"
function verHistorial() {
    window.location.href = 'historial.html';
}

btnHistorial.addEventListener("click", verHistorial);


btnEnviar.addEventListener("click", enviarSolicitud);


