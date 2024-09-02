document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('userForm');
    const tableBody = document.querySelector('#userTable tbody');
    let users = JSON.parse(localStorage.getItem('users')) || [];

    const renderTable = () => {
        tableBody.innerHTML = '';
        users.forEach((user, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${user.nombre}</td>
                <td>${user.ciudad}</td>
                <td>${user.telefono}</td>
                <td>${user.correo}</td>
                <td>
                    <button onclick="editUser(${index})">Editar</button>
                    <button onclick="deleteUser(${index})">Eliminar</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    };

    const saveUser = (event) => {
        event.preventDefault();
        const id = document.getElementById('userId').value;
        const nombre = document.getElementById('nombre').value;
        const ciudad = document.getElementById('ciudad').value;
        const telefono = document.getElementById('telefono').value;
        const correo = document.getElementById('correo').value;

        if (id === '') {
            // Add new user
            users.push({ nombre, ciudad, telefono, correo });
        } else {
            // Update existing user
            users[id] = { nombre, ciudad, telefono, correo };
        }

        localStorage.setItem('users', JSON.stringify(users));
        form.reset();
        document.getElementById('userId').value = '';
        renderTable();
    };

    window.editUser = (index) => {
        const user = users[index];
        document.getElementById('userId').value = index;
        document.getElementById('nombre').value = user.nombre;
        document.getElementById('ciudad').value = user.ciudad;
        document.getElementById('telefono').value = user.telefono;
        document.getElementById('correo').value = user.correo;
    };

    window.deleteUser = (index) => {
        users.splice(index, 1);
        localStorage.setItem('users', JSON.stringify(users));
        renderTable();
    };

    form.addEventListener('submit', saveUser);
    renderTable();
});
