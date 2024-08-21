import { getUsers } from "../services/getUsuarios"

const cedula = document.getElementById("cedula")
const contraseña = document.getElementById("contraseña")
const btnLogin = document.getElementById("btnLogin")

btnLogin.addEventListener("click", function () {

 validarUsuario()

  async function validarUsuario() {
  const lista = await getUsers()
  for (let index = 0; index < lista.length; index++) {
    
    
  }

    
 }
    
})

