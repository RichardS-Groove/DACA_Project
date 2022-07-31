$(document).ready(function(){

});
document.querySelector('.userDropdown span').innerHTML = localStorage.user;
async function cargarRemito(){
    let datos = {};
    datos.dateOfIssue = document.getElementById('rem_fecha').value;
    datos.ivacondition = document.getElementById('inputIVA').value;
    datos.saleCondition = document.getElementById('rem_condventa').value;
    datos.purchaseOrder = document.getElementById('rem_oc').value;
    datos.status = document.getElementById('rem_status').value;
    datos.itemsList = elements;
    datos.carrier = document.getElementById('rem_transportista').value;
    datos.project = {"id":document.getElementById('inputProyecto2').value};
    datos.noteNumber = document.getElementById('notes_noteNumber').value;
    datos.type = document.getElementById('notes_type').value;
    datos.invoice = document.getElementById('rem_fc').value;

    const request = await fetch('api/note', {
            method: 'POST',
            headers: {
              'Authorization': 'Bearer ' + localStorage.token,
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
          });

          alert("Se agrego el Remito correctamente!")
    location.reload(true);
}

let count=1;
let elements = [];


function addrow(){
 let table = document.getElementById("elementos");
 let cantElemento = document.getElementById("cantElemento").value;
 let descElemento = document.getElementById("descElemento").value;

    let element = {
        quantity: document.getElementById("cantElemento").value,
        description: document.getElementById("descElemento").value
    }
    elements.push(element);
    console.warn('added',{elements});


 let row = table.insertRow(count);
  //this adds row in 0 index i.e. first place

 row.innerHTML = "<td>"+count+"</td><td>"+cantElemento+"</td><td>"+descElemento+"</td><td><input type='button' onClick='borrarElemento("+count+")' class='btn btn-primary btn-sm borrar' value='Eliminar' /></td>";
 count++;

    document.getElementById("cantElemento").value = document.getElementById("cantElemento").defaultValue;
    document.getElementById("descElemento").value = document.getElementById("descElemento").defaultValue;



}
$(function () {
    $(document).on('click', '.borrar', function (event) {
        event.preventDefault();
        var algo = $(this).closest('tr').remove();
        count--;
    });
});
function borrarElemento(id){
    id--;
    delete elements[id];
    console.log(elements);
}
