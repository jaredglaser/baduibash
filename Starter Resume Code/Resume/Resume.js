
const listOfUIElements = ["slider","map"];

function showUIElement(toShow){
    //first hide all elements
    for(const element of listOfUIElements){
        $('#'+element).hide();
    }
    $('#'+toShow).show();
}

function reverseGeocode(coords) {
    console.log(coords);
    fetch('http://nominatim.openstreetmap.org/reverse?format=json&lon=' + coords[0] + '&lat=' + coords[1])
      .then(function(response) {
             return response.json();
         }).then(function(json) {
             console.log(json);
             if(json.address.city != null){
                console.log(json.address.city);
             }
             else if(json.address.town != null){
                console.log(json.address.town);
             }
             else{
                 console.log(json.address.state);
             }
         });
 }
 $(document).ready(function () {
    var map = new ol.Map({
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