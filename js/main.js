//GLOBAL VARIABLES =========================================

// Only need this global.




var div = null;
var markers = [];
var map = null;
var geocoder = null;
//let searchTopic = '';

//API Key

/*

  let api_key = '&client_id=MTUwOTQwOTh8MTU0ODkwODc0NS43Mw';

  //Main API Endpoint for SeatGeek
  
  let api_endPoint = 'https://api.seatgeek.com/2';

  //Resource Endpoints
  
  let events = '/events?q='; //endpoint returns artist and their events

  // let performers = 'performers.slug='; //might be useful, uncomment if needed
var results;
  // let venues = '/venues/'; //might be useful, uncomment if needed

  //TEST VARIABLES ===========================================
  let artists = ['Sounders FC', 'Justin Timberlake', 'Adele'];

*/

//FUNCTIONS ================================================
/*
  function eventSearch(searchTopic) {

    let queryURL = queryBuilder(searchTopic);

    $.ajax({
      url: queryURL,
      method: 'Get'
    }).then (function (response) {
      console.log (response);
      //TO DO: Check city to make sure that there is an event near the individual
      //       if userLocation not in state of returned data -> inform the user that there
      //       are no events near them

      //TO DO: Update '#SearchResultsStage' with new data

    });

  }

  function queryBuilder (performer) {

    let queryString = api_endPoint + events + performer + api_key;
    // console.log(queryString); //to test
    return queryString;
  }


*/
//FUNCTION CALLS =========================================
//non currently required


//TEST BLOCK FUNCTION CALLS ==============================
// eventSearch(artists[0]);
// eventSearch(artists[1]);
// eventSearch(artists[2]);
// testPerformers();

//MAIN ACTION =============================================

/*
$('#search-button').on('click',function() {

  searchTopic = $("#event_name").val().trim();
  eventSearch(searchTopic);

})
*/

// Auri Repurposed Functions!

window.load = getUserLocation();

function startUpSearch() {

  var queryURL = 'https://api.seatgeek.com/2/events?venue.city=Seattle&client_id=MTUwOTQwOTh8MTU0ODkwODc0NS43Mw';
  //console.log(userLocation);
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(userLocation);
    console.log(response);
    for (i = 1; i < 4; i++) {
      var img = response.events[i].performers[0].image;
      console.log(img);
      var eventDesc = response.events[i].short_title;
      var ticketLink = response.events[i].url;

      $(("#descCard" + i)).text(eventDesc);

      $(("#linkCard" + i)).attr("href", ticketLink);
      //console.log(u);
      console.log("startup finished");
      if (img === "null") {

        $(("#imgCard" + i)).attr("src", "images/logo.png");
        console.log("Null!")
      }

      else {

        $(("#imgCard" + i)).attr("src", img);

      }

      setMap("reveal-",response.events);

    }



  });
};

function createQURL() {
  queryStart = 'https://api.seatgeek.com/2/';
  console.log(queryStart)

  queryStart = queryStart + 'events?performers.slug=';
  console.log(queryStart)

  console.log("if statement fired")
  searchTopic = $("#event_name").val().trim();
  searchId = searchTopic.replace(/\s/g, "-");
  queryStart = queryStart + searchId;
  console.log(queryStart)
  if ($("#location_check").attr('class') === "active") {
    queryStart = queryStart + "&venues.postal_code=" + userLocation.zip;
    var location = $("#location").val().trim();
    queryStart = queryStart + location;
    queryURL = queryStart + '&client_id=MTUwOTQwOTh8MTU0ODkwODc0NS43Mw';
    console.log(queryStart)
  }
  else {
    queryStart = queryStart + '&client_id=MTUwOTQwOTh8MTU0ODkwODc0NS43Mw';
    console.log(queryStart)

  }

  getResultsEvents();
};

function getResultsEvents() {
  queryURL = queryStart;
  console.log(queryURL)

  $.ajax({
    url: queryURL,
    method: "GET"

  }).then(function (response) {

    console.log(response)

    setMap("reveal-",response.events)
    for (i = 1; i < 4; i++) {
      console.log('loop fire')
      var img = response.events[i].performers[0].image;
      console.log(img);
      var eventDesc = response.events[i].short_title;
      var ticketLink = response.events[i].url;

      $(("#descCard" + i)).text(eventDesc);

      $(("#linkCard" + i)).attr("href", ticketLink);

      if (img === "null") {

        $(("#imgCard" + i)).attr("src", "images/logo.png");
        console.log("Null!")
      }

      else {

        $(("#imgCard" + i)).attr("src", img);

      }

    }
    return
  });
};

function setMap(div, events) {

  for (let i = 1; i !== 4; i++) {

    var venueLocation = {
      latitude: events[i-1].venue.location.lat,
      longitude: events[i-1].venue.location.lon
    };
    var maphost = document.createElement("div");
    maphost.style.width = "90%";
    maphost.style.height = "100%";
    maphost.id = "map-host" + i;
    document.getElementById(div + i).appendChild(maphost);
    map = new google.maps.Map(document.getElementById(maphost.id), { center: { lat: userLocation.latitude, lng: userLocation.longitude }, zoom: 8 });
    console.log("set map reports userLoc: " + userLocation.lat + ", " + userLocation.lng);
    addMarker(userLocation);
    addMarker(venueLocation);
  }
}

function addMarker(markerLocation) {
  let pos = new google.maps.LatLng({ lat: markerLocation["latitude"], lng: markerLocation["longitude"] });
  let marker = new google.maps.Marker({ position: pos, map: map });
  markers.push(marker);
}

function removeMarkers() {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
}

var userLocation;
/**
 * 
 * @param {string} address gets the location lat and lng of the provided address. If let empty the location is retrived by ip.
 */
function getUserLocation(address) {

  if (address === null || address === "" || address === undefined) {
    //get address by ip
    $.ajax({ url: "http://api.ipstack.com/check?access_key=93b4b312bfe2d6973d6eb6f7c0be4c1a", method: "GET" }).then(function (resp) {
      userLocation = pruneObjectTree(resp, ["zip", "latitude", "longitude"]);
      console.log("user location finished");
      startUpSearch();
    });
  } else {

    this.geocoder = new google.maps.Geocoder();
    this.geocoder.geocode({ "address": address }, function (results, status) {
      if (status === "OK") {
        console.log(results);
        //userLocation = results;
        //userLocation = pruneObjectTree(userLocation,["lat","lng","address"]);

        console.log(userLocation);
        startUpSearch();

      } else {
        console.log(status);
      }

    });
  }
}
/**
 * Creates a new object with only spefied keys. Keys must match those that are in the source obj.
 * 
 * @param {object} srcObj the object to be search. Must be initialized.
 * @param {Array} nodesToKeep array of strings. Must be initialized.
 * 
 * @returns the newly created object with only requested nodes.
 */
function pruneObjectTree(srcObj, nodesToKeep) {
  //check if object is null and that there at least one node to keep
  if (srcObj === undefined || srcObj === null || nodesToKeep === undefined || nodesToKeep === null) {
    //if object or nodes to keep are null/undefined exit
    return;
  }


  //delcare prunedObj
  var prunedObj = {};

  //enmumerate thorugh supplied obj
  DFS(srcObj, nodesToKeep, prunedObj);
  //continue until all nodes are explored
  return prunedObj;
}

function DFS(srcObj, search, destObj) {
  for (var prop in srcObj) {

    //to prevent infinte recursion
    if (Array.isArray(srcObj[prop])) {
      //iterate through array if match found add to new object
      const arr = srcObj[prop];

      for (let index = 0; index < arr.length; index++) {
        console.log(arr[index]);
        DFS(arr[index], search, destObj);

      }
    }
    if (typeof (srcObj[prop]) === "string") {

    }
    if (prop === "0") { return; }
    //check if node has children
    DFS(srcObj[prop], search);

    //check for matches
    for (let i = 0; i < search.length; i++) {
      if (prop === search[i]) {
        destObj[search[i]] = srcObj[prop];
      }
    }
  }

}

