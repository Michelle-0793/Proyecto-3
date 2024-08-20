async function GetUsers() {
    try {
        // Realiza una solicitud GET a la URL especificada
        const response = await fetch('http://localhost:3001/users', {
            method: 'GET', // Especifica que se está utilizando el método GET
            headers: {
                'Content-Type': 'application/json' // Indica que se espera una respuesta en formato JSON
            }
        });

        // Espera la respuesta en formato JSON
        const data = await response.json();
        // Retorna los datos obtenidos de la respuesta del servidor
        return data;
    } catch (error) {
        // Captura y muestra cualquier error que ocurra durante la solicitud
        console.error(error);
    }
}

export {GetUsers};