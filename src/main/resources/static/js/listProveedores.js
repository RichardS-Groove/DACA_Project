$(document).ready(function(){
    cargarProveedores();
});
document.querySelector('.userDropdown span').innerHTML = localStorage.user;
async function cargarProveedores(){
  const requestProveedores = await fetch('api/supplier', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + localStorage.token,
      'Content-Type': 'application/json'
    },

  });
  const proveedores = await requestProveedores.json();

  let listadoHtml = '<option selected>Seleccionar...</option>';

  for (let proveedor of proveedores){
    let proyectoHtml = '<option value='+proveedor.id+'>'+proveedor.businessName+'</option>';

    listadoHtml += proyectoHtml;
  }


  document.querySelector('#inputProveedor option').outerHTML = listadoHtml;
}
