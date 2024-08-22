import { getUsers } from "../services/getUsuarios"

const cedula = document.getElementById("cedula")
const contrasena = document.getElementById("contrasena")
const btnLogin = document.getElementById("btnLogin")

btnLogin.addEventListener("click", function () {

 validarUsuario()

    async function validarUsuario() {
     const lista = await getUsers()

        for (let index = 0; index < lista.length; index++) {
   
           if (lista[index].cedula === cedula.value && lista[index].contrasena === contrasena.value) {
             let usuarioDatos = lista [index].nombre
             localStorage.setItem("usuarioDatos", (usuarioDatos))
             console.log("Usuario registrado")
             window.location.href = "Registro.html"

            }else{
             console.log("Usuario no registrado")
            }
    
         }

    
    }
    
})

