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

var trainName = "";
var dest = "";
var freq = "";
var nextArriv = "";
var minAway = "";
var l = console.log;
// point to HTML handling input
$("#add-train-btn").on("click", function(event) {

    event.preventDefault();
    // grabs user input
    trainName = $("#inputTrainName").val().trim();
    dest = $("#inputDest").val().trim();
    freq = $("#inputFreq").val().trim();
    nextArriv = $('#inputNextArriv').val().trim();
    // MinAway = $("#inputMinAway").val().trim();
    // Store the temporary objects in a variable
    newTrain = {
            train: trainName,
            dest: dest,
            freq: freq,
            next: nextArriv,
            // MinAway: MinAway,
        };

    alert("New train details successfully added");
    // push newTrain var to firebase database
    dataRef.ref().push(newTrain);
    // Console logging local object data
    l(newTrain.train);
    l(newTrain.dest);
    l(newTrain.freq);
    l(newTrain.next);
    // l(newTrain.MinAway);

    // Clears input field for next new train entry
    $("#inputTrainName").val("");
    $("#inputDest").val("");
    $("#inputFreq").val("");
    $("#inputNextArriv").val("");
});

// function to handle appending user's entry's to page
dataRef.ref().on("child_added", function(childSnapshot) {
    // initial console log 
    l(childSnapshot.val());

    // store memory in these variables
    var trainName = childSnapshot.val().train;
    var dest = childSnapshot.val().dest;
    var freq = childSnapshot.val().freq;
    var nextArriv = childSnapshot.val().next;

    // console log for good measure
    l(trainName);
    l(dest);
    l(freq);
    l(nextArriv);

    // render new table rows and table data
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(dest),
        $("<td>").text(freq),
        $("<td>").text(nextArriv),
    );
    // append the newRow with user input variables to tbody of id train-table
    $('#train-table > tbody').append(newRow);
});