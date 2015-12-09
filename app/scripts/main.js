var markers, allLocations;
var selections = ko.observableArray();
var map, marker;

function initMap() {
  var i, location;
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
      "coordinates": new google.maps.LatLng(34.135999, -118.351410),
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
  for (var x = 0; x < allLocations.length; x++) {
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
    marker = new google.maps.Marker({
      position: location["coordinates"],
      name: location["name"],
      label: location["name"][0],
      animation: google.maps.Animation.DROP
    });
    marker.addListener('click', animate(marker));

    markers.push(marker);
    marker.setMap(map);
  }

}

function hello() {
  console.log('hello');
}
// Add animation and extra info for a marker, closure use ahead!
function animate(marker) {
  var loc = marker;

  // Base foursquare API call populated with lat long coords of our locations
  var foursquare_request_url = "https://api.foursquare.com/v2/venues/search?" +
    "client_id=QI5R20V4HCZWOCYDWMMXKQ03PDV05C1NIN0HIBSHJF20NWK2&" +
    "client_secret=2XPJM0OD0L2ZH0Q1QQMPCAYDOSURIX4T4DHMGACWTYDX21QL&v=20130815&" +
    "ll=" + marker.position.lat() + "," + marker.position.lng();

  var location_url, number_checked_in;
  var contentString = '<div id="marker' + marker.name.substr(0, 2) + '"><h2 class="text-center">' + marker.name + '</h2>' +
    '<img src="https://maps.googleapis.com/maps/api/streetview?size=600x400&location='
    + marker.position.lat() + "," + marker.position.lng() +
    '&key=AIzaSyCW-LDU7uVXeUj5R38Hwt9ucd9LsQ5hA0Y\"></div>';
  var infoWindow = new google.maps.InfoWindow({
    content: contentString
  });

  // Add asynchronous ajax call to update the infoWindow with more data if possible
  $.ajax({
    url: foursquare_request_url
  }).done(function (data) {
    // On success, show foursquare data
    location_url = data.response.venues[0].url;
    number_checked_in = data.response.venues[0].stats.checkinsCount;
    var contentString = '<div class="text-center"><h2>' + marker.name + '</h2>' +
      '<span><a href="' + location_url + '">' + location_url + '</a>' +
      '<h5>Checkins: ' + number_checked_in + '</h5></span>' +
      '<img src="https://maps.googleapis.com/maps/api/streetview?size=600x400&location='
      + marker.position.lat() + "," + marker.position.lng() +
      '&key=AIzaSyCW-LDU7uVXeUj5R38Hwt9ucd9LsQ5hA0Y\"></div>';
    infoWindow.setContent(contentString);
  }).fail(function (xhr, status) {
    // On  failure, do not show null content
    var contentString = '<div class="text-center"><h2>' + marker.name + '</h2>' +
      '<img src="https://maps.googleapis.com/maps/api/streetview?size=600x400&location='
      + marker.position.lat() + "," + marker.position.lng() +
      '&key=AIzaSyCW-LDU7uVXeUj5R38Hwt9ucd9LsQ5hA0Y\"></div>';
    infoWindow.setContent(contentString);
  });


  function toggle() {

    loc.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function () {
      loc.setAnimation(null);
    }, 850);
    infoWindow.open(map, loc);
  }

  return toggle;
}

// Set marker as visible if query matches name of Marker
// Also update selections
var filterMarkersByQuery = function (query) {
  selections.removeAll();
  for (var i = 0; i < markers.length; i++) {
    marker = markers[i];
    var match = marker.name.toLowerCase().indexOf(query.toLowerCase()) === -1;
    marker.setVisible(!match);
    if (!match) {
      selections.push(marker.name);
    }
  }
};

// Allow query to be accessed in global scope
var filter = ko.observable("");

function AppViewModel() {
  this.query = filter;
  this.selections = selections;
  this.filter = function () {
    filterMarkersByQuery(filter());
  };
  this.select = function (location) {
    for (var i = 0; i < markers.length; i++) {
      marker = markers[i];
      var match = marker.name.toLowerCase().indexOf(location.toLowerCase()) != -1;
      if (match) {
        animate(marker)();
      }
    }

  };
}

// Redefine enter behavior on filter
$('#filterQuery').keydown(function (e) {
  if (e.keyCode == 13) { // enter key was pressed
    filterMarkersByQuery(filter());
    return false;
  }
});

// Activate knockout.js
ko.applyBindings(new AppViewModel());



