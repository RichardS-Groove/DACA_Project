$(document).ready(function(){
    //on ready
});
document.querySelector('.userDropdown span').innerHTML = localStorage.user;
async function registrarUsuarios(){

    let datos = {};
    datos.name = document.getElementById('name').value;
    datos.lastname = document.getElementById('lastname').value;
    datos.email = document.getElementById('email').value;
    datos.username = document.getElementById('username').value;
    datos.password = document.getElementById('password').value;
    datos.rol = 'pendiente';

    let repetirPassword = document.getElementById('password2').value;

    if(repetirPassword !== datos.password){
    alert('Las contraseñas no coinciden.')
    return;}

    const request = await fetch('api/user', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + localStorage.token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)


      });

    alert("Se agrego el usuario correctamente!");
    window.location.href = "index.html";

}