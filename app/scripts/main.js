console.log('\'Allo \'Allo!');

var markers, allLocations;
var selections = ko.observableArray();
function initMap() {

  var map, i,marker,location;
  allLocations = [
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
  for(var x=0; x < allLocations.length; x++){
    selections.push(allLocations[x].name);
  }

  // Initialize map with a center of Los Angeles
  map = new google.maps.Map(document.getElementById('map'), {
    center: new google.maps.LatLng(34.090642, -118.364720),
    zoom: 12
  });

  markers = [];

  // For each location, create a marker on map and add to markers array
  for (i = 0; i < allLocations.length; i++) {
    location = allLocations[i];
    marker = new google.maps.Marker({position: location["coordinates"],
    name: location["name"]});
    console.log(marker);
    markers.push(marker);
    marker.setMap(map);
  }

}


// Set marker as visible if query matches name of Marker
var filterMarkersByQuery = function(query){
  selections.removeAll();
  for(var i=0; i < markers.length; i++){
    marker = markers[i];
    var match = marker.name.toLowerCase().indexOf(query.toLowerCase()) === -1;
    marker.setVisible(!match);
    if(!match){
      selections.push(marker.name);
    }
  }
};

// Allow query to be accessed in global scope
var filter = ko.observable("query");

function AppViewModel(){
  this.query = filter;
  this.selections = selections;
}
  // Disable enter behavior
  $('#filterQuery').keydown(function(e) {
  if(e.keyCode == 13) { // enter key was pressed
    filterMarkersByQuery(filter());
    return false;
  }
  });
// Activate knockout.js
ko.applyBindings(new AppViewModel());



