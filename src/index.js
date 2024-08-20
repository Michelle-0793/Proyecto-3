// Inserte el código aquí
const reloj = document.getElementById("reloj");

function actualizarHora() {
    const ahora = new Date(); // Obtiene la hora actual
    const horaFormateada = ahora.toLocaleTimeString(); // Formatea la hora a un string legible
    reloj.textContent = horaFormateada; // Actualiza el contenido del elemento con id 'reloj'
}

// Llama a la función actualizarHora cada segundo
setInterval(actualizarHora, 1000);

// Llama a la función una vez al cargar la página para mostrar la hora inmediatamente
actualizarHora();

// Importar la función GetUsers desde el archivo getUsers.js en la carpeta servicios
import { GetUsers } from "./servicios/getUsers";

// Obtener una referencia al elemento del DOM con el id "mostrarNombre"
let mostrarNombre = document.getElementById("mostrarNombre");

// Llamara la función asíncrona resolverPromesa para iniciar el proceso de obtención de usuarios
resolverPromesa();

async function resolverPromesa() {// Definir una función asíncrona llamada resolverPromesa
    // Esperar la resolución de la promesa devuelta por GetUsers y guardar los datos en la variable infoUsers
    let infoUsers = await GetUsers();
    // Imprimir los datos obtenidos en la consola para verificar que se han recibido correctamente
    console.log(infoUsers);
}


