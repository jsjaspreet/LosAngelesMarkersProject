console.log('\'Allo \'Allo!');
var map;

function initMap() {

  var hollywood = new google.maps.LatLng(34.134208, -118.321548);
  var santamonica = new google.maps.LatLng(34.009565, -118.497404);
  var universal = new google.maps.LatLng(34.138132, -118.353273);
  var griffith = new google.maps.LatLng(34.118500, -118.300424);
  var staples = new google.maps.LatLng(34.043258, -118.267190);
  var lacma = new google.maps.LatLng(34.064128, -118.359165);
  var getty = new google.maps.LatLng(34.078187, -118.474031);

  map = new google.maps.Map(document.getElementById('map'), {
    center: new google.maps.LatLng(34.090642, -118.364720),
    zoom: 12
  });

  var hollywoodMarker= new google.maps.Marker({
  position: hollywood
});
  var santamonicaMarker = new google.maps.Marker({
  position: santamonica
});
  var universalMarker= new google.maps.Marker({
  position:universal
});
  var griffithMarker= new google.maps.Marker({
  position:griffith
});
  var staplesMarker= new google.maps.Marker({
  position:staples
});
  var lacmaMarker= new google.maps.Marker({
  position:lacma
});
  var gettyMarker= new google.maps.Marker({
  position:getty
});

hollywoodMarker.setMap(map);
santamonicaMarker.setMap(map);
universalMarker.setMap(map);
griffithMarker.setMap(map);
staplesMarker.setMap(map);
lacmaMarker.setMap(map);
gettyMarker.setMap(map);

}




