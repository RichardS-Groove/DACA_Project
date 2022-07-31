let app = {
init: function() {
     localStorage.clear();
    let timeleft = 6;
    let downloadTimer = setInterval(function(){
        if(timeleft <= 0){
            clearInterval(downloadTimer);
        }
        document.getElementById("progressBar").value = 10 - timeleft;
        timeleft -= 1;
    }, 1000);
    setTimeout(function(){
        window.location.href = "index.html";
    },7000);

}
};
$(document).ready(function(){
    app.init();

});


