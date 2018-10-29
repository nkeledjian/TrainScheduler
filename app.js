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

var dataRef = firebase.database();  

var TrainName = "";
var Dest = "";
var Freq = "";
var NextArriv = "";
var MinAway = "";

  // point to HTML handling input
$("#add-train").on("click", function(event) {

    event.preventDefault();

    TrainName = $("#inputName").val();
    Dest = $("#inputDest").val();
    Freq = $("#inputFreq").val();
    NextArriv = $('#inputNextArriv').val();
    MinAway = $("#inputMinAway").val();

    dataRef.ref().push({
            TrainName: TrainName,
            Dest: Dest,
            Freq: Freq,
            NextArriv: NextArriv,
            MinAway: MinAway,
        });

});