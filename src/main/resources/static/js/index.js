$(document).ready(function () {
});

document.querySelector('.userDropdown span').innerHTML = localStorage.user;
async function iniciarSession() {

    /** Validation Password */
    let datos = {};
    datos.email = document.getElementById('txtemail').value;
    datos.password = document.getElementById('txtpassword').value;

    const request = await fetch('api/login', {
        method: 'POST',
        headers: getheaders(),
        body: JSON.stringify(datos)
    });
    const pass = await request.text();

    /** Validation Rol */
    let res = {};
    res.email = document.getElementById('txtemail').value;
    res.rol = document.getElementById('txtrol').value;

    const requestt = await fetch('api/rol', {
        method: 'POST',
        headers: getheaders(),
        body: JSON.stringify(res)
    });
    const rol = await requestt.text();

    /** Validation Email*/
    let mail = {};
    mail.email = document.getElementById('txtemail').value;

    const req = await fetch('api/email', {
        method: 'POST',
        headers: getheaders(),
        body: JSON.stringify(mail)
    });
    const cmail = await req.text();

    /** Validation Token*/
    let toke = {};
    toke.email = document.getElementById('txtemail').value;

    const resq = await fetch('api/token', {
        method: 'POST',
        headers: getheaders(),
        body: JSON.stringify(toke)
    });
    const token = await resq.text();

    let result = document.getElementById('txtrol').value;

    /** Validación Schema */
    if (cmail === 'true') {
        if (pass === "FAIL") {
            alert("Las credenciales son incorrectas. Por favor intente nuevamente.");
            return;
        }
        if (rol === 'Admin') {
            let res = validarRol(pass, rol, result);
            if (!res) return res;
        }
        if (rol === 'Daca') {
            let res = validarRol(pass, rol, result);
            if (!res) return res;
        }

    } else {
        alert("El correo no existe. Por favor intente nuevamente.");
        return;
    }


    /**methods*/
    function validarRol(pass, rol, resul) {
        if (pass === "OK" && rol === "Admin" && rol === resul) {
            localStorage.token = token;
            window.location.href = "/listusuario";
            return true;
        }
        if (pass === "OK" && rol === "Daca" && rol === resul) {
            localStorage.token = token;
            window.location.href = "daca.html";
            return true;
        } else {
            alert("El rol no pertenece al usuario. Por favor intente nuevamente.");
            return true;
        }
    }

    function getheaders() {
        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
    }
}