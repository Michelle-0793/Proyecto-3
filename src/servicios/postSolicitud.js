async function postSolicitud(solicitud) {
    try {
        const response = await fetch('http://localhost:3003/solicitudes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(solicitud)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al enviar la solicitud:', error);
    }
}

export { postSolicitud };
