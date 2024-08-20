// Importar la función GetUsers desde el archivo getUsers.js en la carpeta servicios
import { GetUsers } from "../servicios/getUsers";

import { postUsers } from "../servicios/postUsers";

import { updateUsers } from "../servicios/updateUsers";

const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const btnCrear = document.getElementById("crear");


btnCrear.addEventListener("click", function () {
    let nombreUsuario = nombre.value
    let apellidoUsuario = apellido.value

    postUsers(nombreUsuario, apellidoUsuario);
    
    
  
})
//updateUsers(nombreUsuario, apellidoUsuario, id);