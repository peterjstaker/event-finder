
var div = null;
var markers = [];
var map = null;
var geocoder = null;
var userLocation;

function setMap(userLocation, div) {
    var maphost = document.createElement("div");
    maphost.style.width = "90%";
    maphost.style.height = "100%";
    maphost.id = "map-host";
    document.getElementById(div).appendChild(maphost);
    map = new google.maps.Map(document.getElementById(maphost, { center: { lat: userLocation["lat"], lng: userLocation["lng"] }, zoom: 8 });
    addMarker(userLocation);
}

function addMarker(markerLocation) {
    let pos = new google.maps.LatLng({ lat: markerLocation["lat"], lng: markerLocation["lng"] });
    let marker = new google.maps.Marker({ position: pos, map: map });
    markers.push(marker);
}

function removeMarkers() {
    for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
}

function getUserLocation(address) {

    if (address === null || address === "" || address === undefined) {
        //get address by ip
        $.ajax({ url: "http://api.ipstack.com/check?access_key=93b4b312bfe2d6973d6eb6f7c0be4c1a", method: "GET" }).then(function (resp) {

            userLocation = convert(resp);
            console.log(userLocation);
        });
    } else {

        this.geocoder = new google.maps.Geocoder();
        this.geocoder.geocode({ "address": address }, function (results, status) {
            if (status === "OK") {
                console.log(results);
                userLocation = {
                    lat: results[0].geometry.location.lat(),
                    lng: results[0].geometry.location.lng(),
                    zip: address
                };
            } else {
                console.log(status);
            }

        })
    }
}


function convert(userLocation) {

    var coords = {
        lat: parseFloat(userLocation["latitude"]),
        lng: parseFloat(userLocation["longitude"]),
        zip: userLocation["zip"]

    };
    console.log(coords);

    return coords;
}


