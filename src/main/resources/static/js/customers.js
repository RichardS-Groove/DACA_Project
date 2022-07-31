let app = {
    backend: 'http://localhost:8080/api/customer',
    table : null,
    init: function() {
        app.initDatatable('#customers');
        $.fn.dataTable.ext.errMode = 'throw';

        $("#save").click(function(){
            app.save({
                id: $('#cli_id').val(),
                businessName : $('#cli_RSocial').val(),
                cuit: $('#cli_cuit').val(),
                contactName: $('#cli_contacto').val(),
                telephone: $('#cli_telefono').val(),
                address: $('#cli_direccion').val(),
                location: $('#cli_loc').val(),
                email: $('#cli_mail').val()
            });
        });
    },
    initDatatable : function(id) {
        app.table = $(id).DataTable({
            processing: true,
            colReorder: true,
            keys: true,
            responsive: true,
            ajax : {
                processing: true,
                url : app.backend ,
                headers: { Authorization: 'Bearer ' + localStorage.token },
                dataSrc: '',
            },
            dom: 'Bfrtip',
            columns : [
                {data : "id"},
                {data : "businessName"},
                {data : "cuit"},
                {data : "contactName"},
                {data : "telephone"},
                {data : "address"},
                {data : "location"},
                {data : "email"},

            ],
            buttons: [

                {
                  extend: 'excelHtml5',
                  text:      '<i class="fas fa-file-excel"></i> ',
                  titleAttr: 'Exportar a Excel',
                  className: 'btn btn-success'
                },
                {
                    extend: 'csvHtml5',
                    text:      '<i class="fas fa-file-csv"></i> ',
                    titleAttr: 'Exportar a CSV',
                    className: 'btn btn-warning'
                },
                {
                    extend: 'copyHtml5',
                    text:      '<i class="fas fa-copy"></i> ',
                    titleAttr: 'Copiar',
                    className: 'btn btn-secondary'
                },
                {
                    extend:    'pdfHtml5',
                    text:      '<i class="fas fa-file-pdf"></i> ',
                    titleAttr: 'Exportar a PDF',
                    className: 'btn btn-danger'
                },
                {
                    extend:    'print',
                    text:      '<i class="fa fa-print"></i> ',
                    titleAttr: 'Imprimir',
                    className: 'btn btn-info'
                },
                {
                    text : 'Editar',
                    action : function(e, dt, node, config) {
                        let data = dt.rows('.table-active').data()[0];
                        app.setDataToModal(data);
                        $('#customersModal').modal();

                    }
                },
                {
                    text : 'Crear',
                    action : function(e, dt, node, config) {
                        app.cleanDataToModal()
                        $('#customersModal').modal();
                    }
                },
                {
                    text : 'Eliminar',
                    action : function(e, dt, node, config) {
                        let data = dt.rows('.table-active').data()[0];
                        if (confirm('¿Desea eliminar este usuario?')) {
                            app.delete(data.id);

                        }

                    }
                }
            ]
        });
        $('a.toggle-vis').on( 'click', function (e) {
            e.preventDefault();

            // Get the column API object
            let column = table.column( $(this).attr('data-column') );

            // Toggle the visibility
            column.visible( ! column.visible() );
        });
        $('#customers tbody').on('click', 'tr', function(){
            if ($(this).hasClass('table-active')) {
                $(this).removeClass('table-active');
            } else {
                app.table.$('tr.table-active').removeClass('table-active');
                $(this).addClass('table-active');
            }
        });
    },

    setDataToModal : function(data) {
        $('#cli_id').val(data.id);
        $('#cli_RSocial').val(data.businessName);
        $('#cli_cuit').val(data.cuit);
        $('#cli_contacto').val(data.contactName);
        $('#cli_telefono').val(data.telephone);
        $('#cli_direccion').val(data.address);
        $('#cli_loc').val(data.location);
        $('#cli_mail').val(data.email);
    },
    cleanDataToModal : function() {
        $('#cli_id').val('');
        $('#cli_RSocial').val('');
        $('#cli_cuit').val('');
        $('#cli_contacto').val('');
        $('#cli_telefono').val('');
        $('#cli_direccion').val('');
        $('#cli_loc').val('');
        $('#cli_mail').val('');
    },
    save : function(data) {
        $.ajax({
            url: app.backend ,
            headers: { Authorization: 'Bearer ' + localStorage.token },
            data : JSON.stringify(data),
            method: 'POST',
            dataType : 'json',
            contentType: "application/json; charset=utf-8",
            complete : function (){
                app.table.ajax.reload();
                $("#msgUpdate").show();
                $('#customersModal').modal('hide');
            },
        })

    },
    delete: function(id) {
        $.ajax({
            url: app.backend +'/'+ id,
            headers: { Authorization: 'Bearer ' + localStorage.token },
            data : JSON.stringify(id),
            method: 'DELETE',
            dataType : 'json',
            contentType: "application/json; charset=utf-8",
            complete : function (){
                app.table.ajax.reload();
                $("#msgDelete").alert().show();
            },
        })

    },
};
document.querySelector('.userDropdown span').innerHTML = localStorage.user;
/*
async function loggedUser() {

    /!** get Full Name *!/

    let name = {};
    name.email = localStorage.email;

    const coust = await fetch('http://localhost:8080/api/user', {
        method: 'GET',
        headers: getheaders(),
        body: JSON.stringify(name)
    });
    document.getElementById('login-Name-LastName').outerHTML = await coust.text();
}

function getheaders() {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
}*/

$(document).ready(function(){
    app.init();
   //loggedUser();
});

