console.log('\'Allo \'Allo!');

var markers;

function initMap() {

  var map, i,locations,marker,location;
  locations = [
    {
      "coordinates": new google.maps.LatLng(34.134208, -118.321548),
      "name": "Hollywood Sign"
    },
    {
      "coordinates": new google.maps.LatLng(34.009565, -118.497404),
      "name": "Santa Monica Pier"
    },
    {
      "coordinates": new google.maps.LatLng(34.138132, -118.353273),
      "name": "Universal Studios Hollywood"
    },
    {
      "coordinates": new google.maps.LatLng(34.118500, -118.300424),
      "name": "Griffith Observatory"
    },
    {
      "coordinates": new google.maps.LatLng(34.043258, -118.267190),
      "name": "Staples Center"
    },
    {
      "coordinates": new google.maps.LatLng(34.064128, -118.359165),
      "name": "LACMA"
    },
    {
      "coordinates": new google.maps.LatLng(34.078187, -118.474031),
      "name": "The Getty"
    }];

  // Initialize map with a center of Los Angeles
  map = new google.maps.Map(document.getElementById('map'), {
    center: new google.maps.LatLng(34.090642, -118.364720),
    zoom: 12
  });

  markers = [];

  // For each location, create a marker on map and add to markers array
  for (i = 0; i < locations.length; i++) {
    location = locations[i];
    marker = new google.maps.Marker({position: location["coordinates"],
    name: location["name"]});
    console.log(marker);
    markers.push(marker);
    marker.setMap(map);
  }

}


var filterMarkersByQuery = function(query){
  for(var i=0; i < markers.length; i++){
    marker = markers[i];
    //console.log(marker.name, marker.name.toLowerCase().indexOf(query.toLowerCase()));
    //console.log(marker.name, marker.name.toLowerCase().indexOf(query.toLowerCase()) != -1);
    var match = marker.name.toLowerCase().indexOf(query.toLowerCase()) === -1;
    if (match){
      marker.setVisible(false);
    }
  }
};


