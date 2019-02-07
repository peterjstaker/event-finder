

class EventMap{
    constructor(div){
        this.map = null;
        this.markers = [];
        this.div = div;

    }

    getMap(position){
        console.log(position);
 
        this.map = new google.maps.Map(document.getElementById(this.div),  {center: { lat: position[lat], lng: position[lng]}, zoom: 15});
    }

    addMarker(position){
        let pos = new google.maps.LatLng({lat: position[0], lng: position[1]});
        let marker = new google.maps.Marker({position: pos, map: this.map });
        this.markers.push(marker);
    }   
    
    removeMarkers(){
        for(let i = 0; i < this.markers.length; i++){
            this.markers[i].setMap(null);
        }
        this.markers = [];


    }

}

class Geolocation{
    constructor(geocoder){
        this.geocoder = geocoder;
        this.currentLocation;
    }

    getLocation(address){
        
        if(address === null || address === "" || address === undefined){
            //get address by ip
            $.ajax({url: "http://api.ipstack.com/check?access_key=93b4b312bfe2d6973d6eb6f7c0be4c1a", method: "GET"}).then(function(resp){
                console.log(resp);
                this.currentLocation = this.convert(resp);
            });
        }else{
            
            this.geocoder = new google.maps.Geocoder();
            this.geocoder.geocode({"address": address}, function(results, status){
                if(status === "OK"){
                    console.log(results);
                    return results;
                }else{
                    console.log(status);
                }

            })
        }

        ///return this.convert(pos);
        

    }

    convert(obj){
        var coords = {
            lat: parseFloat( obj["latitude"]),
            lng: parseFloat(obj["longitude"]),
            zip: obj["zip"]
    
        };
        console.log(coords);
    
        return coords;
    }
}