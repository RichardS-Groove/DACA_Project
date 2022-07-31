$(document).ready(function(){
    cargarProyectos();
});
document.querySelector('.userDropdown span').innerHTML = localStorage.user;
async function cargarProyectos(){
  const requestProyectos = await fetch('api/project', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + localStorage.token,
      'Content-Type': 'application/json'
    },
  });
  const proyectos = await requestProyectos.json();

    let listadoHtml = '<option selected>Seleccionar...</option>';

  for (let proyecto of proyectos){
  let proyectoHtml = '<option value='+proyecto.id+'>'+proyecto.name+'</option>';

  listadoHtml += proyectoHtml;
  }


  document.querySelector('#inputProyecto option').outerHTML = listadoHtml;
}
