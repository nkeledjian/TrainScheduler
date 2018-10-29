// Initialize Firebase
var config = {
    apiKey: "AIzaSyB49Eg43MVQhsMzgumwbAZFmmsZi1IrdcE",
    authDomain: "trainscheduler-ee02e.firebaseapp.com",
    databaseURL: "https://trainscheduler-ee02e.firebaseio.com",
    projectId: "trainscheduler-ee02e",
    storageBucket: "trainscheduler-ee02e.appspot.com",
    messagingSenderId: "10517861927"
  };
  firebase.initializeApp(config);
// store database in dataRef
var dataRef = firebase.database();  

var TrainName = "";
var Dest = "";
var Freq = "";
var NextArriv = "";
var MinAway = "";
var l = console.log;
// point to HTML handling input
$("#add-train-btn").on("click", function(event) {

    event.preventDefault();
    // grabs user input
    TrainName = $("#inputTrainName").val().trim();
    Dest = $("#inputDest").val().trim();
    Freq = $("#inputFreq").val().trim();
    NextArriv = $('#inputNextArriv').val().trim();
    // MinAway = $("#inputMinAway").val().trim();
    // Store the temporary objects in a variable
    newTrain = {
            Train: TrainName,
            Dest: Dest,
            Freq: Freq,
            Next: NextArriv,
            // MinAway: MinAway,
        };

    alert("New train details successfully added");
    // push newTrain var to firebase database
    dataRef.ref().push(newTrain);
    // Console logging local object data
    l(newTrain.Train);
    l(newTrain.Dest);
    l(newTrain.Freq);
    l(newTrain.Next);
    // l(newTrain.MinAway);

    // Clears input field for next new Train entry
    $("#inputTrainName").val("");
    $("#inputDest").val("");
    $("#inputFreq").val("");
    $("#inputNextArriv").val("");
});

// function to handle appending user's entry's to page
database.ref().on("child_added", function(childSnapshot) { 
    
});