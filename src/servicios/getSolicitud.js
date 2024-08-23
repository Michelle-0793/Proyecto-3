async function getSolicitud() {
    try {
        const response = await fetch(`http://localhost:3001/solicitudes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener la solicitud:', error);
        throw error;
    }
}
export { getSolicitud };

async function getSolicitudById(id) {
    try {
        const response = await fetch(`http://localhost:3001/solicitudes/`+id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener la solicitud:', error);
        throw error;
    }
}
export { getSolicitudById };

async function getHistorial() {
    try {
        const response = await fetch('http://localhost:3001/historial', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data; // Asegúrate de que esta es una lista
    } catch (error) {
        console.error('Error al obtener el historial:', error);
        throw error;
    }
}
export { getHistorial };


/*async function getSolicitud(id) {
    try {
        // Realiza una solicitud GET a la URL especificada para obtener las solicitudes
        const response = await fetch('http://localhost:3001/solicitudes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Verifica si la solicitud fue exitosa
        if (!response.ok) {
            // Captura el texto del error para una mejor depuración
            const errorText = await response.text();
            throw new Error(`Error ${response.status}: ${errorText}`);
        }

        // Espera la respuesta en formato JSON
        const data = await response.json();
        // Retorna los datos obtenidos de la respuesta del servidor
        return data;
    } catch (error) {
        // Captura y muestra cualquier error que ocurra durante la solicitud
        console.error('Error al obtener las solicitudes:', error);
        throw error; // Re-lanza el error para que pueda ser manejado por el código que llama a esta función
    }
}

export { getSolicitud };*/
