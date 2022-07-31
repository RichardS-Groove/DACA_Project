$(document).ready(function(){
    getGananciasMensuales();
    getGananciasAnuales();
    getGastosMensuales();
    getGastosAnuales();
    getOfficialDollar();
    getBlueDollar()
    getAluminiunAmount()
});

async function getGananciasMensuales(){
    const request = await fetch('api/dashboard/monthlyBilling?month=5&year=2022', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.token,
            'Content-Type': 'application/json',

        },
    });
    const response = await request.json();
    if (localStorage.token == null) {
       console.log('Inicie Sesion para visualizar la informacion')
    } else {
       $('#monthlyBilling').text('$'+response.total_income);
    }

}

async function getGananciasAnuales(){
        const request = await fetch('api/dashboard/annualBilling?year=2022', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.token,
            'Content-Type': 'application/json'

        },
    });
    const response = await request.json();
    if (localStorage.token == null) {
           console.log('Inicie Sesion para visualizar la informacion')
        } else {
           $('#annualBilling').text('$'+response.total_income);
        }

}

async function getGastosMensuales(){
    const request = await fetch('/api/dashboard/monthlyExpenses?month=5&year=2022', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.token,
            'Content-Type': 'application/json'
        },
    });
    const response = await request.json();
    if (localStorage.token == null) {
           console.log('Inicie Sesion para visualizar la informacion')
        } else {
           $('#monthlyExpenses').text('$'+response.total_income);
        }


}

async function getGastosAnuales(){
    const request = await fetch('api/dashboard/annualExpenses?year=2022', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.token,
            'Content-Type': 'application/json'
        },
    });
    const response = await request.json();
    if (localStorage.token == null) {
           console.log('Inicie Sesion para visualizar la informacion')
        } else {
           $('#annualExpenses').text('$'+response.total_income);
        }


}

async function getOfficialDollar(){

    const request = await fetch('https://api.bluelytics.com.ar/v2/latest', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });
    const response = await request.json();


    console.log(response);
    $('#officialPurchase').text('$'+response.oficial.value_buy);
    $('#officialSell').text('$'+response.oficial.value_sell);





}

document.querySelector('.userDropdown span').innerHTML = localStorage.user;

async function getBlueDollar(){
    const request = await fetch('https://api.bluelytics.com.ar/v2/latest', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });
    const response = await request.json();

    console.log(response);
    $('#bluePurchase').text('$'+response.blue.value_buy);
    $('#blueSell').text('$'+response.blue.value_sell);

}

async function getAluminiunAmount(){
    const request = await fetch('https://metals-api.com/api/latest?access_key=qf43kf4ddffart3pdy7zg6c3706szwhwr28aw6j7ma8hjlrh2qrj5ju4ecj4&base=USD&symbols=ALU', {
        //https://metals-api.com/api/latest?access_key=3o0xu2ot6xyh540m9jla7l57k89aeez9669nser2yepp8lgndha2ls7v4ox5&base=USD&symbols=ALU
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });
    const response = await request.json();
    console.log(response);
    let precioOnza = 1/response.rates.ALU
    let precioKilo = precioOnza * 35.274
    let precioTon = precioKilo * 1000
    $('#aluminiumTn').text('USD'+precioTon.toFixed(2));
    $('#aluminiumKg').text('USD'+precioKilo.toFixed(2));
    console.log(response.rates.ALU)
}



////////////////////////////////////////////////////////////////////////////////////////////////



const printCharts = () => {
       fetchCoasterData('http://localhost:8080/api/project', 'http://localhost:8080/api/dashboard/monthlyResume?month=7&year=2022')
           .then(([allCoasters, monthly]) => {
               renderModelsChart(allCoasters)
               renderYearsChart(monthly)
               renderIVAChart(monthly)
           })
       }

        const renderModelsChart = coasters => {

            let mtotal = 0;
            let atotal = 0;
            let mmtros = 0;
            coasters.forEach(function (obj) {
                atotal += parseInt(obj.amountOfAluminum);
                mtotal += parseInt(obj.numberOfModules);
                mmtros += parseInt(obj.mts2);
            })

            //const amountOfAluminum = coasters.map(coaster => coaster.amountOfAluminum)
            const data = {
                labels: ['aluminio', 'modulos', 'mts2'],
                datasets: [{
                    data: [atotal, mtotal, mmtros],
                    backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
                    hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
                    hoverBorderColor: "rgba(234, 236, 244, 1)",
                }],
                options: {
                    maintainAspectRatio: false,
                    tooltips: {
                      backgroundColor: "rgb(255,255,255)",
                      bodyFontColor: "#858796",
                      borderColor: '#dddfeb',
                      borderWidth: 1,
                      xPadding: 15,
                      yPadding: 15,
                      displayColors: false,
                      caretPadding: 10,
                    },
                    legend: {
                      display: false
                    },
                    cutoutPercentage: 80,
                },
            }

            new Chart('modelsChart', {type: 'doughnut', data})
        }


        const renderYearsChart = monthly => {

            const ingresos = monthly.monthlyResumeResponseDTOList.map(monthly => monthly.totalInvoiced);
            const egresos = monthly.monthlyResumeResponseDTOList.map(monthly => monthly.totalExpenses);

            ingresos.reverse();

            egresos.reverse();

            console.log(ingresos);

            const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']

            const data = {
                labels: months,
                datasets: [{
                    label: 'Facturacion',
                    data: ingresos,
                    tension: .5,
                    bordercolor: getDataColors(1),
                    backgroundColor: getDataColors(20)[3],
                    fill: true,
                    pointBorderWith: 5,
                },
                {
                    label: 'egresos',
                    data: egresos,
                    tension: .5,
                    bordercolor: getDataColors(3),
                    backgroundColor: getDataColors(20)[4],
                    fill: true,
                    pointBorderWith: 5,
                }]
            }

            new Chart('yearsChart', {type: 'line', data})




        }

        const renderIVAChart = monthly => {

            const ivaPurchase = monthly.monthlyResumeResponseDTOList.map(monthly => monthly.totalIVAPurchase);
            const ivaSales = monthly.monthlyResumeResponseDTOList.map(monthly => monthly.totalIVASales);

            ivaPurchase.reverse();
            ivaSales.reverse();

            function compareNumeric(a, b) {
                if (a > b) return 1;
                if (a === b) return 0;
                if (a < b) return -1;
            }


            const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']

            const data = {
                labels: months,
                datasets: [{
                    label: 'IVA compras',
                    data: ivaPurchase,
                    tension: .5,
                    bordercolor: getDataColors(1),
                    backgroundColor: getDataColors(20),
                    fill: true,
                    pointBorderWith: 5,
                },
                    {
                        label: 'IVA ventas',
                        data: ivaSales,
                        tension: .5,
                        bordercolor: getDataColors(3),
                        backgroundColor: getDataColors(20),
                        fill: true,
                        pointBorderWith: 5,
                    }]
            }

            new Chart('IVA', {type: 'line', data})




}


async function projectspercent() {
    const request = await fetch('http://localhost:8080/api/project', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.token,
            'Content-Type': 'application/json'
        },
    });
    const response = await request.json();

    const a= response.map(item => item.name);
    const b = response.map(item => item.percentageOfCompletion)
    console.log(a)
    console.log(b)

    const data = {
        labels: a,
        datasets: [{
            axis: 'y',
            label: "proyecto completado",
            data: b,
            fill: true,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
            ],
            borderWidth: 1
        }]
    };

    const options = {
        indexAxis: 'y',
        maxBarThickness: 40,
        offset:true,
    }
    new Chart('progress', {type: 'bar', data, options})

}
async function mostrar() {
    const request = await fetch('api/project', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.token,
            'Content-Type': 'application/json'
        },
    });
    const response = await request.json();
    return response;
}
if (localStorage.token == null) {
   console.log('Inicie Sesion para visualizar la informacion')
} else {
   printCharts()
   mostrar()
   projectspercent()
}









