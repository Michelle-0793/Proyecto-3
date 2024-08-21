import { getUsers } from "../services/getUsuarios"
import { postUsers } from "../services/postUsuarios"

const nombre = document.getElementById("nombre")
const cedula = document.getElementById("cedula")
const email = document.getElementById("email")
const contrasena = document.getElementById("contrasena")
const codigo = document.getElementById("codigo")
const btnRegistrar = document.getElementById("btnRegistrar")

btnRegistrar.addEventListener("click", function () {

 crearUsuario ()

  async function crearUsuario() {
    
    const nombreUsuario = nombre.value
    const cedulaUsuario = cedula.value
    const emailUsuario = email.value
    const contrasenaUsuario = contrasena.value
    const codigoUsuario = codigo.value


    if (!nombreUsuario || !cedulaUsuario || !emailUsuario || !contrasenaUsuario || !codigoUsuario) {
       mensaje.textContent = "Debe llenar todos los campos";
      
    }else{

          
    nombre.value = "";
    cedula.value = "";
    email.value = "";
    contrasena.value = "";
    codigo.value = "";

   const usuarios = await getUsers();
   const cedulaExistente = usuarios.find(user => user.cedula === cedulaUsuario);
  
   console.log(cedulaExistente);
   
   if (cedulaExistente) {
      mensaje.textContent = "La cédula ya está registrada";
      
  
    }else{

     const response = await postUsers(nombreUsuario,cedulaUsuario, emailUsuario, contrasenaUsuario, codigoUsuario);
      mensaje.textContent = "Usuario agregado exitosamente"
   
    }
  }

    }
})

