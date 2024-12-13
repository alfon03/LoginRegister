let users = []; 

document.addEventListener('DOMContentLoaded', function() {
  fetch('http://localhost:3000/users')
    .then(response => response.json())
    .then(data => {
      users = data; 
      renderUsersTable(); 
    })
    .catch(error => {
      console.error('Error al obtener los usuarios:', error);
      alert('Error al cargar los usuarios');
    });
});

function renderUsersTable() {
  const tableBody = document.querySelector('#users-table-body');
  tableBody.innerHTML = ''; 

  users.forEach(user => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${user.id}</td>
      <td>${user.username}</td>
      <td>${user.email}</td>
      <td>
        <button class="btn btn-danger btn-sm" onclick="deleteUser(${user.id})">Eliminar</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function deleteUser(userId) {
  fetch(`http://localhost:3000/users/${userId}`, {
    method: 'DELETE',
  })
  .then(() => {
    users = users.filter(user => user.id !== userId);
    renderUsersTable(); 
    alert('Usuario eliminado');
  })
  .catch(error => {
    console.error('Error al eliminar el usuario:', error);
    alert('Error al eliminar el usuario');
  });
}