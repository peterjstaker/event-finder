$(document).ready(function () {

    var name = "";
    var email = "";
 
 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAdpCTnTjJosnrKB03vJyQnO-EgGUbXtiM",
    authDomain: "event-finder-35362.firebaseapp.com",
    databaseURL: "https://event-finder-35362.firebaseio.com",
    projectId: "event-finder-35362",
    storageBucket: "event-finder-35362.appspot.com",
    messagingSenderId: "219177274863"
  };
  firebase.initializeApp(config);

 // Create a variable to reference the database
 var database = firebase.database();

 database.ref().on("child_added", function (childSnap) {
    name = childSnap.val().name;
    email = childSnap.val().email;

 });    

 // Click Button changes what is stored in firebase
 $("#submit-button").on("click", function(event) {
   // Prevent the page from refreshing
   event.preventDefault();

   // Get inputs
   name = $("#user-name").val().trim();
   email = $("#email").val().trim();

   var newUser = {
    name: name,
    email: email
    }

    console.log(newUser)
    database.ref().push(newUser);

    //clears form for next train 
    $("#user-name").val("");
    $("#email").val("");
    
    return false;
    })

});    
