

function refresh(){
var data = "";
var textarea = document.getElementById("jsonorfeo");


var data = JSON.parse(textarea.value);
var spacer = " - ";
var linebreak = "<br>";
document.getElementById("mytitle").innerHTML = data.title.concat(spacer).concat(data.pretty_dates);

document.getElementById("artists").innerHTML = data.orchestra.concat(linebreak).concat(data.conductor).concat(linebreak).concat(data.director).concat(linebreak);
document.getElementById("org").innerHTML = data.organizer.name.concat(linebreak).concat(data.organizer.address1).concat(linebreak).concat(data.organizer.address2).concat(linebreak).concat(data.organizer.zipcode).concat(" ").concat(data.organizer.city); 
document.getElementById("hotel").innerHTML = data.accommodation; 

var i;
var myrow;
var myprogram;
var jour;
function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
// START PLANNING
var eventtype;
for (i = 0; i < data.periods.length; i++) {
  var eventtype = undefined;
  var heureStart = new Date(data.periods[i].start_datetime);
  var heureEnd = new Date(data.periods[i].end_datetime);
  heureStarth = addZero(heureStart.getHours());
  heureStartm = addZero(heureStart.getMinutes());
  heureStart = heureStarth + 'h' + heureStartm;
  heureEndh = addZero(heureEnd.getHours());
  heureEndm = addZero(heureEnd.getMinutes());
  heureEnd = heureEndh + 'h' + heureEndm;
  var options = { weekday: 'short', year: 'numeric', month: 'short', day: '2-digit'};
  var jour = new Date(data.periods[i].start_datetime);
  jour = jour.toLocaleDateString('fr-FR', options);
  var eventtype = data.periods[i].period_type;

if (eventtype == "other"){

  rowcolor = '<tr>';
  } else if (eventtype == "concert") {

 rowcolor = '<tr style="background-color: #00800070">';
};

if (data.periods[i].to_be_confirmed == true) { 
rowcolor = '<tr style="color: red;">';
};
  myrow = rowcolor + '<td>' + jour + '</td><td>' + heureStart + '<br>' + heureEnd + '</td><td>' + data.periods[i].period_type + '</td><td>' +  data.periods[i].notes + '</td><td>' + data.periods[i].title + '</td></tr>'; 
  document.getElementById("planning").insertAdjacentHTML('beforeend', myrow);
 eventtype = undefined;
}; 
// END PLANNING
// START PROGRAMME
for (i=0; i < data.programs.length; i++) {
theprogram =  '<b>' + data.programs[i].work.composer.first_name + ' ' + data.programs[i].work.composer.last_name + ' </b><br><i> ' + data.programs[i].work.title + '</i>' + linebreak;
  document.getElementById("prog").insertAdjacentHTML('beforeend', theprogram) + linebreak + data.programs[i].notes;
};

document.getElementById("prog").insertAdjacentHTML('beforeend', data.program_notes);
// END PROGRAMME
var x;
var contactmedium;
// START CONTACTS

for (i=0; i < data.contacts.length; i++) {
  document.getElementById("contactlist").insertAdjacentHTML('beforeend', linebreak + data.contacts[i].contact.name + linebreak);
  for (x=0; x < data.contacts[i].contact_infos.length; x++){
    if(typeof data.contacts[i].contact_infos[x].value !== "undefined")
{

  if(data.contacts[i].contact_infos[x].type == "mail") {
  var contactmedium = '<span class="fa fa-envelope"></span><span class="value"> ' + data.contacts[i].contact_infos[x].value + '</span>';
};
  if(data.contacts[i].contact_infos[x].type == "phone"){
  var contactmedium = '<span class="fa fa-phone"></span><span class="value"> ' + data.contacts[i].contact_infos[x].value + '</span>';
  };

};   

  contactlist = contactmedium + linebreak;
  document.getElementById("contactlist").insertAdjacentHTML('beforeend', contactlist);
};
};
// END CONTACTS
document.getElementById("planningnotes").innerHTML = data.planning;
}

