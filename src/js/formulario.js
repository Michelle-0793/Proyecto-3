import { postSolicitud, postSolicitudHistorial, postSolicitudAceptadas } from "../servicios/postSolicitud";
import { getSolicitud, getSolicitudById } from "../servicios/getSolicitud";
import { deleteSolicitud } from "../servicios/deleteSolicitud";
//import { getUsers } from "../servicios/getUsuarios";


//1 DECLARAR VARIABLES DEL DOM
const cedula = document.getElementById("cedula");
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
const urlAceptadas = "http://localhost:3001/solicitudesAceptadas"

// Prellenar el campo de cédula con el valor guardado en localStorage
function prellenarFormulario() {
    const usuarioDatos = JSON.parse(localStorage.getItem("usuarioDatos"));
    if (usuarioDatos && usuarioDatos.cedula) {
        // Prellenar el campo de cedula del usuario
        cedula.value = usuarioDatos.cedula;
    }
}

// Llamar a la función para prellenar el formulario cuando se carga la página
window.addEventListener("load", prellenarFormulario);


//2 FUNCIONES AUXILIARES
// Función para renderizar solicitudes en la tabla
function renderizarSolicitudes(solicitudes) {
    const usuarioDatos = JSON.parse(localStorage.getItem("usuarioDatos"));
    const selectRol = usuarioDatos ? usuarioDatos.rol : ""; // Extraer el rol con un operador ternario,

    solicitudes.forEach(solicitud => {
        // Fila para cada solicitud
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${solicitud.cedulaUsuario}</td>
            <td>${solicitud.codigoComputadora}</td>
            <td>${solicitud.sede}</td>
            <td>${solicitud.fechaSalida}</td>
            <td>${solicitud.fechaRegreso}</td>
            <td>${solicitud.estado || "Pendiente"}</td>
        `;

//Condicional para administrador
if (selectRol === "Administrador") {    
        //Celdas con los botones
        const celdaBotones = document.createElement("td");

        // Botón para aceptar la solicitud
        const btnAceptar = document.createElement("button");
        btnAceptar.classList.add("btnAceptar"); //clase para el btn
        btnAceptar.textContent = "Aceptar";
        btnAceptar.addEventListener('click', () => aceptarSolicitud(solicitud.id));

        // Botón para rechazar la solicitud
        const btnRechazar = document.createElement("button");
        btnRechazar.classList.add("btnRechazar"); //clase para el btn
        btnRechazar.textContent = "Rechazar";
        btnRechazar.addEventListener('click', () => rechazarSolicitud(solicitud.id));

        // Agregar botones a la celda
        celdaBotones.appendChild(btnAceptar);
        celdaBotones.appendChild( btnRechazar);

        // Añadir la celda de botones a la fila
        fila.appendChild(celdaBotones);
}
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
    if (!cedula.value || !codigoComputadora.value || !sede.value || !fechaSalida.value || !fechaRegreso.value) {
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
        cedulaUsuario: cedula.value,
        codigoComputadora: codigoComputadora.value,
        sede: sede.value,
        fechaSalida: fechaSalida.value,
        fechaRegreso: fechaRegreso.value,
        estado:"Pendiente"
    };

   
// Enviar la nueva solicitud usando postSolicitud
    await postSolicitud(nuevaSolicitud);
    Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Solcitud enviada con éxito",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
            popup: "modalSolicitud"
        }
    });
    
    console.log(nuevaSolicitud);  
    cargarSolicitudes()

// Limpiar los campos del formulario
    codigoComputadora.value = "";
    sede.value = "";
    fechaSalida.value = "";
    fechaRegreso.value = "";
    terminosCondiciones.checked = false;
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
    await postSolicitud(solicitud, urlHistorial, urlAceptadas);
}

//EVENTO DE LOS BOTONES
// Función "Ver historial"
function verHistorial() {
    window.location.href = 'historial.html';
}

btnHistorial.addEventListener("click", verHistorial);


btnEnviar.addEventListener("click", enviarSolicitud);



