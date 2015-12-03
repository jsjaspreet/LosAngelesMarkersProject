debugger;
console.log('\'Allo \'Allo!');
var map;

function initMap() {
  debugger;
  console.log("Initiated map init");
  var locations = [
    { "coordinates": new google.maps.LatLng(34.134208, -118.321548),
      "name": "Hollywood Sign"},
  { "coordinates": new google.maps.LatLng(34.009565, -118.497404),
    "name": "Santa Monica Pier"},
    { "coordinates": new google.maps.LatLng(34.138132, -118.353273),
      "name": "Universal Studios Hollywood"},
    { "coordinates": new google.maps.LatLng(34.118500, -118.300424),
      "name": "Griffith Observatory"},
    { "coordinates": new google.maps.LatLng(34.043258, -118.267190),
      "name": "Staples Center"},
    { "coordinates": new google.maps.LatLng(34.064128, -118.359165),
      "name": "LACMA"},
    { "coordinates": new google.maps.LatLng(34.078187, -118.474031),
      "name": "The Getty"}];
  console.log("Set Locations");

  map = new google.maps.Map(document.getElementById('map'), {
    center: new google.maps.LatLng(34.090642, -118.364720),
    zoom: 12
  });

  var markers = [];
  var marker;
  for(i=0; i < locations.length; i++){
    console.log("Creating markers");
    location = locations[i];
    marker = new google.maps.Marker({position: location.coordinates});
    markers.push(marker);
    marker.setMap(map);
  }

}




