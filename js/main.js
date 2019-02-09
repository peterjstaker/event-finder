var searchType
var queryStart
var queryURL 
var searchId

//Firing properly in console
function testStartUp(){
  
    var queryURL = 'https://api.seatgeek.com/2/events?venue.city=Seattle&client_id=MTUwOTQwOTh8MTU0ODkwODc0NS43Mw';

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

      console.log(response);
      
      for(i=0;i<3;i++){

      var img = response.events[i].performers[0].image;
      console.log(img);
      var eventDesc = response.events[i].short_title;
      var ticketLink = response.events[i].url;
      
      $(("#descCard"+i)).text(eventDesc);
      
      $(("#linkCard"+i)).attr("href", ticketLink);
      

      if(img === "null"){
        
        $(("#imgCard"+i)).attr("src", "images/logo.png");
        console.log("Null!")
      }

      else{
        
        $(("#imgCard"+i)).attr("src", img);
      
      }

      

      
      
      

      }
    


    });
};

/*
  Firing perfId() properly creates the searchId, 
  going on to firing createQURL() properly creates the queryURL,
  firing getResultsEvents() produces valid search results, however stops
  before firing the loop currently.

  All of this only seems to work when called in order in the browser console.
  
  When attempting to call these functions within one another
  in order needed, the ajax calls get pushed to the bottom and the 
  values need return too late to be referenced been troubleshooting this 
  for a while to no avail.

  

*/


function perfId(){
  var artistSearch = $("#event_name").val().trim();
  console.log(artistSearch);
  var searchReadyArtist = artistSearch.replace(/\s/g, "-");
  queryURL = 'https://api.seatgeek.com/2/performers?q=' + searchReadyArtist
   + '&client_id=MTUwOTQwOTh8MTU0ODkwODc0NS43Mw';

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function(response) {
    
    console.log(response);
    console.log(response.performers[0].id);
    searchId = response.performers[0].id;
    return searchId;
  });
};

function createQURL(){
  queryStart = 'https://api.seatgeek.com/2/';
  console.log(queryStart)
  var ddChoice = document.getElementById("valueCheck").value;
  console.log(ddChoice)

  if(ddChoice === '1'){
    var searchType = 1;
    queryStart = queryStart + 'events?performers.id=';
    console.log(queryStart)
    if( $("#event_check").attr('class') === "active"){
      console.log("if statement fired")
      searchId
      console.log(searchId)
      queryStart = queryStart + searchId;
      console.log(queryStart)
      if( $("#location_check").attr('class') === "active"){
        queryStart = queryStart + "&venues.postal_code=";
        var location = $("#location").val().trim();
        queryStart = queryStart + location;
        queryURL = queryStart + '&client_id=MTUwOTQwOTh8MTU0ODkwODc0NS43Mw';
        console.log(queryStart)
      }
      else{
        queryStart = queryStart + '&client_id=MTUwOTQwOTh8MTU0ODkwODc0NS43Mw';
        console.log(queryStart)
        
      }


    }

    else{
      console.log("nada")
    }


  }

  else if(ddChoice === '2'){
    var searchType = 2;
    queryStart = queryStart + 'venues?';
    
    if( $("#event_check").attr('class') === "active"){
      queryStart = queryStart + 'name=';
      searchTopic =  $('#event_name').val().trim();
      searchReadyTopic = searchTopic.replace(/\s/g, "-");
      queryStart = queryStart + searchReadyTopic;
      
      if( $("#location_check").attr('class') === "active"){
        queryStart = queryStart + "&postal_code=";
        location = $("#location").val().trim();
        queryStart = queryStart + location;
        queryStart = queryStart + '&client_id=MTUwOTQwOTh8MTU0ODkwODc0NS43Mw';
        console.log(queryStart);

      }
      else{
        queryStart = queryStart + '&client_id=MTUwOTQwOTh8MTU0ODkwODc0NS43Mw';
        console.log(queryStart);
      }

    }

    else if( $("#location_check").attr('class') === "active"){
      queryStart = queryStart + "postal_code=";
      queryStart = queryStart + $('#location').val().trim();
      console.log(queryStart);
      queryStart = queryStart + '&client_id=MTUwOTQwOTh8MTU0ODkwODc0NS43Mw';
      console.log(queryStart);
    }

    else{
      console.log("nada");
    }

  }

  else if(ddChoice === '3'){
    var searchType = 3;
    queryStart = queryStart + 'events?type=';

    if( $("#event_check").attr('class') === "active"){

      queryStart = queryStart + $('#event_name').val().trim();

      if( $("#location_check").attr('class') === "active"){
        queryStart = queryStart + "&venue.postal_code=";
        location = $("#location").val().trim();
        queryStart = queryStart + location;
        queryStart = queryStart + '&client_id=MTUwOTQwOTh8MTU0ODkwODc0NS43Mw';
        console.log(queryStart);

      }
      else{
        queryStart = queryStart + '&client_id=MTUwOTQwOTh8MTU0ODkwODc0NS43Mw';
        console.log(queryStart);
      }

    }

    else{
      console.log("nada")
    }


  }
};

function getResultsEvents(){ 

  if(searchType = 1){
    
    queryURL = queryStart;
    console.log(queryURL)
    
    $.ajax({
    url: queryURL,
    method: "GET"
  
  }).then(function(response) {
  
    console.log(response)
      
    for(e=0;e<response.length;e++){
      console.log('loop fire')
    var img = response.events[i].performers[0].image;
    console.log(img);
    var eventDesc = response.events[i].short_title;
    var ticketLink = response.events[i].url;
      
    $(("#descCard"+i)).text(eventDesc);
      
    $(("#linkCard"+i)).attr("href", ticketLink);
  
    if(img === "null"){
        
      $(("#imgCard"+i)).attr("src", "images/logo.png");
      console.log("Null!")
    }
  
    else{
        
      $(("#imgCard"+i)).attr("src", img);
      
    }
      
  }
  return
  });
  };

};

function getResultsVenue(){

};

