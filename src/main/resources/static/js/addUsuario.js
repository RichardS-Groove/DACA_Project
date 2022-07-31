// Call the dataTables jQuery plugin
$(document).ready(function () {
    // on ready
});
document.querySelector('.userDropdown span').innerHTML = localStorage.user;

async function registarUsuarios() {

    let datos = {};
    datos.nombre = document.getElementById('txtname').value;
    datos.apellido = document.getElementById('txtlastname').value;
    datos.rol = document.getElementById('txtrol').value;
    datos.email = document.getElementById('txtemail').value;
    datos.telefono = document.getElementById('txtphone').value;
    datos.password = document.getElementById('txtpassword').value;

    const request = await fetch('api/usuario', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + localStorage.token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    });

    alert("La cuenta fue creada con exito!");
    window.location.href = '/listusuario';
}