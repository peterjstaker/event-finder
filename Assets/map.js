

class EventMap{
    constructor(div){
        this.map = null;
        this.markers = [];
        this.div = div;

    }

    getMap(position){
 
        this.map = new google.maps.Map(document.getElementById(this.div),  {center: { lat: position[0], lng: position[1]}, zoom: 15});
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