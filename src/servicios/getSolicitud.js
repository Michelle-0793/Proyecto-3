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
export  { getHistorial };

async function getSolicitudesAceptadas() {
    try {
        const response = await fetch('http://localhost:3001/solicitudesAceptadas', {
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
export { getSolicitudesAceptadas };