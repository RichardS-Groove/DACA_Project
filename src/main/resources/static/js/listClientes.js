$(document).ready(function(){
    cargarClientes()
});
document.querySelector('.userDropdown span').innerHTML = localStorage.user;
async function cargarClientes(){
  const requestClientes = await fetch('api/customer', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + localStorage.token,
      'Content-Type': 'application/json'
    },
  });
  const clientes = await requestClientes.json();

  let listadoHtml = '<option selected>Seleccionar...</option>';

  for (let cliente of clientes){
    let proyectoHtml = '<option value='+cliente.id+'>'+cliente.businessName+'</option>';

    listadoHtml += proyectoHtml;
  }
  document.querySelector('#inputCliente option').outerHTML = listadoHtml;
}