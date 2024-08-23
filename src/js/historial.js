
import { getHistorial } from "../servicios/getSolicitud";


const cuerpoTablaHistorial = document.getElementById("cuerpoTablaHistorial");
const btnAceptadas = document.getElementById("btnAceptadas");




async function cargarHistorial() {
    const historial = await getHistorial(); // Obtener historial
    console.log( cuerpoTablaHistorial);
    cuerpoTablaHistorial.innerHTML = "";
    historial.forEach(solicitud => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${solicitud.nombreUsuario}</td>
            <td>${solicitud.codigoComputadora}</td>
            <td>${solicitud.sede}</td>
            <td>${solicitud.fechaSalida}</td>
            <td>${solicitud.fechaRegreso}</td>
            <td>${solicitud.estado || 'Pendiente'}</td>
        `;
        cuerpoTablaHistorial.appendChild(fila);
    });
}

cargarHistorial() 

function verAceptadas() {
    window.location.href = 'solcitudesAceptadas.html';
}
btnAceptadas.addEventListener("click", verAceptadas );

/*
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
    })} 

    cargarHistorial() 

// Función para obtener y mostrar solicitudes
async function cargarSolicitudes() {
    // Obtengo las solicitudes
    const solicitud = await getSolicitud();
    // Limpio el cuerpo de la tabla antes de renderizar nuevas solicitudes
    cuerpoTabla.innerHTML = "";

    // Renderizar las solicitudes en la tabla
    renderizarSolicitudes(solicitud);
}

*/