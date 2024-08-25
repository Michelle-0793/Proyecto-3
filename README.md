# Proyecto-3
Sistema de Permisos para Uso de Computadoras Académicas
1. Registro: Un usuario se registra proporcionando su nombre, cédula, email, contraseña y rol. Los datos se validan, se guarda el usuario en el servidor y en localStorage, y se redirige al login.

2. Login: El usuario ingresa su cédula y contraseña. Si coinciden con los datos en el servidor, se guarda su nombre y rol en localStorage y se redirige al formulario de solicitud.

3. Formulario de Solicitud: El usuario (con la cédula prellenada) solicita el uso de una computadora, completando detalles como sede, fechas y términos. La solicitud se envía y se muestra en una tabla.

4. Gestión de Solicitudes: Los administradores pueden aceptar o rechazar solicitudes, moviéndolas al historial o a solicitudes aceptadas, y eliminándolas del formulario principal.

5. Historial y Solicitudes Aceptadas: Los usuarios pueden ver el historial de solicitudes y las solicitudes aceptadas, navegando entre las diferentes vistas.