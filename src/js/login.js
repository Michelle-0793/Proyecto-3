import { getUsers } from "../services/getUsuarios"

const cedula = document.getElementById("cedula")
const contrasena = document.getElementById("contrasena")
const btnLogin = document.getElementById("btnLogin")
const mensaje = document.getElementById("mensaje")

btnLogin.addEventListener("click", function () {

 validarUsuario()

    async function validarUsuario() {
     const lista = await getUsers()

        for (let index = 0; index < lista.length; index++) {
   
           if (lista[index].cedula === cedula.value && lista[index].contrasena === contrasena.value) {
             let usuarioDatos = lista [index].nombre
             localStorage.setItem("usuarioDatos",(usuarioDatos))
             mensaje.textContent = "¡Usuario registrado!";
             window.location.href = "registrarse.html"

            }else{
             mensaje.textContent = "¡Usuario no registrado!";
            }
    
         }

    
    }
    
})

