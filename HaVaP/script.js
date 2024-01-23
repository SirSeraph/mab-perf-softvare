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
const piloti_ARM=143;
const batozinovy_priestor_ARM = 824;
const palivo_ARM=824;

//max-min
const max_gross_weight_kg = 730;
const max_gross_weight_lbs = 1609;
const max_baggage_weight_kg = 20;
const max_baggage_weight_lbs = 44;
const min_fuel_kg = 15;
const max_fuel_kg = 59.28;
const min_pilot_weight_kg = 55;
const min_pilot_weight_lbs = 121.25;
const max_gross_weight_moment_kg = 204312;
const max_gross_weight_moment_imp = 17744;
const stredna_aerodynamicka_tetiva = 1090;
const limita_polohy_taziska_vpredu = 250;
const limita_polohy_taziska_vzadu = 390;

//Current datum
window.onload =(event) => {
  var date1 = new Date();
  var day = date1.getDate();
  var month = date1.getMonth() + 1;
  var year = date1.getFullYear();
  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;
  var today = year + "-" + month + "-" + day;
  date.value = today;

      //Performance
      flapsUP.value = 41;
      flapsTO.value = 39;
      flapsLDG.value = 37;  
  
      powerSetting2.value==="55";
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

pilot.addEventListener('input', limity);
copilot.addEventListener('input', limity);
airemptmass.addEventListener('input', limity);
airemptmoment.addEventListener('input', limity);
Baggage.addEventListener('input', limity);
Fuel.addEventListener('input', limity);

pilot.addEventListener('input', updateChart);
copilot.addEventListener('input', updateChart);
airemptmass.addEventListener('input', updateChart);
airemptmoment.addEventListener('input', updateChart);
Baggage.addEventListener('input', updateChart);
Fuel.addEventListener('input', updateChart);


//Update prídavných informácií
pilot.addEventListener('input', updateInfo);
copilot.addEventListener('input', updateInfo);
airemptmass.addEventListener('input', updateInfo);
airemptmoment.addEventListener('input', updateInfo);
Baggage.addEventListener('input', updateInfo);
Fuel.addEventListener('input', updateInfo);
Name_PIC.addEventListener('input', updateInfo);
date.addEventListener('input', updateInfo);
regNumber.addEventListener('input', updateInfo);

let namePICValue = "";
let dateValue = "";
let regNumberValue = "";

function updateInfo(){
  namePICValue = Name_PIC.value;
  dateValue = date.value;
  regNumberValue = regNumber.value;
}

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
        flapsUPUnits.value = "Metric";
        flapsTOUnits.value = "Metric";
        flapsLDGUnits.value = "Metric";    
    }
    prepocet_metricke_na_imperialne();
    prepocet_imperialne_na_metricke();
    updateResults();
    VypoctyVykony();
  }
  
  //Imperial
  if (selectedValue === 'Imperial') {
    //Nastavenie všetkých select boxov na imperial
    for (let i = 0; i < unit_change.length; i++) {
        unit_change[i].value = 'Imperial';
        flapsUPUnits.value = "Imperial";
        flapsTOUnits.value = "Imperial";
        flapsLDGUnits.value = "Imperial";
    }
    prepocet_metricke_na_imperialne();
    prepocet_imperialne_na_metricke();
    updateResults();
    VypoctyVykony();
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
    flapsUPUnits.value = "Hybrid";
    flapsTOUnits.value = "Hybrid";
    flapsLDGUnits.value = "Hybrid";
    prepocet_metricke_na_imperialne();
    prepocet_imperialne_na_metricke();
    updateResults();
    VypoctyVykony();
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

//Vypisovanie jednotiek do PDF
let pilotPDF;
let copilotPDF;
let airemptmassPDF;
let airemptmomentPDF;
let BaggagePDF;
let FuelPDF;

function prepocet_imperialne_na_metricke(){
  //Prázdna váha
  if (airEmptMassUnits.value === "Imperial"){
    if(airemptmass.value == 530){
      airemptmass.value = airemptmass.value*2.2046226218;
    }
    airEmptMass_metricke = parseFloat(airemptmass.value)*0.45359237;
    airemptmassPDF = "lbs";
  }
  else if (airEmptMassUnits.value === "Metric"){
    if(airemptmass.value == 1168.449989554){
      airemptmass.value = 530;
    }
    airEmptMass_metricke = parseFloat(airemptmass.value)*1;
    airemptmassPDF = "kg";
  }
  //moment prázdnej váhy
  if (airEmptMassMomentUnits.value === "Imperial"){
    if(airemptmoment.value == 160590){
      airemptmoment.value = airemptmoment.value*0.0088507457913;
    }
    airEmptMassMoment_metricke = parseFloat(airemptmoment.value)*112.98;
    airemptmomentPDF = "in.lbs";
  }
  else if (airEmptMassMomentUnits.value === "Metric"){
    if(airemptmoment.value == 1421.3412666248669){
      airemptmoment.value = 160590;
    }
    airEmptMassMoment_metricke = parseFloat(airemptmoment.value)*1;
    airemptmomentPDF = "kg.mm";
  }
  //pilot
  if (units_pilot.value === "Imperial"){
    pilot_metricke = parseFloat(pilot.value)*0.45359237;
    pilotPDF = "lbs"
  }
  else if (units_pilot.value === "Metric"){
    pilot_metricke = parseFloat(pilot.value)*1;
    pilotPDF = "kg"
  }
  //copilot
  if (units_copilot.value === "Imperial"){
    copilot_metricke = parseFloat(copilot.value)*0.45359237;
    copilotPDF = "lbs"
  }
  else if (units_copilot.value === "Metric"){
    copilot_metricke = parseFloat(copilot.value)*1;
    copilotPDF = "kg"
  }
  //Baggage
  if (units_Baggage.value === "Imperial"){
    Baggage_metricke = parseFloat(Baggage.value)*0.45359237;
    BaggagePDF = "lbs" 
  }
  else if (units_Baggage.value === "Metric"){
    Baggage_metricke = parseFloat(Baggage.value)*1;
    BaggagePDF = "kg"
  }
  //Fuel (nakoniec prepočítava z USgal do l a následne do kg)
  if (units_Fuel.value === "Imperial"){
    Fuel_metricke = parseFloat(Fuel.value)*3.785411784*0.72;
    FuelPDF = "USgal"
  }
  else if (units_Fuel.value === "Metric"){
    Fuel_metricke = parseFloat(Fuel.value)*0.72;
    FuelPDF = "l"
  }
}

let vypocet_vahy_hodnota;
let vypocet_vahy_0fuel_hodnota;
let pozicia_taziska_hodnota;
let pozicia_taziska_0fuel_hodnota;
//Hodnoty pre upravenie letovej obálky pre imperiálne jednotky
let setx;
let sety;
//Vypisovanie jednotiek do PDF
let vaha_vypocetPDF;
let vaha_vypocet_0fuelPDF;
let pozicia_taziskaPDF;
let pozicia_taziska_0fuelPDF;

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
    vaha_vypocetPDF = "lbs";
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
      vaha_vypocetPDF = "kg";
  }
  //Výpočet váhy 0fuel
  if (units_vaha_vypocet_0fuel.value === "Imperial"){
    vypocet_vahy_0fuel_hodnota = (vypocet_vahy_lietadla_0fuel_funkcia()*2.2046226218).toFixed(2);
    vaha_vypocet_0fuelPDF = "lbs";
  }
  else if (units_vaha_vypocet_0fuel.value === "Metric"){
    vypocet_vahy_0fuel_hodnota = vypocet_vahy_lietadla_0fuel_funkcia().toFixed(2);
    vaha_vypocet_0fuelPDF = "kg";
  }
  //Pozícia Ťažiska na SAT
  if (units_pozicia_taziska.value === "Imperial"){
    pozicia_taziska_hodnota = (vypocet_pozicie_taziska_funkcia()*0.0393701).toFixed(2);
    pozicia_taziskaPDF = "in";
  }
  else if (units_pozicia_taziska.value === "Metric"){
    pozicia_taziska_hodnota = vypocet_pozicie_taziska_funkcia().toFixed(2);
    pozicia_taziskaPDF = "mm"
  }
  //Pozícia Ťažiska na SAT 0fuel
  if (units_pozicia_taziska_0fuel.value === "Imperial"){
    pozicia_taziska_0fuel_hodnota = (vypocet_pozicie_taziska_0fuel_funkcia()*0.0393701).toFixed(2);
    pozicia_taziska_0fuelPDF = "in"
  }
  else if (units_pozicia_taziska_0fuel.value === "Metric"){
    pozicia_taziska_0fuel_hodnota = vypocet_pozicie_taziska_0fuel_funkcia().toFixed(2);
    pozicia_taziska_0fuelPDF = "mm"
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
  }, 1000);
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

//Limity hodnôt -> vyfarbenie input boxov pri prekročení limitných hodnôt
function limity(){
  if (parseFloat(airemptmass.value) > max_gross_weight_kg && airEmptMassUnits.value === "Metric") {
    airemptmass.style.backgroundColor = 'red';
    airemptmass.style.borderColor = "red";
  }
  else if (parseFloat(airemptmass.value) > max_gross_weight_lbs && airEmptMassUnits.value === "Imperial") {
    airemptmass.style.backgroundColor = 'red';
    airemptmass.style.borderColor = "red";
  }
  else {
    airemptmass.style.backgroundColor = "white";
    airemptmass.style.borderColor = "white";
  }

  if (parseFloat(airemptmoment.value) > max_gross_weight_moment_kg && airEmptMassMomentUnits.value === "Metric") {
    airemptmoment.style.backgroundColor = 'red';
    airemptmoment.style.borderColor = "red";
  }
  else if (parseFloat(airemptmoment.value) > max_gross_weight_moment_imp && airEmptMassMomentUnits.value === "Imperial") {
    airemptmoment.style.backgroundColor = 'red';
    airemptmoment.style.borderColor = "red";
  }
  else {
    airemptmoment.style.backgroundColor = "white";
    airemptmoment.style.borderColor = "white";
  }

  if (parseFloat(piloti_dokopy_funkcia()) < min_pilot_weight_kg && units_pilot.value === "Metric") {
    pilot.style.backgroundColor = "red";
    pilot.style.borderColor = "red";
    copilot.style.backgroundColor = "red";
    copilot.style.borderColor = "red";
  } else if (parseFloat(piloti_dokopy_funkcia()) < min_pilot_weight_kg && units_pilot.value === "Imperial") {
    pilot.style.backgroundColor = "red";
    pilot.style.borderColor = "red";
    copilot.style.backgroundColor = "red";
    copilot.style.borderColor = "red";
  } else {
    pilot.style.backgroundColor = "white";
    pilot.style.borderColor = "white";
    copilot.style.backgroundColor = "white";
    copilot.style.borderColor = "white";
  }

  if (parseFloat(Baggage.value) > max_baggage_weight_kg && units_Baggage.value === "Metric") {
    Baggage.style.backgroundColor = "red";
    Baggage.style.borderColor = "red";
  } else if (parseFloat(Baggage.value) > max_baggage_weight_lbs && units_Baggage.value === "Imperial"){
    Baggage.style.backgroundColor = "red";
    Baggage.style.borderColor = "red";
  }
  else {
    Baggage.style.backgroundColor = "white";
    Baggage.style.borderColor = "white";
  }

  if (Fuel_metricke > max_fuel_kg || units_Fuel.value === "Metric" && parseFloat(Fuel.value) > 76 || units_Fuel.value === "Imperial" && parseFloat(Fuel.value) > 20.1) {
    Fuel.style.backgroundColor = "red";
    Fuel.style.borderColor = "red";
  } else if (Fuel_metricke < min_fuel_kg){
    Fuel.style.backgroundColor = "orange";
    Fuel.style.borderColor = "orange";
  }
  else {
    Fuel.style.backgroundColor = "white";
    Fuel.style.borderColor = "white";
  }

  if (vypocet_pozicie_taziska_funkcia() > limita_polohy_taziska_vzadu) {
    pozicia_taziska.style.backgroundColor = "red";
    pozicia_taziska.style.borderColor = "red";
    pozicia_taziska_SAT.style.backgroundColor = "red";
    pozicia_taziska_SAT.style.borderColor = "red";
  } else if (vypocet_pozicie_taziska_funkcia() < limita_polohy_taziska_vpredu){
    pozicia_taziska.style.backgroundColor = "red";
    pozicia_taziska.style.borderColor = "red";
    pozicia_taziska_SAT.style.backgroundColor = "red";
    pozicia_taziska_SAT.style.borderColor = "red";
  }
  else {
    pozicia_taziska.style.backgroundColor = "white";
    pozicia_taziska.style.borderColor = "white";
    pozicia_taziska_SAT.style.backgroundColor = "white";
    pozicia_taziska_SAT.style.borderColor = "white";
  }

  if (vypocet_pozicie_taziska_0fuel_funkcia() > limita_polohy_taziska_vzadu) {
    pozicia_taziska_0fuel.style.backgroundColor = "red";
    pozicia_taziska_0fuel.style.borderColor = "red";
    pozicia_taziska_SAT_0fuel.style.backgroundColor = "red";
    pozicia_taziska_SAT_0fuel.style.borderColor = "red";
  } else if (vypocet_pozicie_taziska_0fuel_funkcia() < limita_polohy_taziska_vpredu){
    pozicia_taziska_0fuel.style.backgroundColor = "red";
    pozicia_taziska_0fuel.style.borderColor = "red";
    pozicia_taziska_SAT_0fuel.style.backgroundColor = "red";
    pozicia_taziska_SAT_0fuel.style.borderColor = "red";
  }
  else {
    pozicia_taziska_0fuel.style.backgroundColor = "white";
    pozicia_taziska_0fuel.style.borderColor = "white";
    pozicia_taziska_SAT_0fuel.style.backgroundColor = "white";
    pozicia_taziska_SAT_0fuel.style.borderColor = "white";
  }

  if (parseFloat(vaha_vypocet.value) > max_gross_weight_kg && units_vaha_vypocet.value === "Metric") {
    vaha_vypocet.style.backgroundColor = 'red';
    vaha_vypocet.style.borderColor = "red";
  }
  else if (parseFloat(vaha_vypocet.value) > max_gross_weight_lbs && units_vaha_vypocet.value === "Imperial") {
    vaha_vypocet.style.backgroundColor = 'red';
    vaha_vypocet.style.borderColor = "red";
  }
  else {
    vaha_vypocet.style.backgroundColor = "white";
    vaha_vypocet.style.borderColor = "white";
  }

  if (parseFloat(vaha_vypocet_0fuel.value) > max_gross_weight_kg && units_vaha_vypocet_0fuel.value === "Metric") {
    vaha_vypocet_0fuel.style.backgroundColor = 'red';
    vaha_vypocet_0fuel.style.borderColor = "red";
  }
  else if (parseFloat(vaha_vypocet_0fuel.value) > max_gross_weight_lbs && units_vaha_vypocet_0fuel.value === "Imperial") {
    vaha_vypocet_0fuel.style.backgroundColor = 'red';
    vaha_vypocet_0fuel.style.borderColor = "red";
  }
  else {
    vaha_vypocet_0fuel.style.backgroundColor = "white";
    vaha_vypocet_0fuel.style.borderColor = "white";
  }
}


  function exportDoPDF() {
    const { jsPDF } = window.jspdf;
    const chartDataUrl = chart.toBase64Image();
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [210, 297], // A4 page size
      });
      const aspectRatio = chart.width / chart.height;
      const maxChartWidth = doc.internal.pageSize.width - 40; // 20mm margin on each side
      const chartWidth = Math.min(chart.width, maxChartWidth) / 2;
      const chartHeight = chartWidth / aspectRatio ;
      const scaleFactor = chartWidth / chart.width;
      
      doc.addImage(
        chartDataUrl,
        "PNG",
        20, // x position
        118, // y position
        chartWidth,
        chartHeight
      );
      //Tabulka 1
      var headers = [['Inputs', "Value", "Units"]];
      var data = [
        ['Aircraft Empty Mass: ', airemptmass.value, airemptmassPDF],
        ['Aircraft Empty Mass Moment: ', airemptmoment.value, airemptmomentPDF],
        ['Pilot: ', pilot.value, pilotPDF],
        ['Copilot:  ', copilot.value, copilotPDF],
        ['Baggage:  ', Baggage.value, BaggagePDF],
        ['Fuel:  ', Fuel.value, FuelPDF],
      ];
  
      //Výpočet veľkosti tabuliek
      const maxTableWidth = doc.internal.pageSize.width / 2 - 20
      const table1X = 20;
      const table1Y = 50;
      doc.autoTable({
        head: headers,
        body: data,
        tableWidth: maxTableWidth,
        startY: table1Y,
        margin: { left: table1X },
      });
      //Tabulka 2
      var headers2 = [['Results', "Value", "Units"]];
      var data2 = [
        ['TO Mass:', vaha_vypocet.value, vaha_vypocetPDF],
        ['0 Fuel Mass: ', vaha_vypocet_0fuel.value, vaha_vypocet_0fuelPDF],
        ['GOG TO: ', pozicia_taziska.value, pozicia_taziskaPDF],
        ['0 Fuel COG: ', pozicia_taziska_0fuel.value, pozicia_taziska_0fuelPDF],
        ['COG TO: ', pozicia_taziska_SAT.value, "%"],
        ['0 Fuel COG: ', pozicia_taziska_SAT_0fuel.value, "%"],
      ];
      const table2X = doc.internal.pageSize.width / 2 + 2.5;
      const table2Y = 50;
        doc.autoTable({
        head: headers2,
        body: data2,
        tableWidth: maxTableWidth,
        startY: table2Y,
        margin: { left: table2X },
      });

      //Tabulka 3
      var data3 = [
        ['Registration: ', regNumberValue],
        ['PIC Name: ', namePICValue],
        ['Date: ', dateValue],
        ['Signature:', ""],
        ];
        doc.autoTable({
        body: data3,
        tableWidth: maxTableWidth,
        startY: 125,
        margin: { left: table2X },
      });
      doc.setDrawColor(0, 0, 0);
      doc.line(130, 160, 190, 160);
      //Tabulka 4
      var data4 = [
        ['Time of flight:', ""],
        ];
        doc.autoTable({
        body: data4,
        tableWidth: maxTableWidth - 20,
        startY: 190,
        margin: { left: 20 },
      });
      var data4 = [
        ['Flight route:', ""],
        ];
        doc.autoTable({
        body: data4,
        tableWidth: maxTableWidth +20,
        startY: 190,
        margin: { left: table2X - 20 },
      });

      doc.setFontSize(18);
      doc.setFont("Helvetica", "bold");
      doc.text("Mass & Balance DA-20 Katana", 
      doc.internal.pageSize.width / 2, 25, { align: "center" }); // Posunieme os y do 25
      doc.setFontSize(9);
      doc.setFont("Helvetica", "bold");    
      doc.text("mabap.netlify.app", doc.internal.pageSize.width / 2, 35, { align: "center" }); // Posunieme os y do 35
      doc.setFontSize(6);
      doc.setFont("Helvetica");
      doc.setTextColor("gray");
      doc.text("Matúš Ištók", doc.internal.pageSize.width / 2, 280, { align: "center" }); 
      doc.text("Faculty of Aeronautics, Department of Flight Training, TUKE", doc.internal.pageSize.width / 2, 285, { align: "center" }); 
      doc.text("Košice 2023", doc.internal.pageSize.width / 2, 290, { align: "center" }); 
    //Uloženie PDF
    doc.save("DA-20_MaBaP_"+date.value.toString()+".pdf");
  }


//Alert message
function showMessage() {
  alert("USE AT YOUR OWN RISK!\n\nThe calculations are tested and seem to be correct, but the pilot is solely responsible for accurate weight and balance calculation of his aircraft.\n\nThank you for using my app.❤️");
}
var yourImage = document.getElementById("alert_id");
yourImage.addEventListener("click", showMessage);

//Dropdown
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('dropbtn');
  const contentDiv = document.getElementById('dropdown-content');
  let isButtonClicked=false;
  toggleBtn.addEventListener('click', () => {
    //Zistenie či je boolean true alebo false
    isButtonClicked = !isButtonClicked; 
      if (isButtonClicked) {
        console.log("True")
      } else {
        console.log("False")
      }
    //Show a scroll na spodok dropdown-content
    contentDiv.classList.toggle('show');
    if (contentDiv.classList.contains('show')) {
      window.scrollTo({
        top: contentDiv.offsetTop,
        behavior: 'smooth'
      });
    }
    });
});

//Dropdown content
//Vstupy:
  //Take-off Distance
let airTemperature1 = document.getElementById("airTemperature1");
let airTemperature1Units = document.getElementById("airTemperature1_id");
let airTemperature2 = document.getElementById("airTemperature2");
let airTemperature2Units = document.getElementById("airTemperature2_id");
let airTemperature3 = document.getElementById("airTemperature3");
let airTemperature3Units = document.getElementById("airTemperature3_id");
let additionalInfo = document.getElementById("additionalInfo");

let pressureAltitude = document.getElementById("pressureAltitude");
let pressureAltitude1 = document.getElementById("pressureAltitude1");
let pressureAltitude1Units = document.getElementById("pressureAltitude1_id");
let pressureAltitude2 = document.getElementById("pressureAltitude2");
let pressureAltitude2Units = document.getElementById("pressureAltitude2_id");

let aircraftWeight = document.getElementById("aircraftWeight");
let aircraftWeightUnits = document.getElementById("aircraftWeight_id");
let aircraftWeight1 = document.getElementById("aircraftWeight1");
let aircraftWeight1Units = document.getElementById("aircraftWeight1_id");

let headwindComponent = document.getElementById("headwindComponent");
let headwindComponentUnits = document.getElementById("headwindComponent_id");
let obstacleHeight = document.getElementById("obstacleHeight");
let obstacleHeightUnits = document.getElementById("obstacleHeight_id");
  //Bank angle
let bankAngle = document.getElementById("bankAngle");
let powerSetting = document.getElementById("powerSetting");
  //Flight Time duration
let fuelPerformance = document.getElementById("fuelPerf");
let fuelPerformanceUnits = document.getElementById("fuelUnits_id");
let powerSetting2 = document.getElementById("powerSetting2");

//Výstupy:
let toRollDistance = document.getElementById("toRollDistance");
let toRollDistanceUnits = document.getElementById("toRollDistance_id");
let toRollDistanceClear = document.getElementById("toRollDistanceClear");
let toRollDistanceClearUnits = document.getElementById("toRollDistanceClear_id");
let climbPerformance = document.getElementById("climbPerformance");
let climbPerformanceUnits = document.getElementById("climbPerformance_id");
let flapsUP = document.getElementById("flapsUP");
let flapsUPUnits = document.getElementById("flapsUP_id");
let flapsTO = document.getElementById("flapsTO");
let flapsTOUnits = document.getElementById("flapsTO_id");
let flapsLDG = document.getElementById("flapsLDG");
let flapsLDGUnits = document.getElementById("flapsLDG_id");
let cruisingSpeed = document.getElementById("cruisingSpeed");
let cruisingSpeedUnits = document.getElementById("cruisingSpeed_id");
let flightTime = document.getElementById("flightTime");
let flightTime2 = document.getElementById("flightTime2");


//Funkcia automatického nastavenia hodnôt pre ďalšie výpočty
let temperature = 0;
let altitude = 0;
let weightPerf = 0;
let headwind = 0;
let obstacle = 0;
let altitude2 = 0;
let temperature3 = 0;

let temperaturePrvotne = 0;
let obstaclePrvotne = 0;
let weightPerfPrvotne = 0;

function updateAccordingToTheFirst(){
  //Získavanie number hodnôt zadávaných
  let temperatureString = airTemperature1.value;
  let altitudeString = pressureAltitude.value;
  let weightPerfString = aircraftWeight.value;
  let headwindString = headwindComponent.value;
  let obstacleString = obstacleHeight.value;

  temperaturePrvotne = parseFloat(temperatureString);
  altitude = parseFloat(altitudeString);
  weightPerfPrvotne = parseFloat(weightPerfString);
  headwind = parseFloat(headwindString);
  obstaclePrvotne = parseFloat(obstacleString);
  //Nastavenie according to the first
  airTemperature2.value = temperaturePrvotne;
  airTemperature3.value = temperaturePrvotne;

  pressureAltitude1.value = altitude;
  pressureAltitude2.value = altitude;

  if (vypocet_vahy_hodnota) {
    aircraftWeight.value = vypocet_vahy_hodnota;
  }
  aircraftWeight1.value = aircraftWeight.value;
  if (Fuel_metricke) {
    fuelPerformance.value = parseFloat(Fuel.value);
  }
}

//EventListener pre zmenu hodnôt v inputboxoch
airTemperature1.addEventListener('input', updateAccordingToTheFirst);
pressureAltitude.addEventListener('input', updateAccordingToTheFirst);
aircraftWeight.addEventListener('input', updateAccordingToTheFirst);
headwindComponent.addEventListener('input', updateAccordingToTheFirst);
obstacleHeight.addEventListener('input', updateAccordingToTheFirst);

pilot.addEventListener('input', updateAccordingToTheFirst);
copilot.addEventListener('input', updateAccordingToTheFirst);
airemptmass.addEventListener('input', updateAccordingToTheFirst);
airemptmoment.addEventListener('input', updateAccordingToTheFirst);
Baggage.addEventListener('input', updateAccordingToTheFirst);
Fuel.addEventListener('input', updateAccordingToTheFirst);

let temperature2Prvotne = 0;
let altitude1 = 0;
let weightPerf2 = 0;
let weightPerf2Prvotne = 0;
let temperature2 = 0;
let temperatureString3 = 0;
let fuelPerf = 0;
let fuelPerfPrvotne = 0;

function VypoctyVykonyImperialneNaMetricke(){
  //Temperature 1
  if (airTemperature1Units.value === "Metric"){
    temperature = temperaturePrvotne;
  }
  else if (airTemperature1Units.value === "Imperial"){
    temperature = (temperaturePrvotne-32)*(5/9);
  }
  //Obstacle
  if (obstacleHeightUnits.value === "Metric"){
    obstacle = obstaclePrvotne;
  }
  else if (obstacleHeightUnits.value === "Imperial"){
    obstacle = obstaclePrvotne*0.3048;
  }
  //Weight 1
  if (aircraftWeightUnits.value === "Metric"){
    weightPerf = weightPerfPrvotne;
  }
  else if (aircraftWeightUnits.value === "Imperial"){
    weightPerf = weightPerfPrvotne*0.45359237;
  }

  let airTemperature2String = airTemperature2.value;
  let pressureAltitude1String = pressureAltitude1.value;
  let aircraftWeight1String = aircraftWeight1.value;
  temperature2Prvotne = parseFloat(airTemperature2String);
  altitude1 = parseFloat(pressureAltitude1String);
  weightPerf2Prvotne = parseFloat(aircraftWeight1String);

  //Temperature 2
  if (airTemperature2Units.value === "Metric"){
    temperature2 = temperature2Prvotne;
  }
  else if (airTemperature2Units.value === "Imperial"){
    temperature2 = (temperature2Prvotne-32)*(5/9);
  }
  //Weight 2
  if (aircraftWeight1Units.value === "Metric"){
    weightPerf2 = weightPerf2Prvotne;
  }
  else if (aircraftWeight1Units.value === "Imperial"){
    weightPerf2 = weightPerf2Prvotne*0.45359237;
  }

  //Temperature 3
  temperatureString3 = airTemperature3.value;
  let temperature3Prvotne = parseFloat(temperatureString3);
  if (airTemperature3Units.value === "Metric"){
    temperature3 = temperature3Prvotne;
  }
  else if (airTemperature3Units.value === "Imperial"){
    temperature3 = (temperature3Prvotne-32)*(5/9);
  }

  let fuelPerformanceString = fuelPerformance.value;
  fuelPerfPrvotne = parseFloat(fuelPerformanceString);
  if (fuelPerformanceUnits.value === "Metric"){
    fuelPerf = fuelPerfPrvotne;
  }
  else if (fuelPerformanceUnits.value === "Imperial"){
    fuelPerf = fuelPerfPrvotne*3.785411784;
  }
}

function VypoctyVykony(){
//Výpočty Take-off
let v1 = 0;
let v2 = 0;
let v3 = 0;
let v4 = 0;

//v1
if (altitude = 0 ){
  v1 = (27*temperature)/8+(2350/8);
} 
if (altitude = 1000){
  v1 = Math.pow(44/29, 1/40) ** temperature * 290 * (44/29)**(1/4);
}   
else if(altitude = 2000){
  v1 = Math.pow(25/18, 1/30) ** temperature * 360;
}
else if(altitude = 3000){
  v1 = Math.pow(14/10, 1/30) ** temperature * 400;
}
else if(altitude = 4000){
  v1 = Math.pow(21/15, 1/30) ** temperature * 450;
}
else if(altitude = 5000){
  v1 = Math.pow(72/45, 1/40) ** temperature * 450 * (72/45)**(1/4);
}
else if(altitude = 6000){
  v1 = Math.pow(41/28, 1/30) ** temperature * 560;
}
else if(altitude = 7000){
  v1 = Math.pow(190/113, 1/40) ** temperature * 565 * (190/113)**(1/4);
}
else if(altitude = 8000){
  v1 = Math.pow(97/73, 1/20) ** temperature * 730;
}
else if(altitude = 9000){
  v1 = Math.pow(91/73, 1/15) ** temperature * 730 * (91/73)**(10/15);
}
else if(altitude = 10000){
  v1 = Math.pow(198/169, 1/10) ** temperature * 990;
}

//v2
if (v1 >=200 && v1 <=350){
  v2 = (1/2)*weightPerf- 65 + (v1-300);
}
else if (v1 >350 && v1 <=450){
  v2 = (2/3)*weightPerf - (260/3) + (v1-400);
}
else if (v1 >450 && v1 <=550){
  v2 = weightPerf - 230 + (v1-500);
}
else if (v1 >550 && v1 <=650){
  v2 = weightPerf- 130 + (v1-600);
}
else if (v1 >650 && v1 <=750){
  v2 = (4/3)*weightPerf- (820/3) + (v1-700);
}
else if (v1 >750 && v1 <=850){
  v2 = (5/3)*weightPerf- (1250/3) + (v1-800);
}
else if (v1 >850 && v1 <=950){
  v2 = 2*weightPerf- 560 + (v1-900);
}
else if (v1 >950 && v1 <=1050){
  v2 = (7/3)*weightPerf- (2110/3) + (v1-1000);
}

//v3
if (v2 >=200 && v2 <=350){
  v3 = -8*headwind+ (300 + (v2-300));
}
else if (v2 >350 && v2 <=450){
  v3 = -10*headwind+ (400 + (v2-400));
}
else if (v2 >450 && v2 <=550){
  v3 = -12*headwind+ (500 + (v2-500));
}
else if (v2 >550 && v2 <=650){
  v3 = -14*headwind+ (600 + (v2-600));
}
else if (v2 >650 && v2 <=750){
  v3 = -16*headwind+ (700 + (v2-700));
}
else if (v2 >750 && v2 <=850){
  v3 = -18*headwind+ (800 + (v2-800));
}
else if (v2 >850 && v2 <=950){
  v3 = -20*headwind+ (900 + (v2-900));
}
else if (v2 >950 && v2 <=1050){
  v3 = -22*headwind+ (1000 + (v2-1000));
}

//v4
if (v3 >=200 && v3 <=250){
  v4 = 6*obstacle+ (200 + (v3-200));
}
else if (v3 >250 && v3 <=350){
  v4 = 8.5*obstacle+ (300 + (v3-300));
}
else if (v3 >350 && v3 <=450){
  v4 = 10*obstacle+ (400 + (v3-400));
}
else if (v3 >450 && v3 <=550){
  v4 = 12*obstacle+ (500 + (v3-500));
}
else if (v3 >550&& v3 <=650){
  v4 = 15*obstacle+ (600 + (v3-600));
}
else if (v3 >650 && v3 <=750){
  v4 = 18*obstacle+ (700 + (v3-700));
}

let additionalInfoVar = 0;

  if (additionalInfo.value === "Paved"){
    additionalInfoVar = 1;
  }
  else if (additionalInfo.value === "Grass5"){
    additionalInfoVar = 1.1;
  }
  else if (additionalInfo.value === "Grass5-10"){
    additionalInfoVar = 1.15;
  }
  else if (additionalInfo.value === "Grass10"){
    additionalInfoVar = 1.25;
  }
  else if (additionalInfo.value === "GrassWet"){
    additionalInfoVar = 1.4;
  }

//Výpis výsledkov takeoff distance
if (toRollDistanceUnits.value === "Metric"){
  toRollDistance.value = ((v3)*additionalInfoVar).toFixed(2);
}
else if (toRollDistanceUnits.value === "Imperial"){
  toRollDistance.value = (((v3)*3.2808)*additionalInfoVar).toFixed(2);
}
if (toRollDistanceClearUnits.value === "Metric"){
  toRollDistanceClear.value = ((v4 + obstacle)*additionalInfoVar).toFixed(2);
}
else if (toRollDistanceClearUnits.value === "Imperial"){
  toRollDistanceClear.value = (((v4 + obstacle)*3.2808)*additionalInfoVar).toFixed(2);
}

//Výpočty Climb-performance

let vypocetClimbPerformance1 = -3000 + altitude1 + 100 * temperature2;
let vypocetClimbPerformance3 = (Math.pow(103/117, 1/80)** weightPerf2) * (10300 / ((103 / 117)** (73 / 8)));
let vypocetClimbPerformance2 = (vypocetClimbPerformance3-vypocetClimbPerformance1)/17

  if (climbPerformanceUnits.value==="Metric"){
    climbPerformance.value = parseFloat(vypocetClimbPerformance2).toFixed(2)
  }
  else if(climbPerformanceUnits.value==="Imperial"){
    climbPerformance.value = ((parseFloat(vypocetClimbPerformance2))*0.00508).toFixed(2)
  }

//Výpočty Stall-speed
let bankAngleVypocetString = bankAngle.value;
bankAngleVypocet = parseFloat(bankAngleVypocetString);

if (bankAngleVypocet===0){
  //Flaps UP
  if (flapsUPUnits.value === "Metric"){
    flapsUP.value = 41;
  }
  else if (flapsUPUnits.value === "Imperial"){
    flapsUP.value = 47;
  }
  else if (flapsUPUnits.value === "Hybrid"){
    flapsUP.value = 76;
  }
  //Flaps T/O
  if (flapsTOUnits.value === "Metric"){
    flapsTO.value = 39;
  }
  else if (flapsTOUnits.value === "Imperial"){
    flapsTO.value = 45;
  }
  else if (flapsTOUnits.value === "Hybrid"){
    flapsTO.value = 72;
  }
  //Flaps LDG
  if (flapsLDGUnits.value === "Metric"){
    flapsLDG.value = 37;
  }
  else if (flapsLDGUnits.value === "Imperial"){
    flapsLDG.value = 43;
  }
  else if (flapsLDGUnits.value === "Hybrid"){
    flapsLDG.value = 69;
  }
}
else if (bankAngleVypocet===15){
    //Flaps UP
    if (flapsUPUnits.value === "Metric"){
      flapsUP.value = 43;
    }
    else if (flapsUPUnits.value === "Imperial"){
      flapsUP.value = 49;
    }
    else if (flapsUPUnits.value === "Hybrid"){
      flapsUP.value = 80;
    }
    //Flaps T/O
    if (flapsTOUnits.value === "Metric"){
      flapsTO.value = 41;
    }
    else if (flapsTOUnits.value === "Imperial"){
      flapsTO.value = 47;
    }
    else if (flapsTOUnits.value === "Hybrid"){
      flapsTO.value = 76;
    }
    //Flaps LDG
    if (flapsLDGUnits.value === "Metric"){
      flapsLDG.value = 39;
    }
    else if (flapsLDGUnits.value === "Imperial"){
      flapsLDG.value = 45;
    }
    else if (flapsLDGUnits.value === "Hybrid"){
      flapsLDG.value = 72;
    }
  
}
else if (bankAngleVypocet===30){
    //Flaps UP
    if (flapsUPUnits.value === "Metric"){
      flapsUP.value = 46;
    }
    else if (flapsUPUnits.value === "Imperial"){
      flapsUP.value = 53;
    }
    else if (flapsUPUnits.value === "Hybrid"){
      flapsUP.value = 85;
    }
    //Flaps T/O
    if (flapsTOUnits.value === "Metric"){
      flapsTO.value = 44;
    }
    else if (flapsTOUnits.value === "Imperial"){
      flapsTO.value = 51;
    }
    else if (flapsTOUnits.value === "Hybrid"){
      flapsTO.value = 81;
    }
    //Flaps LDG
    if (flapsLDGUnits.value === "Metric"){
      flapsLDG.value = 41;
    }
    else if (flapsLDGUnits.value === "Imperial"){
      flapsLDG.value = 47;
    }
    else if (flapsLDGUnits.value === "Hybrid"){
      flapsLDG.value = 76;
    }
  
}
else if (bankAngleVypocet===45){
    //Flaps UP
    if (flapsUPUnits.value === "Metric"){
      flapsUP.value = 55;
    }
    else if (flapsUPUnits.value === "Imperial"){
      flapsUP.value = 63;
    }
    else if (flapsUPUnits.value === "Hybrid"){
      flapsUP.value = 101;
    }
    //Flaps T/O
    if (flapsTOUnits.value === "Metric"){
      flapsTO.value = 51;
    }
    else if (flapsTOUnits.value === "Imperial"){
      flapsTO.value = 59;
    }
    else if (flapsTOUnits.value === "Hybrid"){
      flapsTO.value = 94;
    }
    //Flaps LDG
    if (flapsLDGUnits.value === "Metric"){
      flapsLDG.value = 49;
    }
    else if (flapsLDGUnits.value === "Imperial"){
      flapsLDG.value = 56;
    }
    else if (flapsLDGUnits.value === "Hybrid"){
      flapsLDG.value = 91;
    }
  
}
else if (bankAngleVypocet===60){
    //Flaps UP
    if (flapsUPUnits.value === "Metric"){
      flapsUP.value = 69;
    }
    else if (flapsUPUnits.value === "Imperial"){
      flapsUP.value = 79;
    }
    else if (flapsUPUnits.value === "Hybrid"){
      flapsUP.value = 127;
    }
    //Flaps T/O
    if (flapsTOUnits.value === "Metric"){
      flapsTO.value = 63;
    }
    else if (flapsTOUnits.value === "Imperial"){
      flapsTO.value = 72;
    }
    else if (flapsTOUnits.value === "Hybrid"){
      flapsTO.value = 117;
    }
    //Flaps LDG
    if (flapsLDGUnits.value === "Metric"){
      flapsLDG.value = 62;
    }
    else if (flapsLDGUnits.value === "Imperial"){
      flapsLDG.value = 72;
    }
    else if (flapsLDGUnits.value === "Hybrid"){
      flapsLDG.value = 115;
    }
};

//Výpočty Cruising-speed

    let altitudeString2 = pressureAltitude2.value;
    altitude2 = parseFloat(altitudeString2);

    let l1 = -96*temperature3-640;
    let l2 = -(2800/29)*temperature3+(30000/29);
    let l3 = -(375/4)*temperature3+2675;
    let l4 = -(2600/27)*temperature3+(116800/27);
    let l5 = -(2600/27)*temperature3+(163000/27);
    let l6 = -(650/7)*temperature3+(53800/7);
    let l7 = -(2000/21)*temperature3+(197000/21);
    let l8 = -(1600/17)*temperature3+(11000);
    let l9 = -(2000/21)*temperature3+(266400/21);
    let l10 = -(1600/17)*temperature3+(244200/17);
    
    let closestL;
    let closestDiff = Infinity;
    let closestName;
    
    //Vyhladanie najbližšieho čísla
    for (let i = 1; i <= 10; i++) {
      let currentName = 'l' + i; // Zistenie názvu var
      let currentL = eval(currentName); // Zistenie hodnoty var
      let currentDiff = Math.abs(currentL - altitude2); // Rozdiel
    
      // Zistenie najnižšieho rozdielu
      if (currentDiff < closestDiff) {
        closestL = currentL;
        closestDiff = currentDiff;
        closestName = currentName;
      }
    }

    let k = 0;

    if (closestName==="l1"){
      k = -96*30+altitude2+96*temperature3;
    }
    else if (closestName==="l2"){
      k = -(2800/29)*30+altitude2+(2800/29)*temperature3;
    }
    else if (closestName==="l3"){
      k = -(375/4)*30+altitude2+(375/4)*temperature3;
    }
    else if (closestName==="l4"){
      k = -(2600/27)*30+altitude2+(2600/27)*temperature3;
    }
    else if (closestName==="l5"){
      k = -(2600/27)*30+altitude2+(2600/27)*temperature3;
    }
    else if (closestName==="l6"){
      k = -(650/7)*30+altitude2+(650/7)*temperature3;
    }
    else if (closestName==="l7"){
      k = -(2000/21)*30+altitude2+(2000/21)*temperature3;
    }
    else if (closestName==="l8"){
      k = -(1600/17)*30+altitude2+(1600/17)*temperature3;
    }
    else if (closestName==="l9"){
      k = -(2000/21)*30+altitude2+(2000/21)*temperature3;
    }
    else if (closestName==="l10"){
      k = -(1600/17)*30+altitude2+(1600/17)*temperature3;
    }

    let powerSettingValue = powerSetting.value;
    let cruisingSpeedVysledok = 0;

    if (powerSettingValue === "55"){
      if(k>10600){
        cruisingSpeedVysledok= 100.5;
      }
      else{
      cruisingSpeedVysledok = ((17*k + 934900)/11100).toFixed(2)
      }
    }
    else if(powerSettingValue === "60"){
      if(k>9500){
        cruisingSpeedVysledok= 107;
      }
      else{
      cruisingSpeedVysledok = ((2*k + 101487.5)/1125).toFixed(2)
      }
    }
    else if(powerSettingValue === "65"){
      if(k>8000){
        cruisingSpeedVysledok= 112.5;
      }
      else{
      cruisingSpeedVysledok = ((16.5*k + 702200)/7400).toFixed(2)
      }
    }
    else if(powerSettingValue === "75"){
      if(k>6100){
        cruisingSpeedVysledok= 116;
      }
      else{
      cruisingSpeedVysledok = ((k + 44048)/432).toFixed(2)
      }
    }
    else if(powerSettingValue === "85"){
      if(k>3200){
        cruisingSpeedVysledok= 118.5;
      }
      else{
      cruisingSpeedVysledok = ((k + 41262.5)/375).toFixed(2)
      }
    }
    else if(powerSettingValue === "95"){
      if(k>-600){
        cruisingSpeedVysledok= 116.5;
      }
      else{
      cruisingSpeedVysledok = ((k + 42540)/360).toFixed(2)
      }
    }
    //Výpis výsledku
    if (cruisingSpeedUnits.value === "Metric"){
      cruisingSpeed.value = cruisingSpeedVysledok
    }
    else if (cruisingSpeedUnits.value === "Imperial"){
      cruisingSpeed.value = (cruisingSpeedVysledok*1.852).toFixed(2)
    }
  
  //Flight time duration  
  let flightTimeVar = 0;
  if (powerSetting2.value==="55"){
   flightTimeVar = (3/37)*fuelPerf;
  }
  else if (powerSetting2.value==="65"){
   flightTimeVar = (5/72)*fuelPerf;
  }
  else if (powerSetting2.value==="75"){
   flightTimeVar = (2/33)*fuelPerf;
  }
  else if (powerSetting2.value==="85"){
   flightTimeVar = (3/58)*fuelPerf;
  }
  else if (powerSetting2.value==="95"){
   flightTimeVar = (2/45)*fuelPerf;
  }
  function decimalHoursToTime(flightTimeVar) {
    let hours = Math.floor(flightTimeVar);
    let minutes = Math.round((flightTimeVar - hours) * 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }
  function decimalHoursToTimeWithoutReserve(flightTimeVar) {
    let hours = Math.floor(flightTimeVar);
    let minutes = Math.round((flightTimeVar - hours) * 60) - 45;
    if (minutes < 0) {
      hours -= 1;
      minutes += 60;
    }
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }

  flightTime.value = decimalHoursToTimeWithoutReserve(flightTimeVar);
  flightTime2.value = decimalHoursToTime(flightTimeVar);
  
  
}

pressureAltitude.addEventListener('input', VypoctyVykonyImperialneNaMetricke);
airTemperature1.addEventListener('input', VypoctyVykonyImperialneNaMetricke);
aircraftWeight.addEventListener('input', VypoctyVykonyImperialneNaMetricke);
headwindComponent.addEventListener('input', VypoctyVykonyImperialneNaMetricke);
obstacleHeight.addEventListener('input', VypoctyVykonyImperialneNaMetricke);
bankAngle.addEventListener('input', VypoctyVykonyImperialneNaMetricke);
airTemperature3.addEventListener('input', VypoctyVykonyImperialneNaMetricke);
pressureAltitude2.addEventListener('input', VypoctyVykonyImperialneNaMetricke);
airTemperature2.addEventListener('input', VypoctyVykonyImperialneNaMetricke);
pressureAltitude1.addEventListener('input', VypoctyVykonyImperialneNaMetricke);
aircraftWeight1.addEventListener('input', VypoctyVykonyImperialneNaMetricke);
fuelPerformance.addEventListener('input', VypoctyVykonyImperialneNaMetricke);
powerSetting2.addEventListener('input', VypoctyVykonyImperialneNaMetricke);

pressureAltitude.addEventListener('input', VypoctyVykony);
airTemperature1.addEventListener('input', VypoctyVykony);
aircraftWeight.addEventListener('input', VypoctyVykony);
headwindComponent.addEventListener('input', VypoctyVykony);
obstacleHeight.addEventListener('input', VypoctyVykony);
bankAngle.addEventListener('input', VypoctyVykony);
airTemperature3.addEventListener('input', VypoctyVykony);
pressureAltitude2.addEventListener('input', VypoctyVykony);
airTemperature2.addEventListener('input', VypoctyVykony);
pressureAltitude1.addEventListener('input', VypoctyVykony);
aircraftWeight1.addEventListener('input', VypoctyVykony);
fuelPerformance.addEventListener('input', VypoctyVykony);
powerSetting2.addEventListener('input', VypoctyVykony);

