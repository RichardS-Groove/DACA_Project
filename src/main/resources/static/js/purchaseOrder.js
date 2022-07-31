document.querySelector('.userDropdown span').innerHTML = localStorage.user;

let app = {
    backend: 'http://localhost:8080/api/purchaseOrder',
    table : null,
    init: function() {
        $.fn.dataTable.ext.errMode = 'throw';
        app.initDatatable('#OC');

        $("#save").click(function(){
            app.save({
                id: $('#oc_id').val(),
                dateOfIssue : $('#oc_dateOfIssue').val(),
                type: $('#oc_type').val(),
                project: {"id":$('#inputProyecto2').val()},
                customer: {"id":$('#inputCliente2').val()},
                supplier: {"id":$('#inputProveedor2').val()},
                saleCondition: $('#oc_saleCondition').val(),
                paymentDate: $('#oc_paymentDate').val(),
                paymentMethod: $('#oc_paymentMethod').val(),
                status: $('#oc_status').val(),
                //itemsList :{[ $('#oc_itemsList').val()]},
                dateOfDelivery: $('#oc_dateOfDelivery').val()

            });
        });
    },
    initDatatable : function(id) {
        let table = app.table = $(id).DataTable({
            processing: true,
            colReorder: true,
            keys: true,
                ajax : {
                url : app.backend ,
                headers: { Authorization: 'Bearer ' + localStorage.token },
                dataSrc: 'purchaseOrderResponseDTOList',
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
                {data : "dateOfIssue"},
                {data : "type"},
                {data : "project.name"},
                {data : "supplier.businessName"},
                {data : "project.customer.businessName"},
                {data : "saleCondition"},
                {data : "paymentDate"},
                {data : "paymentMethod"},
                {data : "status"},
                {data : "itemsList"},
                {data : "dateOfDelivery"}
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
                        $('#ocModal').modal();

                    }
                },
                {
                    text : 'Crear',
                    action : function(e, dt, node, config) {
                        app.cleanDataToModal()
                        $('#ocModal').modal();
                    }
                },
                {
                    text : 'Eliminar',
                    action : function(e, dt, node, config) {
                        let data = dt.rows('.table-active').data()[0];
                        if (confirm('¿Desea eliminar esta OC?')) {
                            app.delete(data.id);

                        }

                    }
                }
            ]
        });


        function format2(data) {
            return (
                '<table cellpadding="5" cellspacing="0" border="1" style="padding-left:50px;">' +
                '<th colSpan="4">Datos del proyecto</th>' +
                '<tr>' +
                '<td>'+ data.project.name+'</td>' +
                '<td>'+ data.project.address+'</td>' +
                '<td>'+ data.project.location+'</td>' +
                '<td>'+ data.project.notes+'</td>' +
                '</tr>' +

                '</table>' +

                '<table cellpadding="5" cellspacing="0" border="1" style="padding-left:50px;">' +
                '<th colSpan="4"> Datos del Cliente </th>' +
                '<tr>' +
                '<td>'+ data.project.customer.businessName+'</td>' +
                '<td>'+ data.project.customer.contactName+'</td>' +
                '<td>'+ data.project.customer.location+'</td>' +
                '<td>'+ data.project.customer.telephone+'</td>' +
                '</tr>' +
                ' </table>' +
                ' <td>' +
                '<table cellpadding="5" cellspacing="0" border="1" style="padding-left:50px;">' +
                '<th colSpan="4">Datos del Proveedor</th>' +
                '<tr>' +
                '<td>' + data.supplier.businessName+'</td>' +
                '<td>'+ data.supplier.contactName+'</td>' +
                '<td>'+ data.supplier.telephone+'</td>' +
                '<td>'+ data.supplier.email +'</td>' +
                '</tr>'+
                '</table>'


            );
        }

        // Add event listener for opening and closing details
        $('#OC').on('click', 'tbody td.dt-control', function () {
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

        $('#OC').on('requestChild.dt', function (e, row) {
            row.child(format2(row.data())).show();
        });


        $('a.toggle-vis').on( 'click', function (e) {
            e.preventDefault();

            // Get the column API object
            let column = table.column( $(this).attr('data-column') );

            // Toggle the visibility
            column.visible( ! column.visible() );
        });


        $('#OC tbody').on('click', 'tr', function(){
            if ($(this).hasClass('table-active')) {
                $(this).removeClass('table-active');
            } else {
                app.table.$('tr.table-active').removeClass('table-active');
                    $(this).addClass('table-active');
            }
        });
        },


    setDataToModal : function(data) {
       $('#oc_id').val(data.id),
       $('#oc_dateOfIssue').val(data.dateOfIssue),
       $('#oc_type').val(data.type),
       $('#inputProyecto2').val(data.project.id)
       $('#inputCliente2').val(data.project.customer.id),
       $('#inputProveedor2').val(data.supplier.id),
       $('#oc_saleCondition').val(data.saleCondition),
       $('#oc_paymentDate').val(data.paymentDate),
       $('#oc_paymentMethod').val(data.paymentMethod),
       $('#oc_status').val(data.status),
       $('#oc_itemsList').val(data.itemsList),
       $('#oc_dateOfDelivery').val(data.dateOfDelivery)

    },
    cleanDataToModal : function() {
        $('#oc_id').val(''),
        $('#oc_dateOfIssue').val(''),
        $('#oc_type').val(''),
        //$('#inputProyecto2').val(''),
        //$('#inputCliente2').val(''),
        //$('#inputProveedor2').val(''),
        //$('#oc_saleCondition').val(''),
        $('#oc_paymentDate').val(''),
        $('#oc_paymentMethod').val(''),
        $('#oc_status').val(''),
        $('#oc_itemsList').val(''),
        $('#oc_dateOfDelivery').val('')
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
                $('#ocModal').modal('hide');
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
}*/

$(document).ready(function(){
    app.init();
    //loggedUser();
});

