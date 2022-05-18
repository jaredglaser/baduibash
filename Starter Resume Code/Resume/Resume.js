
const listOfUIElements = ["slider","map"];
var map;
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
        evt.preventDefault();
        showUIElement('map');
        
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