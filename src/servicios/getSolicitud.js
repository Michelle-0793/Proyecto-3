async function getSolicitud() {
    try {
        // Realiza una solicitud GET a la URL especificada para obtener las solicitudes
        const response = await fetch('http://localhost:3003/solicitudes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
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

export { getSolicitud };