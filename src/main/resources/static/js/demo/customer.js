$(document).ready(function(){
    cargarClientes();
    $('#customers').DataTable();

});

async function cargarClientes(){
  const requestClientes = await fetch('api/customer', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });
  const clientes = await requestClientes.json();



  let listadoHtml = '';

  for (let cliente of clientes){
  let botonEliminar='<a href="#" onclick = "eliminarCliente('+cliente.id+')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>'
  let clienteHtml = '<tr><td>'+cliente.id+'</td><td>'+cliente.businessName+'</td><td>'+cliente.cuit+'</td><td>'+cliente.contactName+'</td><td>'
                      +cliente.telephone+'</td><td>'+cliente.address+'</td><td>'+cliente.location+'</td><td>'+cliente.email+'</td><td>'+botonEliminar+'</td></tr>';

  listadoHtml += clienteHtml;
  }

 // console.log(proyectos);



  document.querySelector('#customers tbody').outerHTML = listadoHtml;
}

async function eliminarCliente(id){

if (!confirm('¿Desea eliminar el cliente indicado?')){
    return;
}

const requestClientes = await fetch('api/customer/'+id, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });
  location.reload();
}