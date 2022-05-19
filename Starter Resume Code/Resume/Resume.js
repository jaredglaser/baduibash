
const listOfUIElements = ["slider", "map", "resume-name-box", "resume-dob-box", "resume-email-box", "resume-phone-box",];
var map;
var currentID = 'resume-name-box';
var slot1 = false;
var intervalId;



function showValue(newValue) {
  newValue = newValue.padStart(10, "0");
  newValue = "(" + newValue.slice(0, 3) + ") " + newValue.slice(3, 6) + "-" + newValue.slice(6, 10);
  document.getElementById("phone").value = newValue;
}

function changeJobTitle(job) {
  document.getElementById("job-title").value = job;
}

function runSlot(id) {
  var i = 0;
  var max = 26;
  if(id == 'job-description' || id == 'email' || id == 'description' ){
    max = 126;
  }
  var oldValue = $('#' + id).val();
  intervalId = window.setInterval(function () {
    $('#' + id).val(oldValue + String.fromCharCode(97 + i++));
    if (i == max) {
      i = 0;
    }
  }, 70);



}

function showUIElement(toShow) {
  //first hide all elements
  hideUIElements();
  $('#input-box').show();
  $('#' + toShow).show();
  map.updateSize();
  return false;
}

function hideUIElements() {
  for (const element of listOfUIElements) {
    $('#' + element).hide();
  }
}

function reverseGeocode(coords) {
  console.log(coords);
  fetch('http://nominatim.openstreetmap.org/reverse?format=json&lon=' + coords[0] + '&lat=' + coords[1])
    .then(function (response) {
      return response.json();
    }).then(function (json) {
      
      $('#addressinput').val(json.display_name);
     
    });
}
$(document).ready(function () {
  $('#input-box').hide();

  hideUIElements();
  map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([37.41, 8.82]),
      zoom: 4
    })
  });
  map.on('singleclick', function (evt) {
    var coordinate = evt.coordinate;
    console.log(ol.coordinate);
    var hdms = ol.proj.toLonLat(
      coordinate);

    console.log(hdms);
    reverseGeocode(hdms);
  });
  $('#setAddress').on('click', function (evt) {

    showUIElement('map-box');
    showUIElement('map');
    evt.preventDefault();

  });
  //$('addressinput').on('click', function (evt) {
 //   evt.preventDefault();
 // });
  $('#phone').on('click', function(evt){
    showUIElement('resume-phone-box');
    
  })
  $('#slot-first-name').on('click', function (evt) {

    slotbuttonMethod('slot-first-name','first-name');

    evt.preventDefault();

  });

  $('#slot-last-name').on('click', function (evt) {

    slotbuttonMethod('slot-last-name','last-name');

    evt.preventDefault();

  });

  $('#slot-email').on('click', function (evt) {

    slotbuttonMethod('slot-email','email');

    evt.preventDefault();

  });

  $('#slot-job-description').on('click', function (evt) {

    slotbuttonMethod('slot-job-description','job-description');

    evt.preventDefault();

  });

  $('#slot-description').on('click', function (evt) {

    slotbuttonMethod('slot-description','description');

    evt.preventDefault();

  });


  function slotbuttonMethod(id1,id2){
    if ($('#'+id1).text() == 'Next') {
      runSlot(id2);
      $('#'+id1).text('Stop');

    }
    else {
      clearInterval(intervalId);
      $(('#'+id1)).text('Next');
    }
    

  }

  



  /*$(map).on('click', function (evt) {
      console.log(map);
      console.log(ol);
     console.log(evt.target.valueAsNumber);
     console.log(evt.target);
     var coord = ol.proj.toLonLat(evt.coordinate);
     console.log(coord);
     reverseGeocode(coord);
   });*/
});


