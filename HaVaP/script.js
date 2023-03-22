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

  if (Fuel_metricke > max_fuel_kg) {
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
    html2canvas(document.querySelector("#letovaObalka")).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [210, 297], // A4 page size
      });
  
      const scaleFactor = doc.internal.pageSize.width / (canvas.width * 2.5);
      //Letová obálka
      doc.addImage(
        imgData,
        "PNG",
        20, //os x
        20 * scaleFactor + 120, //os y
        canvas.width * scaleFactor, //width
        canvas.height * scaleFactor //height
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
      var headers2 = [['Outputs', "Value", "Units"]];
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
  
      doc.setFontSize(18);
      doc.setFont("Helvetica", "bold");
      doc.text("Mass & Balance DA-20 Katana", 
      doc.internal.pageSize.width / 2, 25, { align: "center" }); // Update the y coordinate to 25
      doc.setFontSize(9);
      doc.setFont("Helvetica", "bold");    
      doc.text("mabap.netlify.app", doc.internal.pageSize.width / 2, 35, { align: "center" }); // Update the y coordinate to 35
      doc.setFontSize(6);
      doc.setFont("Helvetica");
      doc.setTextColor("gray");
      doc.text("Matúš Ištók", doc.internal.pageSize.width / 2, 280, { align: "center" }); // Update the y coordinate to 35
      doc.text("Faculty of Aeronautics, Department of Flight Training, TUKE", doc.internal.pageSize.width / 2, 285, { align: "center" }); // Update the y coordinate to 35
      doc.text("Košice 2023", doc.internal.pageSize.width / 2, 290, { align: "center" }); // Update the y coordinate to 35
    //Uloženie PDF
    doc.save("DA-20_MaBaP_"+date.value.toString()+".pdf");
  });
}
