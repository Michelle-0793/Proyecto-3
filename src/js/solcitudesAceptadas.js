import { getSolicitudesAceptadas } from "../servicios/getSolicitud";
import { deleteSolicitudesAceptadas } from "../servicios/deleteSolicitud";

const cuerpoTablaHistorial = document.getElementById("cuerpoTablaHistorial");
const btnEliminar = document.getElementById("btnEliminar");

// Función para cargar el historial
async function cargarHistorial() {
    const historial = await getSolicitudesAceptadas(); // Obtener solicitudes aceptadas
    console.log(historial);
    cuerpoTablaHistorial.innerHTML = ""; // Limpiar el contenido actual
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
const usuarioDatos = JSON.parse(localStorage.getItem("usuarioDatos"));
const selectRol = usuarioDatos ? usuarioDatos.rol : ""; // Extraer el rol con un operador ternario,

if (selectRol==="Administrador") {
   // Función para eliminar el historial
async function eliminarHistorial() {
    const result = await Swal.fire({
        title: "¿Estás seguro de que quieres eliminar todo el historial?",
        text: "No podrás revertir esto",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#04082c",
        cancelButtonColor: "#1D0C17",
        confirmButtonText: "¡Sí, eliminar!",
        customClass: {
            popup: "modalEliminar"
        }
    });
    if (result.isConfirmed) {
        Swal.fire({
            title: "¡Eliminado!",
            text: "El historial ha sido eliminado.",
            icon: "success",
            confirmButtonColor: "#04082c",
            customClass: {
                popup: "modalEliminado"
            }
            
        });
        await deleteSolicitudesAceptadas(); // Llamar a la función para eliminar el historial
        cargarHistorial(); // Recargar el historial para reflejar los cambios
    } 
}


// Evento al botón de eliminar
btnEliminar.addEventListener("click", eliminarHistorial);

}

// Cargar el historial al cargar la página
cargarHistorial();


