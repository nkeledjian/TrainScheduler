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
var curTime = moment();

$("#currentTime").text(curTime.format("HH:mm"));

// point to HTML handling input
$("#add-train-btn").on("click", function(event) {

    event.preventDefault();
    // grabs user input
    trainName = $("#inputTrainName").val().trim();
    dest = $("#inputDest").val().trim();
    first = $("#inputFirstTime").val().trim();
    freq = $('#inputFreq').val().trim();
    // MinAway = $("#inputMinAway").val().trim();
    // Store the temporary objects in a variable
    newTrain = {
            train: trainName,
            dest: dest,
            first: first,
            freq: freq,
        };

    alert("New train details successfully added");
    // push newTrain var to firebase database
    dataRef.ref().push(newTrain);
    // Console logging local object data
    l(newTrain.train);
    l(newTrain.dest);
    l(newTrain.first);
    l(newTrain.freq);
    // l(newTrain.MinAway);

    // Clears input field for next new train entry
    $("#inputTrainName").val("");
    $("#inputDest").val("");
    $("#inputFirstTime").val("");
    $("#inputFreq").val("");
});

// function to handle appending user's entry's to page
dataRef.ref().on("child_added", function(childSnapshot) {
    // initial console log 
    l("childSnapshot", childSnapshot.val());

    // store memory in these variables
    var trainName = childSnapshot.val().train;
    var dest = childSnapshot.val().dest;
    var first = childSnapshot.val().first;
    var freq = childSnapshot.val().freq;

    // console log for good measure
    l("trainName: ", trainName);
    l("Destination: ", dest);
    l("First Train Time: ", first);
    l("Frequency: ", freq);

    // sorting first train time and time of arrival
    // set time to last years date to ensure time entered is before the target arrival time
    var firstTimeConvert = moment(first, "HH:mm").subtract(1, "years");
    l(firstTimeConvert);

    var currentTime = moment();
    l("Current time: ", moment(currentTime).format("HH:mm"));

    var diffTime = moment().diff(moment(firstTimeConvert), "minutes");

    var tRemainder = diffTime % freq;
    l(tRemainder);

    var tMinTillTrain = freq - tRemainder;
    l("MINUTES TILL TRAIN: " + tMinTillTrain);

    var nextArriv = moment().add(tMinTillTrain, "minutes");
    nextArrival = moment(nextArriv).format("hh:mm");

    // render new table rows and table data
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(dest),
        $("<td>").text(first),
        $("<td>").text(freq),
        $("<td>").text(nextArrival),
        $("<td>").text(tMinTillTrain),
    );
    // append the newRow with user input variables to tbody of id train-table
    $('#train-table > tbody').append(newRow);
});