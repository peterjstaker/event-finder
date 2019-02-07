function testPerformers(){
    //searches for artist AND teams
    var searchTopic = $("#event_name").val().trim();
    console.log(searchTopic);
    var location = $("#location").val().trim();
    // Replacing spaces with dashes on search, API doesn't register spaces.
    var searchReadyTopic = searchTopic.replace(/\s/g, "-");
    var queryURL = 'https://api.seatgeek.com/2/events?performers.slug=' + searchReadyTopic
     + '&client_id=MTUwOTQwOTh8MTU0ODkwODc0NS43Mw';

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

      var image = response.;
      
      var eventDesc = '';

      var ticketLink = "";
    
      }
    


    });
}

function createQURL(){

     

}

