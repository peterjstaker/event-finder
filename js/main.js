//GLOBAL VARIABLES =========================================

  // Only need this global.

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



function startUpSearch(){
  var uL = userLocation["zip"];
  console.log(uL)
  var queryURL = 'https://api.seatgeek.com/2/events?venue.postal_code=' + uL + '&client_id=MTUwOTQwOTh8MTU0ODkwODc0NS43Mw';
  console.log(queryURL)
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);

    var blankCount = 0;

    for(i=1;i<4;i++){
      if(response.events[i] === undefined){
        $("#card-"+i).attr("hidden", "true");
        blankCount++
      }
      
      else{
  
      
    var img = response.events[i].performers[0].image;
    console.log(img);
    var eventDesc = response.events[i].short_title;
    var ticketLink = response.events[i].url;
    console.log(eventDesc)
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
  
  
  
  };
  console.log(blankCount)
  if(blankCount === 3){
  $("#eventsHeader").text("Sorry no events near you!");
  }
  else{
    console.log("All Good")
  }

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
      console.log(userLocation)
      if(userLocation !== 'undefined'){
        queryStart = queryStart + "&venue.postal_code=";
        zip = userLocation["zip"];
        queryStart = queryStart + zip;
        queryStart = queryStart + '&client_id=MTUwOTQwOTh8MTU0ODkwODc0NS43Mw';

      }
      else{
        queryStart = queryStart + '&client_id=MTUwOTQwOTh8MTU0ODkwODc0NS43Mw';
        console.log(queryStart)
        
      }

  getResultsEvents();
};

function getResultsEvents(){ 
  queryURL = queryStart;
  console.log(queryURL)
  
  for(i=1;i<4;i++){
  
    $("#card-"+i).attr("hidden", false);
    
  }

  $("#eventsHeader").text("Events");  

  $.ajax({
  url: queryURL,
  method: "GET"
  
  }).then(function(response) {
  
    console.log(response)
    var blankCount = 0;

  for(i=1;i<4;i++){
    if(response.events[i] === undefined){
      $("#card-"+i).attr("hidden", "true");
      blankCount++
    }
    
    else{

    
  var img = response.events[i].performers[0].image;
  console.log(img);
  var eventDesc = response.events[i].short_title;
  var ticketLink = response.events[i].url;
  console.log(eventDesc)
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



};
console.log(blankCount)
if(blankCount === 3){
$("#eventsHeader").text("Sorry no events near you!");
}
else{
  console.log("All Good")
}
    
      

 
  });
};

