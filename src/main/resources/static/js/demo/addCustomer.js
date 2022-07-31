
$(document).ready(function(){
    //on ready
});

async function registrarProyectos(){

    let datos = {};
    datos.name = document.getElementById('proy_nombre').value;
    datos.address = document.getElementById('proy_direccion').value;
    datos.location = document.getElementById('proy_localidad').value;
    datos.customer = {"id":document.getElementById('proy_cliente').value};
    datos.purchaseOrderAmount = document.getElementById('proy_monto').value;
    datos.mts2 = document.getElementById('proy_mts').value;
    datos.numberOfModules = document.getElementById('proy_cantMod').value;
    datos.amountOfAluminum = document.getElementById('proy_kilos').value;
    datos.percentageOfCompletion = document.getElementById('proy_avance').value;
    datos.purchaseOrderDate = document.getElementById('proy_fechaOC').value;
    datos.startDate = document.getElementById('proy_fechaInicio').value;
    datos.lastCertificationDate = document.getElementById('proy_fechaUltCert').value;
    datos.notes = document.getElementById('proy_notas').value;


    const request = await fetch('api/project', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
      });

      alert("Se agrego el proyecto correctamente!")

}





