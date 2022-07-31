document.querySelector('.userDropdown span').innerHTML = localStorage.user;

$(document).ready(function () {
});


async function resetPassword() {
    function getheaders() {
        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
    }


    /** Obtener ID */
    let idd = {};
    idd.email = document.getElementById('txtemail').value;

    const teft = await fetch('api/id', {
        method: 'POST',
        headers: getheaders(),
        body: JSON.stringify(idd)
    });
    const idds = await teft.text();

    console.log("id: " + idds);

    /** Validation Email*/
    let mail = {};
    mail.email = document.getElementById('txtemail').value;

    const req = await fetch('api/email', {
        method: 'POST',
        headers: getheaders(),
        body: JSON.stringify(mail)
    });
    const cmail = await req.text();

    console.log("Correo: " + cmail);


    /** Validation Nombre */
    let na = {};
    na.email = document.getElementById('txtemail').value;
    na.nombre = document.getElementById('txtname').value;

    const requ = await fetch('api/nombre', {
        method: 'POST',
        headers: getheaders(),
        body: JSON.stringify(na)
    });
    const nom = await requ.text();

    console.log("Nombre:" + nom);

    /** Validation Apellido */
    let lat = {};
    lat.email = document.getElementById('txtemail').value;
    lat.apellido = document.getElementById('txtlastname').value;

    const requs = await fetch('api/apellido', {
        method: 'POST',
        headers: getheaders(),
        body: JSON.stringify(lat)
    });
    const lastn = await requs.text();

    console.log("Apellido:" + lastn);

    /** Validation telefono*/
    let phon = {};
    phon.email = document.getElementById('txtemail').value;

    const reft = await fetch('api/telefono', {
        method: 'POST',
        headers: getheaders(),
        body: JSON.stringify(phon)
    });
    const phone = await reft.text();

    console.log("Telefono:" + phone);

    /** Validation Roles */
    let res = {};
    res.email = document.getElementById('txtemail').value;
    res.rol = document.getElementById('txtrol').value;

    const requst = await fetch('api/roles', {
        method: 'POST',
        headers: getheaders(),
        body: JSON.stringify(res)
    });
    const role = await requst.text();

    console.log("Roles:" + role);

    let pass = document.getElementById('txtpassword').value;
    let reppass = document.getElementById('txtrepeatpassword').value;

    if (cmail === "true" && nom === "true" && lastn === "true" && role === "true") {
        if (pass !== "" && reppass !== "") {
            if (pass === reppass) {
                let datos = {};
                datos.id = idds;
                datos.nombre = document.getElementById('txtname').value;
                datos.apellido = document.getElementById('txtlastname').value;
                datos.rol = document.getElementById('txtrol').value;
                datos.email = document.getElementById('txtemail').value;
                datos.telefono = phone;
                datos.password = document.getElementById('txtpassword').value;

                const request = await fetch('api/usuario', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(datos)
                });

                alert("Se reseteo la contraseña");
                window.location.href = 'index.html';
            } else {
                alert("Las contraseñas no coinciden");
            }
        } else {
            alert("Debe ingresar una contraseña");
        }
    } else {
        alert("Los datos ingresados son incorrectos, verifique que los campos esten correctos");
    }
}