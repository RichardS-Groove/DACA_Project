$(document).ready(function(){
    cargarProyectos();
    $('#proyectos').DataTable();

});

async function cargarProyectos(){
  const requestProyectos = await fetch('api/project', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });
  const proyectos = await requestProyectos.json();



    let listadoHtml = '';

  for (let proyecto of proyectos){
  let botonEliminar='<a href="#" onclick = "eliminarProyecto('+proyecto.id+')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>'
  let proyectoHtml = '<tr><td>'+proyecto.id+'</td><td>'+proyecto.name+'</td><td>'+proyecto.address+'</td><td>'+proyecto.location+'</td><td>'
                      +proyecto.customer.businessName+'</td><td>'+proyecto.purchaseOrderAmount+'</td><td>'+proyecto.mts2+'</td><td>'+proyecto.purchaseOrderDate+'</td><td>'+proyecto.numberOfModules+'</td><td>'+proyecto.amountOfAluminum+'</td><td>'
                      +proyecto.percentageOfCompletion+'</td><td>'+proyecto.startDate+'</td><td>'+proyecto.lastCertificationDate+'</td><td>'
                      +proyecto.notes+'</td><td>'+botonEliminar+'</td></tr>';

  listadoHtml += proyectoHtml;
  }

 // console.log(proyectos);



  document.querySelector('#proyectos tbody').outerHTML = listadoHtml;
}

async function eliminarProyecto(id){

if (!confirm('¿Desea eliminar el proyecto indicado?')){
    return;
}

const requestProyectos = await fetch('api/project/'+id, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });
  location.reload();
}