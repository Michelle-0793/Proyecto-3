import { getHistorial } from "../servicios/getSolicitud";

const cuerpoTablaHistorial = document.getElementById("cuerpoTablaHistorial");

async function cargarHistorial() {
    const historial = await getHistorial(); // Obtener historial
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