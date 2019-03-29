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
// store database in db
var db = firebase.database();  

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
    db.ref().push(newTrain);
    // Console logging local object data
    // l(newTrain.train);
    // l(newTrain.dest);
    // l(newTrain.first);
    // l(newTrain.freq);
    // l(newTrain.MinAway);

    // Clears input field for next new train entry
    $("#inputTrainName").val("");
    $("#inputDest").val("");
    $("#inputFirstTime").val("");
    $("#inputFreq").val("");
});

// function to handle appending user's entry's to page
db.ref().on("child_added", function(childSnapshot) {
    // initial console log 
    l("childSnapshot", childSnapshot.val());

    // variables to store childSnapshots into memory
    var trainName = childSnapshot.val().train;
    var dest = childSnapshot.val().dest;
    var first = childSnapshot.val().first;
    var freq = childSnapshot.val().freq;

    // l("trainName: ", trainName);
    // l("Destination: ", dest);
    // l("First Train Time: ", first);
    // l("Frequency: ", freq);

    // ---Sorting first train time (HH:mm) and time of arrival---
    // set time to last years date to ensure time entered is before the target arrival time
    var firstTimeConvert = moment(first, "HH:mm").subtract(1, "years");
    // l(firstTimeConvert);

    // difference in minutes between first train arrival and current time
    var diffTime = moment().diff(moment(firstTimeConvert), "minutes");

    // determine remainder between current time and arrival time with user's inputted train frequency (in minutes)
    var tRemainder = diffTime % freq;
    // l(tRemainder);

    // finally, get the difference between freq of train arrival and time remaining for train to arrive
    var tMinTillTrain = freq - tRemainder;
    // l("MINUTES TILL TRAIN: " + tMinTillTrain);

    // and now format tMinTillTrain into minutes and then format to display in military time
    var nextArriv = moment().add(tMinTillTrain, "minutes");
    nextArrival = moment(nextArriv).format("HH:mm");

    // childSnapshot for row in question
    var childKey = childSnapshot.key;
    l("childKey: ", childKey);

    // render user inputted data and new data
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(dest),
        $("<td>").text(first),
        $("<td>").text(freq),
        $("<td>").text(nextArrival),
        $("<td>").text(tMinTillTrain),
        $("<td><button class='remove delete-btn' data-key='" + childKey + "'>X</button></td>")
    );

    // function for Deleting row
    $(document).on("click", ".remove", function(){
        // key reference for row in question
        keyRef = $(this).attr("data-key");
        // call remove method on key ref child
        db.ref().child(keyRef).remove();
        // reload the window to update page
        window.location.reload();
    });

    // append newRow to the DOM
    $('#train-table > tbody').append(newRow);
});