import { getUsers } from "../services/getUsuarios"
import { postUsers } from "../services/postUsuarios"

const nombre = document.getElementById("nombre")
const cedula = document.getElementById("cedula")
const email = document.getElementById("email")
const contrasena = document.getElementById("contrasena")
const seleccionar = document.getElementById("seleccionar")
const btnRegistrar = document.getElementById("btnRegistrar")
const mensaje = document.getElementById("mensaje")

btnRegistrar.addEventListener("click", function () {

 crearUsuario ()

  async function crearUsuario() {
    
    const nombreUsuario = nombre.value
    const cedulaUsuario = cedula.value
    const emailUsuario = email.value
    const contrasenaUsuario = contrasena.value
    const seleccionarUsuario = seleccionar.value



    

    if (!nombreUsuario || !cedulaUsuario || !emailUsuario || !contrasenaUsuario || !seleccionarUsuario) {
       mensaje.textContent = "Debe llenar todos los campos";
      
     }else{

          
     nombre.value = "";
     cedula.value = "";
     email.value = "";
     contrasena.value = "";
     seleccionar.value = "";

 
     let cedulaExistente=[]
    
     const usuarios = await getUsers();
     cedulaExistente = usuarios.filter(user => user.cedula === cedulaUsuario);
  

   
     if (cedulaExistente.cedula===cedulaUsuario ) {
        mensaje.textContent = "¡La cédula ya está registrada!";
      
  
      }else{

       const response = await postUsers(nombreUsuario,cedulaUsuario, emailUsuario, contrasenaUsuario, seleccionarUsuario);
      
       window.location.href = "login.html"
   
      }
    }
  }
})

