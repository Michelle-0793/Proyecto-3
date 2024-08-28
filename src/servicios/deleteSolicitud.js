async function deleteSolicitud(id) {
    try {
        const response = await fetch(`http://localhost:3002/solicitudes/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`Error deleting request with id ${id}`);
        }
        return { message: `Request with id ${id} deleted successfully` };
    } catch (error) {
        console.error('Error deleting request:', error);
        // Puedes mostrar un mensaje al usuario aquí si lo deseas
        throw error;
    }
}

export { deleteSolicitud };

// servicios/deleteSolicitud.js

async function deleteHistorial() {
    try {
        const response = await fetch('http://localhost:3002/historial', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`); // Mostrar el estado HTTP en el error
        }
        return { message: 'All requests deleted successfully' };
    } catch (error) {
        console.error('Error deleting all requests:', error);
        throw error;
    }
}

export { deleteHistorial };



async function deleteSolicitudesAceptadas() {
    try {
        const response = await fetch(`http://localhost:3002/solicitudesAceptadas`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Error deleting all requests');
        }
        return { message: 'All requests deleted successfully' };
    } catch (error) {
        console.error('Error deleting all requests:', error);
        // Puedes mostrar un mensaje al usuario aquí si lo deseas
        throw error;
    }
}

export { deleteSolicitudesAceptadas };