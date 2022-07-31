document.querySelector('.userDropdown span').innerHTML = localStorage.user;

let app = {
    backend: 'http://localhost:8080/api/note',
    table : null,
    init: function() {
        $.fn.dataTable.ext.errMode = 'throw';
        app.initDatatable('#note');
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
                dataSrc: 'notes',
                rowId: 'id',
                stateSave: true,
            },
            dom: 'Bfrtip',

            columns : [
                //{
                    //className: 'dt-control',
                    //orderable: false,
                    //data: null,
                    //defaultContent: '',

                //},
                {data : "id"},
                {data : "dateOfIssue"},
                {data : "type"},
                {data : "saleCondition"},
                {data : "status"},
                {data : "purchaseOrder"},
                {data : "noteNumber"},
                {data : "invoice"},
                {data : "carrier"},
                {data : "project.name"},
                {data : "ivacondition"},
                {mData : "itemsList",
                mRender : "[</br>].quantity"},
                {mData : "itemsList",
                    mRender : "[</br>].description"},

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
                    text : 'Generar PDF',
                    action : function(e, dt, node, config) {
                        let data = dt.rows('.table-active').data()[0];
                        app.printPDF(data.id);


                    }
                },
                {
                    text : 'Eliminar',
                    action : function(e, dt, node, config) {
                        let data = dt.rows('.table-active').data()[0];
                        if (confirm('¿Desea eliminar este Remito?')) {
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


        $('#note tbody').on('click', 'tr', function(){
            if ($(this).hasClass('table-active')) {
                $(this).removeClass('table-active');
            } else {
                app.table.$('tr.table-active').removeClass('table-active');
                    $(this).addClass('table-active');
            }
        });
        },

    printPDF: function(id) {
        $.ajax({
            url: app.backend +'/pdf/'+ id,
            headers: { Authorization: 'Bearer ' + localStorage.token },
            data : JSON.stringify(id),
            method: 'GET',
            dataType : 'blob',
            contentType: "application/json; charset=utf-8",
            complete : function (){
                window.open(this.url);
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

