
const listOfUIElements = ["slider","map","resume-name-box","resume-dob-box","resume-email-box","resume-phone-box","map-box",];
var map;
var currentID = 'resume-name-box';

function toggle_visibility(id) {
    showUIElement(id);
}

function showValue(newValue) {
    newValue = newValue.padStart(10, "0");
    newValue = "(" + newValue.slice(0, 3) + ") " + newValue.slice(3, 6) + "-" + newValue.slice(6, 10);
    document.getElementById("phone").value = newValue;
}

function changeJobTitle(job) {
    document.getElementById("job-title").value = job;
}

function showUIElement(toShow){
    //first hide all elements
    hideUIElements();
    $('#input-box').show();
    $('#'+toShow).show();
    map.updateSize();
    return false;
}

function hideUIElements(){
  for(const element of listOfUIElements){
    $('#'+element).hide();
}
}

function reverseGeocode(coords) {
    console.log(coords);
    fetch('http://nominatim.openstreetmap.org/reverse?format=json&lon=' + coords[0] + '&lat=' + coords[1])
      .then(function(response) {
             return response.json();
         }).then(function(json) {
          $('#addressinput').prop('disabled',false);
                $('#addressinput').val(json.display_name);
                $('#addressinput').prop('disabled',true);
         });
 }
 $(document).ready(function () {
  $('#input-box').hide();
  $('#addressinput').prop('disabled',true);
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
      map.on('singleclick', function(evt) {
        var coordinate = evt.coordinate;
        console.log(ol.coordinate);
        var hdms = ol.proj.toLonLat(
            coordinate);
    
        console.log(hdms);
        reverseGeocode(hdms);
      });
      $('#setAddress').on('click', function(evt) {

        showUIElement('map-box');
        evt.preventDefault();
        
      })
      $('addressinput').on('click', function(evt){
        evt.preventDefault();
      })
     
     
    
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


