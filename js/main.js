
//GLOBAL VARIABLES =========================================

  //
  let userLocation = '';//CALL DELBERT'S CODE

  let searchTopic = '';

  //API Key
  let api_key = '&client_id=MTUwOTQwOTh8MTU0ODkwODc0NS43Mw';

  //Main API Endpoint for SeatGeek
  let api_endPoint = 'https://api.seatgeek.com/2';

  //Resource Endpoints
  let events = '/events?q='; //endpoint returns artist and their events

  // let performers = 'performers.slug='; //might be useful, uncomment if needed

  // let venues = '/venues/'; //might be useful, uncomment if needed

  //TEST VARIABLES ===========================================
  let artists = ['Sounders FC', 'Justin Timberlake', 'Adele'];

//FUNCTIONS ================================================

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

//TEST FUNCTIONS (Auri's Code) =============================
  function testPerformers(){
      //searches for artist AND teams
      var searchTopic = $("#event_name").val().trim();

      console.log(searchTopic);

      var location = $("#location").val().trim();
      // Replacing spaces with dashes on search, API doesn't register spaces.
      var searchReadyTopic = searchTopic.replace(/\s/g, "-");

      var queryURL = 'https://api.seatgeek.com/2/events?performers.slug=' + searchReadyTopic
      + api_key;

      console.log(queryURL);

      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {

          console.log(response.events);

          console.log(response.events[0].venue.city);

      });
  }

  function testEventType(){
      var searchTopic = $("#event_name").val().trim();
      // 
      var location = $("#location").val().trim();
      // Replacing spaces with dashes on search, API doesn't register spaces.
      var searchReadyTopic = searchTopic.replace(/\s/g, "-");
      var queryURL = 'https://api.seatgeek.com/2/events?taxonomies.name=' + searchReadyTopic
      + '&client_id=MTUwOTQwOTh8MTU0ODkwODc0NS43Mw';

      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {

          console.log(response.events[0].title);



      });
  }

  //testGenre can be used for event name search as well.
  function testGenre(){
      var searchTopic = $("#event_name").val().trim();
      // 
      var location = $("#location").val().trim();
      // Replacing spaces with dashes on search, API doesn't register spaces.
      var searchReadyTopic = searchTopic.replace(/\s/g, "-");
      var queryURL = 'https://api.seatgeek.com/2/events?q=' + searchReadyTopic
      +  '&client_id=MTUwOTQwOTh8MTU0ODkwODc0NS43Mw';

      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {

      console.log(response.events);



      });
  }

  // search for popularity close by.
  function testStartUp(){
      var searchTopic = $("#event_name").val().trim();
      // 
      var location = $("#location").val().trim();
      // Replacing spaces with dashes on search, API doesn't register spaces.
      var searchReadyTopic = searchTopic.replace(/\s/g, "-");
      var queryURL = 'https://api.seatgeek.com/2/events?city=' + location
      + '&client_id=MTUwOTQwOTh8MTU0ODkwODc0NS43Mw';

      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {

        console.log(response);
        
        for(i=0;i<3;i++){

        var image = response;
        
        var eventDesc = '';

        var ticketLink = "";
      
        }
      


      });
  }

  function createQURL(){

  }

//FUNCTION CALLS =========================================
  //non currently required


//TEST BLOCK FUNCTION CALLS ==============================
// eventSearch(artists[0]);
// eventSearch(artists[1]);
// eventSearch(artists[2]);
// testPerformers();

//MAIN ACTION =============================================

$('#search-button').on('click',function() {

  searchTopic = $("#event_name").val().trim();
  eventSearch(searchTopic);

})