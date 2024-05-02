function handleLogout() {
    document.getElementById('logoutForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

        fetch('/api/session/logout', {
            method: 'GET'
        })
        .then(response => {
            if (response.status === 200) {
                window.location.href = '/'; // Redirige al usuario a "/"
            } else {
                // Manejar cualquier otro caso, como mostrar un mensaje de error
                console.error('Error al cerrar sesión');
            }
        })
        .catch(error => {
            console.error('Error al cerrar sesión:', error);
        });
    });
}

handleLogout();
