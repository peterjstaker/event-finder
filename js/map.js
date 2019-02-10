
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
    map = new google.maps.Map(document.getElementById(maphost.id), { center: { lat: userLocation.latitude, lng: userLocation.longitude }, zoom: 8 });
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
            userLocation = pruneObjectTree(resp,["zip","latitude","longitude"]);
            
        });
    } else {

        this.geocoder = new google.maps.Geocoder();
        this.geocoder.geocode({ "address": address }, function (results, status) {
            if (status === "OK") {
                console.log(results);
                userLocation = results;
                //userLocation = pruneObjectTree(userLocation,["lat","lng","address"]);
                
                console.log(userLocation);
                // {
                //     lat: results[0].geometry.location.lat(),
                //     lng: results[0].geometry.location.lng(),
                //     zip: address
                // };
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
        if(prop==="0"){return; }
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

function convert(userLocation) {

    var coords = {
        lat: parseFloat(userLocation["latitude"]),
        lng: parseFloat(userLocation["longitude"]),
        zip: userLocation["zip"]

    };
    return coords;
}


