//Premenné vstupov
//let vystup = document.getElementById("vystup_id");
let pilot = document.getElementById("pilot_id");
let copilot = document.getElementById("copilot_id");
let airemptmass = document.getElementById("AirEmptMass_id");
let airemptmoment = document.getElementById("AirEmptMoment_id");
let Baggage= document.getElementById("Baggage_id");
let Fuel = document.getElementById("Fuel_id");
let Name_PIC = document.getElementById("Name_PIC_id");
let date = document.getElementById("Date_id");
let regNumber = document.getElementById("Reg_number_id");
//let button1 = document.getElementById("button");

//Premenné výpočtov
let vypocet_paliva = document.getElementById("vypocet_paliva_id");
let vaha_vypocet = document.getElementById("vaha_vypocet_id");
let vaha_vypocet_0fuel = document.getElementById("vaha_vypocet_0fuel_id");
let celkovy_moment = document.getElementById("celkovy_moment_id");
let pozicia_taziska = document.getElementById("pozicia_taziska_id");
let pozicia_taziska_0fuel = document.getElementById("pozicia_taziska_0fuel_id");
let pozicia_taziska_SAT = document.getElementById("pozicia_taziska_SAT_id");
let pozicia_taziska_SAT_0fuel = document.getElementById("pozicia_taziska_SAT_0fuel_id");

//Prepínače jednotiek
let units = document.getElementById("units_id");
const unit_change = document.querySelectorAll('select[name="unitChange"]');
//vstupy
let airEmptMassUnits = document.getElementById("units_AirEmptMass_id");
let airEmptMassMomentUnits = document.getElementById("units_AirEmptMoment_id");
let units_pilot = document.getElementById("units_pilot_id");
let units_copilot = document.getElementById("units_copilot_id");
let units_Baggage = document.getElementById("units_Baggage_id");
let units_Fuel = document.getElementById("units_Fuel_id");
//vystupy
let units_vaha_vypocet = document.getElementById("units_vaha_vypocet_id");
let units_vaha_vypocet_0fuel = document.getElementById("units_vaha_vypocet_0fuel_id");
let units_pozicia_taziska = document.getElementById("units_pozicia_taziska_id");
let units_pozicia_taziska_0fuel = document.getElementById("units_pozicia_taziska_0fuel_id");

//Konštanty v metrických hodnotách
const stredna_aerodynamicka_tetiva = 1090;
const limita_polohy_taziska_vpredu = 250;
const limita_polohy_taziska_vzadu = 390;
const piloti_ARM=143;
const batozinovy_priestor_ARM = 824;
const palivo_ARM=824;

//Konštanty v imperiálnych hodnotách
const stredna_aerodynamicka_tetiva_imp = 42.9;
const limita_polohy_taziska_vpredu_imp = 9.84;
const limita_polohy_taziska_vzadu_imp = 15.35;
const piloti_ARM_imp=5.63;
const batozinovy_priestor_ARM_imp = 32.44;
const palivo_ARM_imp=32.44;

//max-min
const max_gross_weight = 730;
const max_baggage_weight = 20;
const min_fuel_kg = 15;
const max_fuel_kg = 59.28;
const min_pilot_weight = 55;

//Current datum
window.onload =(event) => {
    var date1 = new Date();
    var day = date1.getDate();
    var month = date1.getMonth() + 1;
    var year = date1.getFullYear();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    var today = year + "-" + month + "-" + day;
    date.value= today
}

//Event listener pre zmenu hodnôt v input boxoch
pilot.addEventListener('input', updateResults);
copilot.addEventListener('input', updateResults);
airemptmass.addEventListener('input', updateResults);
airemptmoment.addEventListener('input', updateResults);
Baggage.addEventListener('input', updateResults);
Fuel.addEventListener('input', updateResults);

//Update výsledkov keď sa hodnoty v input boxoch zmenia, funkcia
function updateResults() {
    //Výpočty v pozadí
    vypocet_paliva.value = vypocet_paliva_funkcia().toFixed(2);
    celkovy_moment.value = vypocet_celkoveho_momentu_funkcia().toFixed(2);
    //Výpočty aj renderované
    vaha_vypocet.value = vypocet_vahy_lietadla_funkcia().toFixed(2);
    vaha_vypocet_0fuel.value = vypocet_vahy_lietadla_0fuel_funkcia().toFixed(2);
    pozicia_taziska.value = vypocet_pozicie_taziska_funkcia().toFixed(2);
    pozicia_taziska_0fuel.value = vypocet_pozicie_taziska_0fuel_funkcia().toFixed(2);
    pozicia_taziska_SAT.value = vypocet_pozicie_taziska_SAT_funkcia().toFixed(2);
    pozicia_taziska_SAT_0fuel.value = vypocet_pozicie_taziska_SAT_0fuel_funkcia().toFixed(2);
}

//Event listener pre zmenu vyberJednotiek
units.addEventListener('change', function() {
    const selectedValue = this.value;

//Globálna zmena jednotiek
  // Metric case
  if (selectedValue === 'Metric') {
    // Set all sub select boxes to "metric"
    for (let i = 0; i < unit_change.length; i++) {
        unit_change[i].value = 'Metric';
    }
  }
  
  // Imperial case
  if (selectedValue === 'Imperial') {
    // Set all sub select boxes to "imperial"
    for (let i = 0; i < unit_change.length; i++) {
        unit_change[i].value = 'Imperial';
    }
  }
  
  // Hybrid case
  if (selectedValue === 'Hybrid') {
    airEmptMassUnits.value = 'Imperial';
    airEmptMassMomentUnits.value = 'Imperial';
    units_pilot.value = 'Imperial';
    units_copilot.value = 'Imperial';
    units_Baggage.value = 'Imperial';
    units_Fuel.value = 'Metric';
    units_vaha_vypocet.value = 'Imperial';
    units_vaha_vypocet_0fuel.value = 'Metric';
    units_pozicia_taziska.value = 'Metric';
    units_pozicia_taziska_0fuel.value = 'Imperial';
  }
});

//Dožadovanie sa momentálne zvolených jednotiek pre jednotlivé výpočty

//Letová obálka
var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
  type: 'scatter',
  data: {
    datasets: [{
      label: '',
      data: [],
      backgroundColor: 'red'
    }]
  },
  options: {
    tooltips: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      titleFontSize: 16,
      bodyFontSize: 14
    },
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        suggestedMin: 21,
        suggestedMax: 37
      },
      y: {
        type: 'linear',
        position: 'bottom',
        suggestedMin: 520,
        suggestedMax: 780
      }
    }
  },
  plugins: [{
    beforeDraw: function(chart, args, options) {
      var chartArea = chart.chartArea;
      var ctx = chart.ctx;
      var x = chart.scales.x.getPixelForValue(22.9);
      var y = chart.scales.y.getPixelForValue(airemptmass.value);
      var width = chart.scales.x.getPixelForValue(22.9 + 12.9) - x;
      var height = chart.scales.y.getPixelForValue(520 + 210) - y;
      ctx.fillStyle = 'lightblue';
      ctx.fillRect(x, y, width, height);
      ctx.strokeStyle = 'blue';
      ctx.strokeRect(x, y, width, height);
    }
  }]  
});

setInterval(function() {
    var dot1_x = vypocet_vahy_lietadla_funkcia();
    var dot1_y = vypocet_pozicie_taziska_SAT_funkcia();
    var dot2_x = vypocet_vahy_lietadla_0fuel_funkcia();
    var dot2_y = vypocet_pozicie_taziska_SAT_0fuel_funkcia();
    chart.data.datasets[0].data = [
        {x: dot1_y, y: dot1_x, label: "TO Weight and Balance"},
        {x: dot2_y, y: dot2_x, label: "0 Fuel Weight and Balance"}    
    ];
    chart.update();
}, 1500);

//Vzorce funkcie
function vypocet_paliva_funkcia(){
    return parseFloat(Fuel.value)*0.72;
}

function vypocet_paliva_funkcia_imp(){
    return parseFloat(Fuel.value)*6;
}

function vypocet_vahy_lietadla_funkcia(){
    return parseFloat(airemptmass.value)+parseFloat(pilot.value)+parseFloat(copilot.value)+parseFloat(Baggage.value)+vypocet_paliva_funkcia()
}

function vypocet_vahy_lietadla_0fuel_funkcia(){
    return vypocet_vahy_lietadla_funkcia()-vypocet_paliva_funkcia()
}

function piloti_dokopy_funkcia(){
    return parseFloat(pilot.value)+parseFloat(copilot.value)
}

function vypocet_celkoveho_momentu_funkcia(){
    return parseFloat(airemptmoment.value)+piloti_dokopy_funkcia()*parseFloat(piloti_ARM)+parseFloat(Baggage.value)*parseFloat(batozinovy_priestor_ARM)+vypocet_paliva_funkcia()*parseFloat(palivo_ARM)
}
function vypocet_celkoveho_momentu_0fuel_funkcia(){
    return parseFloat(airemptmoment.value)+piloti_dokopy_funkcia()*parseFloat(piloti_ARM)+parseFloat(Baggage.value)*parseFloat(batozinovy_priestor_ARM)
}

function vypocet_pozicie_taziska_funkcia(){
    return vypocet_celkoveho_momentu_funkcia()/vypocet_vahy_lietadla_funkcia()
}

function vypocet_pozicie_taziska_0fuel_funkcia(){
    return vypocet_celkoveho_momentu_0fuel_funkcia()/vypocet_vahy_lietadla_0fuel_funkcia()
}

function vypocet_pozicie_taziska_SAT_funkcia(){
    return vypocet_pozicie_taziska_funkcia()/1090*100
}
function vypocet_pozicie_taziska_SAT_0fuel_funkcia(){
    return vypocet_pozicie_taziska_0fuel_funkcia()/1090*100
}
