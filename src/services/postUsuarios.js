async function postUsers(nombre,cedula, email, contrasena, codigo) {
    try {
     
        const userData = { 
            nombre,
            cedula, 
            email, 
            contrasena, 
            codigo
        
        };

        const response = await fetch("http://localhost:3001/users", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

     
        return await response.json();

        
    } catch (error) {
        console.error('Error posting user:', error);
        throw error;
    }
}

export{postUsers}