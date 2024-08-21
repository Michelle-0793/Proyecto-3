import { getSolicitud } from "../servicios/getSolicitud";
import { putSolicitud } from "../servicios/putSolicitud";
import { deleteSolicitud } from "../servicios/deleteSolicitud";


const tablaSolicitudes = document.getElementById("tablaSolicitudes");
const cuerpoTabla = document.getElementById("cuerpoTabla");
const busqueda = document.getElementById("busqueda");
const btnBuscar = document.getElementById("btnBuscar");

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
                <button onclick="editarSolicitud('${solicitud.id}')">Rechazar</button>
                <button onclick="eliminarSolicitud('${solicitud.id}')">Rechazar</button>
            </td>
        </tr>
    `);
    
    cuerpoTabla.innerHTML = filas.join('');
}

// Función para obtener y mostrar solicitudes
async function cargarSolicitudes() {
    const solicitudes = await getSolicitud();
    renderizarSolicitudes(solicitudes);
}

// Función para eliminar solicitud
async function eliminarSolicitud(id) {
    await deleteSolicitud(id);
    cargarSolicitudes(); // Volver a cargar solicitudes después de eliminar
}

cargarSolicitudes()