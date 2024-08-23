import { getHistorial } from "../servicios/getSolicitud";

const cuerpoTablaHistorial = document.getElementById("cuerpoTablaHistorial");

async function cargarHistorial() {
    const historial = await getHistorial();
    console.log(historial);
    cuerpoTablaHistorial.innerHTML = '';
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

// Función para obtener y mostrar solicitudes
async function cargarSolicitudes() {
    const solicitudesHistorial = await getHistorial();
}

// Cargar solicitudes al inicio
cargarSolicitudes();
