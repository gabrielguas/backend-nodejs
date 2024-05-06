function changeRole(userId) {
  // Hacer una solicitud POST al servidor para cambiar el rol del usuario
  fetch(`/api/admin/${userId}/update-role`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then(response => {
      if (response.ok) {
        window.location.reload();
      } else {
        console.error("Error al cambiar el rol del usuario");
      }
    })
    .catch(error => {
      console.error("Error de red:", error);
    });
}

function deleteUser(userId) {
  fetch(`/api/admin/${userId}/delete-user`, {
    method: 'DELETE',
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al eliminar usuario');
      }
      return response.text();
    })
    .then(data => {
      window.location.reload();
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function deleteInactiveUsers() {
  fetch(`/api/users/`, {
    method: 'DELETE',
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al eliminar usuarios inactivos');
      }
      return response.text();
    })
    .then(data => {
      window.location.reload();
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
