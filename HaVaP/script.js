//Premenné vstupov
//let vystup =document.getElementById("vystup_id");
let pilot = document.getElementById("pilot_id");
let copilot = document.getElementById("copilot_id");
let airemptmass = document.getElementById("AirEmptMass_id");
let airemptmoment = document.getElementById("AirEmptMoment_id");
let Baggage= document.getElementById("Baggage_id");
let Fuel = document.getElementById("Fuel_id");
let Name_PIC = document.getElementById("Name_PIC_id");
let date = document.getElementById("Date_id");
let units = document.getElementById("units_id");
let regNumber = document.getElementById("Reg_number_id");
//let button1 = document.getElementById("button");
//Premenné výpočtov
let vypocet_paliva = document.getElementById("vypocet_paliva_id");
let vaha_vypocet = document.getElementById("vaha_vypocet_id");
let celkovy_moment = document.getElementById("celkovy_moment_id");
let pozicia_taziska = document.getElementById("pozicia_taziska_id");
let pozicia_taziska_0fuel = document.getElementById("pozicia_taziska_0fuel_id");
let pozicia_taziska_SAT = document.getElementById("pozicia_taziska_SAT_id");
let pozicia_taziska_SAT_0fuel = document.getElementById("pozicia_taziska_SAT_0fuel_id");

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
    vypocet_paliva.value = vypocet_paliva_funkcia().toFixed(2);
    vaha_vypocet.value = vypocet_vahy_lietadla_funkcia().toFixed(2);
    celkovy_moment.value = vypocet_celkoveho_momentu_funkcia().toFixed(2);
    pozicia_taziska.value = vypocet_pozicie_taziska_funkcia().toFixed(2);
    pozicia_taziska_0fuel.value = vypocet_pozicie_taziska_0fuel_funkcia().toFixed(2);
    pozicia_taziska_SAT.value = vypocet_pozicie_taziska_SAT_funkcia().toFixed(2);
    pozicia_taziska_SAT_0fuel.value = vypocet_pozicie_taziska_SAT_0fuel_funkcia().toFixed(2);
  }

function vypis (){
    vypocet_paliva = vypocet_paliva_funkcia();
    vypocet_vahy_lietadla = vypocet_vahy_lietadla_funkcia();
    celkovy_moment = vypocet_celkoveho_momentu_funkcia();
    pozicia_taziska = vypocet_pozicie_taziska_funkcia();
    
    vypocet_paliva.value = vypocet_paliva;
    vaha_vypocet.value = vypocet_vahy_lietadla;
    celkovy_moment.value = celkovy_moment;
    pozicia_taziska.value = pozicia_taziska;

}

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

function piloti_dokopy_funkcia(){
    return parseFloat(pilot.value)+parseFloat(copilot.value)
}

function vypocet_celkoveho_momentu_funkcia(){
    return parseFloat(airemptmoment.value)+piloti_dokopy_funkcia()*parseFloat(piloti_ARM)+parseFloat(Baggage.value)*parseFloat(batozinovy_priestor_ARM)+vypocet_paliva_funkcia()*parseFloat(palivo_ARM)
}
function vypocet_celkoveho_momentu_0fuel_funkcia(){
    return parseFloat(airemptmoment.value)+piloti_dokopy_funkcia()*parseFloat(piloti_ARM)+parseFloat(Baggage.value)*parseFloat(batozinovy_priestor_ARM)+0*parseFloat(palivo_ARM)
}

function vypocet_pozicie_taziska_funkcia(){
    return vypocet_celkoveho_momentu_funkcia()/vypocet_vahy_lietadla_funkcia()
}

function vypocet_pozicie_taziska_0fuel_funkcia(){
    return vypocet_celkoveho_momentu_0fuel_funkcia()/vypocet_vahy_lietadla_funkcia()
}

function vypocet_pozicie_taziska_SAT_funkcia(){
    return vypocet_pozicie_taziska_funkcia()/1090*100
}
//Vypisuje chybný údaj
function vypocet_pozicie_taziska_SAT_0fuel_funkcia(){
    return vypocet_pozicie_taziska_0fuel_funkcia()/1090*100
}





