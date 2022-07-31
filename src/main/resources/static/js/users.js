let app = {
    backend2: 'http://localhost:8080/api/users',
    backend: 'http://localhost:8080/api/user',
    table : null,
    init: function() {
        $.fn.dataTable.ext.errMode = 'throw';
        app.initDatatable('#users');

        $("#save").click(function(){
            document.getElementById('message').innerHTML =''
            app.save({
                id: $('#user_id').val(),
                name : $('#user_name').val(),
                lastname: $('#user_lastn').val(),
                email: $('#user_email').val(),
                username: $('#user_usern').val(),
                password: $('#user_pass').val(),
                rol: $('#user_rol').val(),

            });
        }),
        $("#saveEdit").click(function(){
            document.getElementById('messageEdit').innerHTML =''
            app.update({
                id: $('#userEdit_id').val(),
                name : $('#userEdit_name').val(),
                lastname: $('#userEdit_lastn').val(),
                email: $('#userEdit_email').val(),
                username: $('#userEdit_usern').val(),
                password: $('#userEdit_pass').val(),
                rol: $('#userEdit_rol').val(),

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
                url : app.backend2 ,
                headers: { Authorization: 'Bearer ' + localStorage.token },
                dataSrc: '',


            },
            dom: 'Bfrtip',
            columns : [
                {data : "id"},
                {data : "name"},
                {data : "lastname"},
                {data : "email"},
                {data : "username"},
                {data : "password"},
                {data : "rol"},

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
                        app.setDataToModalEdit(data);
                        $('#usersEditModal').modal();

                    }
                },
                {
                    text : 'Crear',
                    action : function(e, dt, node, config) {
                        app.cleanDataToModal()
                        $('#usersModal').modal();
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
        $('#users tbody').on('click', 'tr', function(){
            if ($(this).hasClass('table-active')) {
                $(this).removeClass('table-active');
            } else {
                app.table.$('tr.table-active').removeClass('table-active');
                $(this).addClass('table-active');
            }
        });
    },

    setDataToModal : function(data) {
        document.getElementById('message').innerHTML =''
        $('#user_id').val(data.id);
        $('#user_name').val(data.name);
        $('#user_lastn').val(data.lastname);
        $('#user_email').val(data.email);
        $('#user_usern').val(data.username);
        $('#user_pass').val(data.password);
        $('#user_pass2').val(data.password);
        $('#user_rol').val(data.rol);
    },
    setDataToModalEdit : function(data) {
        document.getElementById('messageEdit').innerHTML =''
        $('#userEdit_id').val(data.id);
        $('#userEdit_name').val(data.name);
        $('#userEdit_lastn').val(data.lastname);
        $('#userEdit_email').val(data.email);
        $('#userEdit_usern').val(data.username);
        $('#userEdit_pass').val(data.password);
        $('#userEdit_pass2').val(data.password);
        $('#userEdit_rol').val(data.rol);
    },
    cleanDataToModal : function() {
        document.getElementById('message').innerHTML =''
        $('#user_id').val('');
        $('#user_name').val('');
        $('#user_lastn').val('');
        $('#user_email').val('');
        $('#user_usern').val('');
        $('#user_pass').val('');
        $('#user_pass2').val('');
        $('#user_rol').val('');
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
                $('#usersModal').modal('hide');
                document.getElementById("formUser").reset();
            },
        })

    },
    update : function(data) {
        $.ajax({
            url: app.backend2 +'/'+ data.id,
            headers: { Authorization: 'Bearer ' + localStorage.token },
            data : JSON.stringify(data),
            method: 'PUT',
            dataType : 'json',
            contentType: "application/json; charset=utf-8",
            complete : function (){
                app.table.ajax.reload();
                $("#msgUpdate").show();
                $('#usersEditModal').modal('hide');
                document.getElementById("formEditUser").reset();
            },
        })

    },
    delete: function(id) {
        $.ajax({
            url: app.backend2 +'/'+ id,
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


function check() {
    if (document.getElementById('user_pass').value ===
        document.getElementById('user_pass2').value) {
        document.getElementById('message').style.color = 'green';
        document.getElementById('message').innerHTML = 'Las Contraseñas coinciden!';
        document.getElementById("save").disabled =false
    } else {
        document.getElementById('message').style.color = 'red';
        document.getElementById('message').innerHTML = 'Las Contraseñas no coinciden!';
        document.getElementById("save").disabled =true
    }
}
function check2() {
    if (document.getElementById('userEdit_pass').value ===
        document.getElementById('userEdit_pass2').value) {
        document.getElementById('messageEdit').style.color = 'green';
        document.getElementById('messageEdit').innerHTML = 'Las Contraseñas coinciden!';
        document.getElementById("saveEdit").disabled =false
    } else {
        document.getElementById('messageEdit').style.color = 'red';
        document.getElementById('messageEdit').innerHTML = 'Las Contraseñas no coinciden!';
        document.getElementById("saveEdit").disabled =true
    }
}



document.querySelector('.userDropdown span').innerHTML = localStorage.user;



$(document).ready(function(){
    app.init();
});