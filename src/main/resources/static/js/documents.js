// API KEY > AIzaSyDU4SqKqra_CIeIcn6jv7B3AdNwI3qsu4Q
//TODO(developer): Set to client ID and API key from the Developer Console
const CLIENT_ID = '862615035718-ji7i46hq8a7cq9rbs9mkhknjd0hqge35.apps.googleusercontent.com';
const API_KEY = 'AIzaSyAL8CtjF7QTBHGwrSpNBBuEaiwI9TRR_KY';

// Discovery doc URL for APIs used by the quickstart
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/drive.photos.readonly https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.metadata https://www.googleapis.com/auth/drive.appdata  https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/admin.directory.user.readonly';


let FolderName;
let tokenClient;
let gapiInited = false;
let gisInited = false;

document.getElementById('authorize_button').style.visibility = 'hidden';
document.getElementById('signout_button').style.visibility = 'hidden';
document.querySelector('.userDropdown span').innerHTML = localStorage.user;
/**
 * Callback after api.js is loaded.
 */
function gapiLoaded() {
    gapi.load('client', intializeGapiClient);
}

/**
 * Callback after the API client is loaded. Loads the
 * discovery doc to initialize the API.
 */
async function intializeGapiClient() {
    await gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: [DISCOVERY_DOC],
    });
    gapiInited = true;
    maybeEnableButtons();
}

function gisLoaded() {
    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: '', // defined later
    });
    gisInited = true;
    maybeEnableButtons();
}

function maybeEnableButtons() {
    if (gapiInited && gisInited) {
        document.getElementById('authorize_button').style.visibility = 'visible';
    }
}


function handleAuthClick() {
    tokenClient.callback = async (resp) => {
        if (resp.error !== undefined) {
            throw (resp);
        }
        document.getElementById('signout_button').style.visibility = 'visible';
        document.getElementById('authorize_button').innerText = 'Actualizar';
        //await listFiles();
    };

    if (gapi.client.getToken() === null) {
        // Prompt the user to select a Google Account and ask for consent to share their data
        // when establishing a new session.
        tokenClient.requestAccessToken({prompt: 'consent'});
    } else {
        // Skip display of account chooser and consent dialog for an existing session.
        tokenClient.requestAccessToken({prompt: ''});
    }
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick() {
    const token = gapi.client.getToken();
    if (token !== null) {
        google.accounts.oauth2.revoke(token.access_token);
        gapi.client.setToken('');
        //document.getElementById('content2').innerText = '';
        document.getElementById('authorize_button').innerText = 'Authorize';
        document.getElementById('signout_button').style.visibility = 'hidden';
    }
}




function listFiles() {


    gapi.client.drive.files.list({
        //'pageSize': 50,
        //'q':"'10QO8GGZxonHKIDgrfhg15IlajF2UUsa0' in parents",
        'q': `parents in "${localStorage.getItem('parent_folder')}"`,
        'fields': "nextPageToken, files(id, name, mimeType, createdTime, size)"
    }).then(function(response) {

        //console.log(response.result.files)
        //let dataSet1 = JSON.stringify(response.result.files);

        //console.log(dataSet1)


        $(document).ready(function () {
            let table = $('#example').DataTable({
                select: true,
                processing: true,
                retrieve: false,
                paging: true,
                destroy : true,
                dataType: JSON,
                dataSrc: '',
                rowId: 'id',
                stateSave: true,
                data: response.result.files,
                colReorder: true,
                dom: 'Bfrtip',
                aoColumns:[
                    {mData:"id"},
                    {mData:"name"},
                    {mData:"mimeType"},
                    {mData:"createdTime"},
                    {mData:"size"},
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
                        text : 'Descargar',
                        action : function(e, dt, node, config) {
                            let data1 = table.rows( { selected: true } ).data()[0];
                            downloadFile(data1.id, data1.name);

                        }
                    },
                    {
                        text : 'Eliminar',
                        action : function(e, dt, node, config) {
                            let data1 = table.rows( { selected: true } ).data()[0];
                            if (confirm('¿Desea eliminar este archivo?')) {
                                deleteFile(data1.id);
                            }
                        }
                    }
                ]
            });
        });
    });
}
function deleteFile(id) {
    let idFile = id
    gapi.client.drive.files.delete({
        'fileId': id
    })
        .then(function(response) {
                //console.log("Response", response);
                listFiles();

            },
            function(err) { console.error("Execute error", err); });
}


// check for a Backup Folder in google drive
function checkFolder() {
    let combo = document.getElementById("inputProyecto2");
    let nameFolder = combo.options[combo.selectedIndex].text;
    console.log(nameFolder)
    gapi.client.drive.files.list({
        "q": "name = '"+nameFolder+ "'" +" and mimeType = 'application/vnd.google-apps.folder'",
    }).then(function (response) {
        let files = response.result.files;
        console.log(response.result.files)
        if (files && files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                let file = files[i];
                localStorage.setItem('parent_folder', file.id);
                console.log(file.id)
                console.log('Folder Available');
                // get files if folder available
                listFiles();
            }
        } else {
            // if folder not available then create
            createFolder(nameFolder);
        }
    })


}

function createFolder(nameFolder) {
    //let nameFolder = 'carpeta01'
    gapi.client.drive.files.create({
        //'title': '"'+nameFolder+'"',
        'name': nameFolder,
        'mimeType': 'application/vnd.google-apps.folder',
    })
        .then(function(response) {
                console.log(response)
                let file = response.result;
                //console.log("Response", response);
                localStorage.setItem('parent_folder', file.id);
                console.log(file.id)
                listFiles();

            },
            function(err) { console.error("Execute error", err); });
}


function downloadFile(id, name) {
    let idFile = id
    let nameFile= name
    console.log(nameFile)

    let file = fetch('https://www.googleapis.com/drive/v3/files/'+idFile+'?fields=name%2Csize&key='+API_KEY+'&alt=media', {
        method: 'GET',
        headers: new Headers({'Authorization': 'Bearer ' + gapi.auth.getToken().access_token}),
        Accept: 'application/json',

    }).then((res) => { return res.blob(); })
        .then((data) => {
            let a = document.createElement("a");
            a.href = window.URL.createObjectURL(data);
            a.download = nameFile;
            a.click();
        });
}

function uploadFiles() {
    const files = document.getElementById("files").files;
    let parents = localStorage.getItem('parent_folder');
    console.log(parents)
    const file = files[0];
    const fr = new FileReader();
    fr.readAsArrayBuffer(file);
    fr.onload = (f) => {
        const fileMetadata = {
            name: file.name,
            parents: [parents],
        }
        const form = new FormData();
        form.append('metadata', new Blob([JSON.stringify(fileMetadata)], {type: 'application/json'}));
        form.append('file', new Blob([new Uint8Array(f.target.result)], {type: file.type}));
        fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
            method: 'POST',
            headers: new Headers({'Authorization': 'Bearer ' + gapi.auth.getToken().access_token}),
            body: form
        }).then(function (response) {
            return response.json();
        }).then(function (value) {
            console.log(value);

            // also update list on file upload
            listFiles();
        });
        document.getElementById("files").value = document.getElementById("files").defaultValue;


    };
}