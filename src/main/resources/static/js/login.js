$(document).ready(function(){
    //on ready
});

async function iniciarSesion(){

    let datos = {};
    datos.username = document.getElementById('user').value;
    datos.password = document.getElementById('password').value;

    const request = await fetch('api/authenticate', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + localStorage.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
      });
    const response = await request.text();
    const myObjectResponse = JSON.parse(response);
    console.log(typeof myObjectResponse.email);
    if((typeof myObjectResponse.email) === 'undefined'){
        alert("Las credenciales son incorrectas")
    } else {
        localStorage.token = myObjectResponse.token;
        localStorage.user = myObjectResponse.name+" "+myObjectResponse.lastname;
        window.location.href = 'dashboard.html'
    }
}