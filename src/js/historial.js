import { getSolicitud } from "../servicios/getSolicitud";
import { putSolicitud } from "../servicios/updateSolicitud";
import { deleteSolicitud } from "../servicios/deleteSolicitud";


const tablaSolicitudes = document.getElementById("tablaSolicitudes");
const cuerpoTabla = document.getElementById("cuerpoTabla");
const busqueda = document.getElementById("busqueda");
const btnBuscar = document.getElementById("btnBuscar");

// Función para renderizar solicitudes en la tabla
function renderizarSolicitudes(solicitudes) {
    solicitudes.forEach(solicitud => {
        // Crear la fila para cada solicitud
        const fila = document.createElement('tr');

        fila.innerHTML = `
            <td>${solicitud.nombreUsuario}</td>
            <td>${solicitud.codigoComputadora}</td>
            <td>${solicitud.sede}</td>
            <td>${solicitud.fechaSalida}</td>
            <td>${solicitud.fechaRegreso}</td>
        `;
    });
}

// Función para obtener y mostrar solicitudes
async function cargarSolicitudes() {

    const solicitudesHistorial = await getSolicitud();
    cuerpoTabla.innerHTML="";
    renderizarSolicitudes(solicitudesHistorial);
}

cargarSolicitudes()