//GLOBAL VARIABLES =========================================

  // Only need this global.

  let userLocation = '';//CALL DELBERT'S CODE

  //let searchTopic = '';

  //API Key
  
/*

  let api_key = '&client_id=MTUwOTQwOTh8MTU0ODkwODc0NS43Mw';

  //Main API Endpoint for SeatGeek
  
  let api_endPoint = 'https://api.seatgeek.com/2';

  //Resource Endpoints
  
  let events = '/events?q='; //endpoint returns artist and their events

  // let performers = 'performers.slug='; //might be useful, uncomment if needed

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

window.onload = function startUpSearch(){
  
  var queryURL = 'https://api.seatgeek.com/2/events?venue.city=Seattle&client_id=MTUwOTQwOTh8MTU0ODkwODc0NS43Mw';

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    console.log(response);
    
<<<<<<< HEAD
<<<<<<< HEAD
    for(i=0;i<3;i++){
=======
    for(i=1;i<4;i++){
>>>>>>> Startup working. Onclick working.
=======
    for(i=1;i<4;i++){
>>>>>>> 63a43d8875dfbc3c239190c2e0e1ac086729dd02

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
  
<<<<<<< HEAD


  });
};

function createQURL(){
  queryStart = 'https://api.seatgeek.com/2/';
  console.log(queryStart)

    queryStart = queryStart + 'events?performers.slug=';
    console.log(queryStart)

      console.log("if statement fired")
      searchTopic = $("#event_name").val().trim();
      searchId = searchTopic.replace(/\s/g, "-"); 
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

  getResultsEvents();
};

=======


  });
};

function createQURL(){
  queryStart = 'https://api.seatgeek.com/2/';
  console.log(queryStart)

    queryStart = queryStart + 'events?performers.slug=';
    console.log(queryStart)

      console.log("if statement fired")
      searchTopic = $("#event_name").val().trim();
      searchId = searchTopic.replace(/\s/g, "-"); 
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

  getResultsEvents();
};

>>>>>>> 63a43d8875dfbc3c239190c2e0e1ac086729dd02
function getResultsEvents(){ 
  queryURL = queryStart;
  console.log(queryURL)
    
  $.ajax({
  url: queryURL,
  method: "GET"
  
  }).then(function(response) {
  
    console.log(response)
      
<<<<<<< HEAD
<<<<<<< HEAD
    for(i=0;i<3;i++){
=======
    for(i=1;i<4;i++){
>>>>>>> Startup working. Onclick working.
=======
    for(i=1;i<4;i++){
>>>>>>> 63a43d8875dfbc3c239190c2e0e1ac086729dd02
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
