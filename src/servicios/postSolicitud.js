async function postSolicitud(solicitud) {
    try {
        const response = await fetch('http://localhost:3001/solicitudes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(solicitud)
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al enviar la solicitud:', error);
        throw error;
    }
}
export { postSolicitud };

// postSolicitudHistorial.js
async function postSolicitudHistorial(solicitud) {
    try {
        const response = await fetch('http://localhost:3001/historial', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(solicitud)
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al enviar la solicitud al historial:', error);
        throw error;
    }
}
export { postSolicitudHistorial };


// postSolicitudHistorial.js
async function postSolicitudAceptadas(solicitud) {
    try {
        const response = await fetch('http://localhost:3001/solicitudesAceptadas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(solicitud)
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al enviar la solicitud al historial:', error);
        throw error;
    }
}
export { postSolicitudAceptadas };

