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

//Globálne prepínače jednotiek
let units = document.getElementById("units_id");
const unit_change = document.querySelectorAll('select[name="unitChange"]');
//Prepínače jednotiek vstupy
let airEmptMassUnits = document.getElementById("units_AirEmptMass_id");
let airEmptMassMomentUnits = document.getElementById("units_AirEmptMoment_id");
let units_pilot = document.getElementById("units_pilot_id");
let units_copilot = document.getElementById("units_copilot_id");
let units_Baggage = document.getElementById("units_Baggage_id");
let units_Fuel = document.getElementById("units_Fuel_id");
//Prepínače jednotiek vystupy
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

//Konštanty v imperiálnych hodnotách momentálne nepoužívané
//const stredna_aerodynamicka_tetiva_imp = 42.9;
//const limita_polohy_taziska_vpredu_imp = 9.84;
//const limita_polohy_taziska_vzadu_imp = 15.35;
//const piloti_ARM_imp=5.63;
//const batozinovy_priestor_ARM_imp = 32.44;
//const palivo_ARM_imp=32.44;

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
    date.value= today;
};

//Event listener pre zmenu hodnôt v input boxoch
pilot.addEventListener('input', prepocet_imperialne_na_metricke);
copilot.addEventListener('input', prepocet_imperialne_na_metricke);
airemptmass.addEventListener('input', prepocet_imperialne_na_metricke);
airemptmoment.addEventListener('input', prepocet_imperialne_na_metricke);
Baggage.addEventListener('input', prepocet_imperialne_na_metricke);
Fuel.addEventListener('input', prepocet_imperialne_na_metricke);

pilot.addEventListener('input', prepocet_metricke_na_imperialne);
copilot.addEventListener('input', prepocet_metricke_na_imperialne);
airemptmass.addEventListener('input', prepocet_metricke_na_imperialne);
airemptmoment.addEventListener('input', prepocet_metricke_na_imperialne);
Baggage.addEventListener('input', prepocet_metricke_na_imperialne);
Fuel.addEventListener('input', prepocet_metricke_na_imperialne);

pilot.addEventListener('input', updateResults);
copilot.addEventListener('input', updateResults);
airemptmass.addEventListener('input', updateResults);
airemptmoment.addEventListener('input', updateResults);
Baggage.addEventListener('input', updateResults);
Fuel.addEventListener('input', updateResults);

pilot.addEventListener('input', updateChart);
copilot.addEventListener('input', updateChart);
airemptmass.addEventListener('input', updateChart);
airemptmoment.addEventListener('input', updateChart);
Baggage.addEventListener('input', updateChart);
Fuel.addEventListener('input', updateChart);

//Update výsledkov keď sa hodnoty v input boxoch zmenia, funkcia
function updateResults() {
    //Výpočty v pozadí
    vypocet_paliva.value = vypocet_paliva_funkcia();
    celkovy_moment.value = vypocet_celkoveho_momentu_funkcia();
    //Výpočty aj renderované
    vaha_vypocet.value = vypocet_vahy_hodnota;
    vaha_vypocet_0fuel.value = vypocet_vahy_0fuel_hodnota;
    pozicia_taziska.value = pozicia_taziska_hodnota;
    pozicia_taziska_0fuel.value = pozicia_taziska_0fuel_hodnota;
    pozicia_taziska_SAT.value = vypocet_pozicie_taziska_SAT_funkcia().toFixed(2);
    pozicia_taziska_SAT_0fuel.value = vypocet_pozicie_taziska_SAT_0fuel_funkcia().toFixed(2);
}

//Event listener pre zmenu vyberJednotiek
units.addEventListener('change', function() {
    const selectedValue = this.value;

//Globálna zmena jednotiek
  //Metric
  if (selectedValue === 'Metric') {
    //Nastavenie všetkých select boxov na metric
    for (let i = 0; i < unit_change.length; i++) {
        unit_change[i].value = 'Metric';
    }
    prepocet_metricke_na_imperialne();
    prepocet_imperialne_na_metricke();
    updateResults();
  }
  
  //Imperial
  if (selectedValue === 'Imperial') {
    //Nastavenie všetkých select boxov na imperial
    for (let i = 0; i < unit_change.length; i++) {
        unit_change[i].value = 'Imperial';
    }
    prepocet_metricke_na_imperialne();
    prepocet_imperialne_na_metricke();
    updateResults();
  }
  
  //Nastavenie všetkých select boxov na hybrid
  if (selectedValue === 'Hybrid') {
    airEmptMassUnits.value = 'Imperial';
    airEmptMassMomentUnits.value = 'Imperial';
    units_pilot.value = 'Imperial';
    units_copilot.value = 'Imperial';
    units_Baggage.value = 'Imperial';
    units_Fuel.value = 'Metric';
    units_vaha_vypocet.value = 'Imperial';
    units_vaha_vypocet_0fuel.value = 'Imperial';
    units_pozicia_taziska.value = 'Metric';
    units_pozicia_taziska_0fuel.value = 'Metric';
    prepocet_metricke_na_imperialne();
    prepocet_imperialne_na_metricke();
    updateResults();
  }
});

//Dožadovanie sa momentálne zvolených jednotiek pre jednotlivé input boxy
//prepočty v pozadí na metrické jednotky
let airEmptMass_metricke;
let airEmptMassMoment_metricke;
let pilot_metricke;
let copilot_metricke;
let Baggage_metricke;
let Fuel_metricke;

function prepocet_imperialne_na_metricke(){
  //Prázdna váha
  if (airEmptMassUnits.value === "Imperial"){
    if(airemptmass.value == 530){
      airemptmass.value = airemptmass.value*2.2046226218;
    }
    airEmptMass_metricke = parseFloat(airemptmass.value)*0.45359237;
  }
  else if (airEmptMassUnits.value === "Metric"){
    if(airemptmass.value > 730){
      airemptmass.value = 530;
    }
    airEmptMass_metricke = parseFloat(airemptmass.value)*1;
  }
  //moment prázdnej váhy
  if (airEmptMassMomentUnits.value === "Imperial"){
    if(airemptmoment.value == 160590){
      airemptmoment.value = airemptmoment.value*0.0088507457913;
    }
    airEmptMassMoment_metricke = parseFloat(airemptmoment.value)*112.98;
  }
  else if (airEmptMassMomentUnits.value === "Metric"){
    if(airemptmoment.value == 1421.3412666248669){
      airemptmoment.value = 160590;
    }
    airEmptMassMoment_metricke = parseFloat(airemptmoment.value)*1;
  }
  //pilot
  if (units_pilot.value === "Imperial"){
    pilot_metricke = parseFloat(pilot.value)*0.45359237;
  }
  else if (units_pilot.value === "Metric"){
    pilot_metricke = parseFloat(pilot.value)*1;
  }
  //copilot
  if (units_copilot.value === "Imperial"){
    copilot_metricke = parseFloat(copilot.value)*0.45359237;
  }
  else if (units_copilot.value === "Metric"){
    copilot_metricke = parseFloat(copilot.value)*1;
  }
  //Baggage
  if (units_Baggage.value === "Imperial"){
    Baggage_metricke = parseFloat(Baggage.value)*0.45359237;
  }
  else if (units_Baggage.value === "Metric"){
    Baggage_metricke = parseFloat(Baggage.value)*1;
  }
  //Fuel (nakoniec prepočítava z USgal do l a následne do kg)
  if (units_Fuel.value === "Imperial"){
    Fuel_metricke = parseFloat(Fuel.value)*3.785411784*0.72;
  }
  else if (units_Fuel.value === "Metric"){
    Fuel_metricke = parseFloat(Fuel.value)*0.72;
  }
}

let vypocet_vahy_hodnota;
let vypocet_vahy_0fuel_hodnota;
let pozicia_taziska_hodnota;
let pozicia_taziska_0fuel_hodnota;
//Hodnoty pre upravenie letovej obálky pre imperiálne jednotky
let setx;
let sety;

function prepocet_metricke_na_imperialne(){
  //Výpočet váhy TO
  if (units_vaha_vypocet.value === "Imperial"){
    vypocet_vahy_hodnota = (vypocet_vahy_lietadla_funkcia()*2.2046226218).toFixed(2);
    
    if (airEmptMassUnits.value === "Imperial"){
    setx = airemptmass.value;
    sety = 1609
    }
    else if (airEmptMassUnits.value === "Metric"){
    setx = airemptmass.value*2.2046226218;
    sety = 1609
    }

  }
  else if (units_vaha_vypocet.value === "Metric"){
    vypocet_vahy_hodnota = vypocet_vahy_lietadla_funkcia().toFixed(2);
    
    if (airEmptMassUnits.value === "Imperial"){
      setx = airemptmass.value*0.45359237;
      sety = 730
      }
      else if (airEmptMassUnits.value === "Metric"){
      setx = airemptmass.value;
      sety = 730
      }  

  }
  //Výpočet váhy 0fuel
  if (units_vaha_vypocet_0fuel.value === "Imperial"){
    vypocet_vahy_0fuel_hodnota = (vypocet_vahy_lietadla_0fuel_funkcia()*2.2046226218).toFixed(2);
  }
  else if (units_vaha_vypocet_0fuel.value === "Metric"){
    vypocet_vahy_0fuel_hodnota = vypocet_vahy_lietadla_0fuel_funkcia().toFixed(2);
  }
  //Pozícia Ťažiska na SAT
  if (units_pozicia_taziska.value === "Imperial"){
    pozicia_taziska_hodnota = (vypocet_pozicie_taziska_funkcia()*0.0393701).toFixed(2);
  }
  else if (units_pozicia_taziska.value === "Metric"){
    pozicia_taziska_hodnota = vypocet_pozicie_taziska_funkcia().toFixed(2);
  }
  //Pozícia Ťažiska na SAT 0fuel
  if (units_pozicia_taziska_0fuel.value === "Imperial"){
    pozicia_taziska_0fuel_hodnota = (vypocet_pozicie_taziska_0fuel_funkcia()*0.0393701).toFixed(2);
  }
  else if (units_pozicia_taziska_0fuel.value === "Metric"){
    pozicia_taziska_0fuel_hodnota = vypocet_pozicie_taziska_0fuel_funkcia().toFixed(2);
  }
}

//Letová obálka
//Inicializujeme novú premennú tabulky
var chart = null; 

function updateChart() {
  var vaha_units = units_vaha_vypocet.value;
  var yMin = vaha_units === "Imperial" ? 1100 : 500;
  var yMax = vaha_units === "Imperial" ? 1700 : 780;

  var ctx = document.getElementById('myChart').getContext('2d');
  
  //Starú tabulku zničíme
  if (chart !== null) {
    chart.destroy();
  }
  
  //Vytvoríme novú tabulku
  chart = new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [{
        label: 'Takeoff and 0Fuel',
        data: [],
        backgroundColor: 'red'
      }]
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        x: {
          title: {
            display: true,
            text: '%MAC'
          },
          type: 'linear',
          position: 'bottom',
          suggestedMin: 21,
          suggestedMax: 37
        },
        y: {
          title: {
            display: true,
            text: 'Mass'
          },
          type: 'linear',
          position: 'bottom',
          suggestedMin: yMin,
          suggestedMax: yMax
        }
      }
    },
    plugins: [{
      beforeDraw: function(chart, args, options) {
        var chartArea = chart.chartArea;
        var ctx = chart.ctx;
        var x = chart.scales.x.getPixelForValue(22.9);
        var y = chart.scales.y.getPixelForValue(setx);
        var width = chart.scales.x.getPixelForValue(22.9 + 12.9) - x;
        var height = chart.scales.y.getPixelForValue(sety) - y;
        ctx.fillStyle = 'lightblue';
        ctx.fillRect(x, y, width, height);
        ctx.strokeStyle = 'blue';
        ctx.strokeRect(x, y, width, height);
      }
    }]
  });

  setInterval(function() {
      var dot1_x = vypocet_vahy_hodnota;
      var dot1_y = vypocet_pozicie_taziska_SAT_funkcia();
      if (units_vaha_vypocet.value === "Imperial" && units_vaha_vypocet_0fuel.value === "Metric"){
        var dot2_x = vypocet_vahy_0fuel_hodnota*2.2046226218;
      }
      else if (units_vaha_vypocet.value === "Metric" && units_vaha_vypocet_0fuel.value === "Imperial"){
        var dot2_x = vypocet_vahy_0fuel_hodnota*0.45359237;
      }
      else {
        var dot2_x = vypocet_vahy_0fuel_hodnota;
      }
      var dot2_y = vypocet_pozicie_taziska_SAT_0fuel_funkcia();
      chart.data.datasets[0].data = [          
        {x: dot1_y, y: dot1_x},          
        {x: dot2_y, y: dot2_x}
      ];
      chart.update();
  }, 1500);
}

updateChart();

units_vaha_vypocet.addEventListener('change', function() {
  updateChart();
});

//Vzorce funkcie
function vypocet_paliva_funkcia(){
    return Fuel_metricke;
}

function vypocet_vahy_lietadla_funkcia(){
    return airEmptMass_metricke+pilot_metricke+copilot_metricke + Baggage_metricke + vypocet_paliva_funkcia();
}

function vypocet_vahy_lietadla_0fuel_funkcia(){
    return vypocet_vahy_lietadla_funkcia()-vypocet_paliva_funkcia();
}

function piloti_dokopy_funkcia(){
    return pilot_metricke+copilot_metricke;
}

function vypocet_celkoveho_momentu_funkcia(){
    return airEmptMassMoment_metricke+piloti_dokopy_funkcia()*parseFloat(piloti_ARM)+Baggage_metricke*parseFloat(batozinovy_priestor_ARM)+vypocet_paliva_funkcia()*parseFloat(palivo_ARM);
}
function vypocet_celkoveho_momentu_0fuel_funkcia(){
    return airEmptMassMoment_metricke+piloti_dokopy_funkcia()*parseFloat(piloti_ARM)+Baggage_metricke*parseFloat(batozinovy_priestor_ARM);
}

function vypocet_pozicie_taziska_funkcia(){
    return vypocet_celkoveho_momentu_funkcia()/vypocet_vahy_lietadla_funkcia();
}

function vypocet_pozicie_taziska_0fuel_funkcia(){
    return vypocet_celkoveho_momentu_0fuel_funkcia()/vypocet_vahy_lietadla_0fuel_funkcia();
}

function vypocet_pozicie_taziska_SAT_funkcia(){
    return vypocet_pozicie_taziska_funkcia()/1090*100;
}
function vypocet_pozicie_taziska_SAT_0fuel_funkcia(){
    return vypocet_pozicie_taziska_0fuel_funkcia()/1090*100;
}