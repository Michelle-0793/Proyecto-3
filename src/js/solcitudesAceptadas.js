import { getSolicitudesAceptadas} from "../servicios/getSolicitud";

const cuerpoTablaHistorial = document.getElementById("cuerpoTablaHistorial");

async function cargarHistorial() {
    const historial = await getSolicitudesAceptadas(); // Obtener de aceptdas
    console.log(historial);
    cuerpoTablaHistorial.innerHTML = "";
    historial.forEach(solicitud => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${solicitud.cedulaUsuario}</td>
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