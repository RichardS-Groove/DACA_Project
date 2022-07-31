document.querySelector('.userDropdown span').innerHTML = localStorage.user;
$(document).ready(function(){
    cargarProyectos();
});
/*var count=1;
var elements = [];

function addrow(){
 var table = document.getElementById("elementos");
 var cantElemento = document.getElementById("cantElemento").value;
 var descElemento = document.getElementById("descElemento").value;

    var element = {
        cantidad: document.getElementById("cantElemento").value,
        descripccion: document.getElementById("descElemento").value
    }
    elements.push(element);
    console.warn('added',{elements});


 var row = table.insertRow(count);
  //this adds row in 0 index i.e. first place

 row.innerHTML = "<td>"+count+"</td><td>"+cantElemento+"</td><td>"+descElemento+"</td><td><input type='button' onClick='borrarElemento("+count+")' class='btn btn-primary btn-sm borrar' value='Eliminar' /></td>";
 count++;
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
}*/

async function cargarProyectos(){
  const requestProyectos = await fetch('api/proyectos', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });
  const proyectos = await requestProyectos.json();



    let listadoHtml = '';

  for (let proyecto of proyectos){
  let proyectoHtml = '<option value='+proyecto.id+'>'+proyecto.nombre+'</option>';

  listadoHtml += proyectoHtml;
  }

 // console.log(proyectos);

  document.querySelector('#inputProyecto option').outerHTML = listadoHtml;
}



