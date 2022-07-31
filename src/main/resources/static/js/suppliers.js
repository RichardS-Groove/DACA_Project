
document.querySelector('.userDropdown span').innerHTML = localStorage.user;
let app = {
    backend: 'http://localhost:8080/api/supplier',
    table : null,
    init: function() {
        $.fn.dataTable.ext.errMode = 'throw';
        app.initDatatable('#proveedores');

        $("#save").click(function(){
            app.save({
                id: $('#prov_id').val(),
                businessName : $('#prov_RSocial').val(),
                cuit: $('#prov_cuit').val(),
                contactName: $('#prov_contacto').val(),
                telephone: $('#prov_telefono').val(),
                address: $('#prov_direccion').val(),
                location: $('#prov_loc').val(),
                email: $('#prov_mail').val()
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
                        $('#proveedoresModal').modal();

                    }
                },
                {
                    text : 'Crear',
                    action : function(e, dt, node, config) {
                        app.cleanDataToModal()
                        $('#proveedoresModal').modal();
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
        $('#proveedores tbody').on('click', 'tr', function(){
            if ($(this).hasClass('table-active')) {
                $(this).removeClass('table-active');
            } else {
                app.table.$('tr.table-active').removeClass('table-active');
                $(this).addClass('table-active');
            }
        });
    },

    setDataToModal : function(data) {
        $('#prov_id').val(data.id);
        $('#prov_RSocial').val(data.businessName);
        $('#prov_cuit').val(data.cuit);
        $('#prov_contacto').val(data.contactName);
        $('#prov_telefono').val(data.telephone);
        $('#prov_direccion').val(data.address);
        $('#prov_loc').val(data.location);
        $('#prov_mail').val(data.email);
    },
    cleanDataToModal : function() {
        $('#prov_id').val('');
        $('#prov_RSocial').val('');
        $('#prov_cuit').val('');
        $('#prov_contacto').val('');
        $('#prov_telefono').val('');
        $('#prov_direccion').val('');
        $('#prov_loc').val('');
        $('#prov_mail').val('');
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
                $('#proveedoresModal').modal('hide');
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


/*async function loggedUser() {

    /!** get Full Name *!/

    let name = {};
    name.email = localStorage.email;

    const coust = await fetch('api/getFullName', {
        method: 'POST',
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
