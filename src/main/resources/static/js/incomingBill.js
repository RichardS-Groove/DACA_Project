document.querySelector('.userDropdown span').innerHTML = localStorage.user;
let app = {
    backend: 'http://localhost:8080/api/incomingbill',
    table : null,
    init: function() {
        app.initDatatable('#incomingbill');
        $.fn.dataTable.ext.errMode = 'throw';

        $("#save").click(function(){
            app.save({
                id: $('#incomingbill_id').val(),
                invoiceNumber: $('#incomingbill_number').val(),
                dateOfIssue : $('#incomingbill_date').val(),
                type: $('#incomingbill_type').val(),
                supplier: {"id":$('#inputProveedor2').val()},
                saleCondition: $('#incomingbill_condition').val(),
                status: $('#incomingbill_status').val(),
                purchaseOrder: $('#incomingbill_order').val(),
                invoiceAmount: $('#incomingbill_amount').val(),
                iva: $('#incomingbill_iva').val(),

            });
        });
    },
    initDatatable : function(id) {
        let table = app.table = $(id).DataTable({
            processing: true,
            colReorder: true,
            keys: true,
                ajax : {
                processing: true,
                url : app.backend ,
                headers: { Authorization: 'Bearer ' + localStorage.token },
                dataSrc: 'incomingBillResponseDTOList',
                rowId: 'id',
                stateSave: true,
            },
            dom: 'Bfrtip',
            columns : [
                {
                    className: 'dt-control',
                    orderable: false,
                    data: null,
                    defaultContent: '',

                },
                {data : "id"},
                {data : "invoiceNumber"},
                {data : "supplier.businessName"},
                {data : "dateOfIssue"},
                {data : "type"},
                {data : "saleCondition"},
                {data : "status"},
                {data : "purchaseOrder"},
                {data : "invoiceAmount"},
                {data : "iva"},

            ],
            "order": [[1, 'asc']],
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
                        $('#incomingbillModal').modal();

                    }
                },
                {
                    text : 'Crear',
                    action : function(e, dt, node, config) {
                        app.cleanDataToModal()
                        $('#incomingbillModal').modal();
                    }
                },
                {
                    text : 'Eliminar',
                    action : function(e, dt, node, config) {
                        let data = dt.rows('.table-active').data()[0];
                        if (confirm('¿Desea eliminar esta factura?')) {
                            app.delete(data.id);

                        }

                    }
                }
            ]
        });


        function format2(data) {
            return ('<table cellpadding="5" cellspacing="0" border="1" style="padding-left:50px;">' +
                '<tr>' +
                '<td>Proveedor:</td>' +
                '<td>' +
                data.supplier.businessName +
                '</td>' +
                '</tr>' +
                '<tr>' +
                '<td>Nombre Contacto:</td>' +
                '<td>' +
                data.supplier.contactName +
                '</td>' +
                '</tr>' +
                '<tr>' +
                '<td>Telefono:</td>' +
                '<td>' +
                data.supplier.telephone +
                '</td>' +
                '</tr>' +
                '<tr>' +
                '<td>Email:</td>' +
                '<td>' +
                data.supplier.email +
                '</td>' +
                '</tr>' +
                '<tr>' +
                '<td>Localidad:</td>' +
                '<td>' +
                data.supplier.location +
                '</td>' +
                '</tr>' +
                '</table>'

            );
        }

        // Add event listener for opening and closing details
        $('#incomingbill').on('click', 'tbody td.dt-control', function () {
            let tr = $(this).closest('tr');
            let row = table.row(tr);

            if (row.child.isShown()) {
                // This row is already open - close it
                row.child.hide();
            } else {
                // Open this row
                row.child(format2(row.data())).show();
            }
        });

        $('#incomingbill').on('requestChild.dt', function (e, row) {
            row.child(format2(row.data())).show();
        });


        $('a.toggle-vis').on( 'click', function (e) {
            e.preventDefault();

            // Get the column API object
            let column = table.column( $(this).attr('data-column') );

            // Toggle the visibility
            column.visible( ! column.visible() );
        });


        $('#incomingbill tbody').on('click', 'tr', function(){
            if ($(this).hasClass('table-active')) {
                $(this).removeClass('table-active');
            } else {
                app.table.$('tr.table-active').removeClass('table-active');
                    $(this).addClass('table-active');
            }
        });
        },


    setDataToModal : function(data) {
       $('#incomingbill_id').val(data.id),
       $('#incomingbill_number').val(data.invoiceNumber),
       $('#incomingbill_date').val(data.dateOfIssue),
       $('#incomingbill_type').val(data.type),
       $('#inputProveedor2').val(data.supplier.id),
       $('#incomingbill_supplier').val(data.supplier.id),
       $('#incomingbill_condition').val(data.saleCondition),
       $('#incomingbill_status').val(data.status),
       $('#incomingbill_order').val(data.purchaseOrder),
       $('#incomingbill_amount').val(data.invoiceAmount),
       $('#incomingbill_iva').val(data.iva)

    },
    cleanDataToModal : function() {
        $('#incomingbill_id').val(''),
        $('#incomingbill_date').val(''),
        $('#incomingbill_amount').val(''),
        $('#incomingbill_number').val(''),
        //$('#incomingbill_supplier').val(''),
        $('#incomingbill_order').val(''),
        //$('#incomingbill_condition').val(''),
        //$('#incomingbill_status').val(''),
        //$('#incomingbill_type').val(''),
        $('#incomingbill_iva').val('')
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
                $('#incomingbillModal').modal('hide');
                console.log(data)
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


/*
async function loggedUser() {

    /!** get Full Name *!/

    let name = {};
    name.email = localStorage.email;

    const coust = await fetch('api/user', {
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
}
*/

/*function logUser() {

        $.ajax({
                url: 'http://localhost:8080/api/user',
                method: 'GET',
                dataType : 'json',
                contentType: "application/json; charset=utf-8",
                complete : function () {
                    console.log(data)
                    let nameUser = data.name
                    document.getElementById('login-Name-LastName').outerHTML = nameUser.text();
                },

            },

        )
}*/

$(document).ready(function(){
    app.init();
    //logUser();
});

