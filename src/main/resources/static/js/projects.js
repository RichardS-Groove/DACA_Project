document.querySelector('.userDropdown span').innerHTML = localStorage.user;
let app = {
    backend: 'http://localhost:8080/api/project',
    table : null,
    init: function() {
        $.fn.dataTable.ext.errMode = 'throw';
        app.initDatatable('#proyects');

        $("#save").click(function(){
            app.save({
                id: $('#proy_id').val(),
                name : $('#proy_name').val(),
                address: $('#proy_address').val(),
                location: $('#proy_location').val(),
                customer: {"id":$('#inputCliente2').val()},
                purchaseOrderAmount: $('#proy_purchaseOrderAmount').val(),
                mts2: $('#proy_mts2').val(),
                numberOfModules: $('#proy_numberOfModules').val(),
                amountOfAluminum: $('#proy_amountOfAluminum').val(),
                percentageOfCompletion: $('#proy_percentageOfCompletion').val(),
                purchaseOrderDate: $('#proy_purchaseOrderDate').val(),
                startDate : $('#proy_startDate').val(),
                lastCertificationDate: $('#proy_lastCertificationDate').val(),
                notes: $('#proy_notes').val()
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
                dataSrc: '',
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
                {data : "name"},
                {data : "address"},
                {data : "location"},
                {data : "purchaseOrderAmount"},
                {data : "mts2"},
                {data : "numberOfModules"},
                {data : "amountOfAluminum"},
                {data : "percentageOfCompletion"},
                {data : "purchaseOrderDate"},
                {data : "startDate"},
                {data : "lastCertificationDate"},
                {data : "notes"}
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
                        $('#proyectsModal').modal();

                    }
                },
                {
                    text : 'Crear',
                    action : function(e, dt, node, config) {
                        app.cleanDataToModal();
                        $('#proyectsModal').modal();
                    }
                },
                {
                    text : 'Eliminar',
                    action : function(e, dt, node, config) {
                        let data = dt.rows('.table-active').data()[0];
                        if (confirm('¿Desea eliminar este Proyecto?')) {
                            app.delete(data.id);

                        }

                    }
                }
            ]
        });


        function format2(data) {
            return ('<table cellpadding="5" cellspacing="0" border="1" style="padding-left:50px;">' +
                '<tr>' +
                '<td>Cliente:</td>' +
                '<td>' +
                data.customer.businessName +
                '</td>' +
                '</tr>' +
                '<tr>' +
                '<td>Nombre Contacto:</td>' +
                '<td>' +
                data.customer.contactName +
                '</td>' +
                '</tr>' +
                '<tr>' +
                '<td>Telefono:</td>' +
                '<td>' +
                data.customer.telephone +
                '</td>' +
                '</tr>' +
                '<tr>' +
                '<td>Email:</td>' +
                '<td>' +
                data.customer.email +
                '</td>' +
                '</tr>' +
                '<tr>' +
                '<td>Localidad:</td>' +
                '<td>' +
                data.customer.location +
                '</td>' +
                '</tr>' +
                '</table>'

            );
        }

        // Add event listener for opening and closing details
        $('#proyects').on('click', 'tbody td.dt-control', function () {
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

        $('#proyects').on('requestChild.dt', function (e, row) {
            row.child(format2(row.data())).show();
        });


        $('a.toggle-vis').on( 'click', function (e) {
            e.preventDefault();

            // Get the column API object
            let column = table.column( $(this).attr('data-column') );

            // Toggle the visibility
            column.visible( ! column.visible() );
        });


        $('#proyects tbody').on('click', 'tr', function(){
            if ($(this).hasClass('table-active')) {
                $(this).removeClass('table-active');
            } else {
                app.table.$('tr.table-active').removeClass('table-active');
                    $(this).addClass('table-active');
            }
        });
        },


    setDataToModal : function(data) {
       $('#proy_id').val(data.id)
       $('#proy_name').val(data.name)
       $('#proy_address').val(data.address)
       $('#proy_location').val(data.location)
       $('#inputCliente2').val(data.customer.id)
       $('#proy_purchaseOrderAmount').val(data.purchaseOrderAmount)
       $('#proy_mts2').val(data.mts2)
       $('#proy_numberOfModules').val(data.numberOfModules)
       $('#proy_amountOfAluminum').val(data.amountOfAluminum)
       $('#proy_percentageOfCompletion').val(data.percentageOfCompletion)
       $('#proy_purchaseOrderDate').val(data.purchaseOrderDate)
       $('#proy_startDate').val(data.startDate)
       $('#proy_lastCertificationDate').val(data.lastCertificationDate)
       $('#proy_notes').val(data.notes)
    },
    cleanDataToModal : function() {
        $('#proy_id').val(''),
        $('#proy_name').val(''),
        $('#proy_address').val(''),
        $('#proy_location').val(''),
        //$('#proy_customer').val(''),
        $('#proy_purchaseOrderAmount').val(''),
        $('#proy_mts2').val(''),
        $('#proy_numberOfModules').val(''),
        $('#proy_amountOfAluminum').val(''),
        $('#proy_percentageOfCompletion').val(''),
        $('#proy_purchaseOrderDate').val(''),
        $('#proy_startDate').val(''),
        $('#proy_lastCertificationDate').val(''),
        $('#proy_notes').val('')
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
                $('#proyectsModal').modal('hide');
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

if (localStorage.token == null) {
   console.log('Inicie Sesion para visualizar la informacion')
} else {
   $(document).ready(function(){
       app.init();
   });
}



