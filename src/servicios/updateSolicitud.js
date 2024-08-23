async function updateSolicitud(id, estado) {
    try {
        // Realiza una solicitud PUT a la URL especificada con el ID
        const response = await fetch(`http://localhost:3001/solicitudes/${id}`, {
            method: 'PUT', // Especifica que se está utilizando el método PUT
            headers: {
                'Content-Type': 'application/json' // Indica que los datos se envían en formato JSON
            },
            body: JSON.stringify(estado) // Convierte el objeto de estado a JSON para enviarlo en el cuerpo de la solicitud
        });

        // Verifica si la respuesta es exitosa
        if (!response.ok) {
            throw new Error(`Error en la actualización: ${response.statusText}`);
        }

        // Espera la respuesta en formato JSON
        const data = await response.json();
        // Retorna los datos obtenidos de la respuesta del servidor
        return data;
    } catch (error) {
        // Captura y muestra cualquier error que ocurra durante la solicitud
        console.error('Error en updateSolicitud:', error);
        throw error; // Re-lanza el error para que pueda ser manejado por el código que llama a esta función
    }
}

export { updateSolicitud };
