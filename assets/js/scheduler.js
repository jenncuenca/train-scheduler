$(document).ready(function() { 

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAdolw4zVwZr5YfUjBU689M4gkLwuLDfJo",
    authDomain: "train-scheduler-48b81.firebaseapp.com",
    databaseURL: "https://train-scheduler-48b81.firebaseio.com",
    projectId: "train-scheduler-48b81",
    storageBucket: "",
    messagingSenderId: "827412972876"
  };

  firebase.initializeApp(config);

  const database = firebase.database();

  //TABLE MOD

  database.ref().on("child_added", function(trainInfo){
     // console.log(trainInfo.val());
     let currentTrain = trainInfo.val();
     let newTR = $("<tr>");
    //  let newTD = $("<td>");

    //  newTD.html(currentTrain.trainName);
     newTR.append($("<td>" + currentTrain.trainName + "</td>"));
     newTR.append($("<td>" + currentTrain.destination + "</td>"));
     newTR.append($("<td>" + currentTrain.frequency + "</td>"));



    $("#train-data").append(newTR);



   });



  //ADDS TRAIN TO TABLE WITH BUTTON CLICK
  $("#addTrainBtn").on("click", function(event){
        event.preventDefault(); // prevents form default from reloading page

        console.log("button clicked")

        //Grabs input from form
        let newTrain = {
            trainName: $("#train-name-input").val().trim(),
            destination: $("#destination-input").val().trim(),
            frequency: $("#frequency-input").val().trim(),
            firstTime: $("#first-time-input").val().trim(),
        }

        //console log everything
        console.log(newTrain.trainName)
        console.log(newTrain.destination)
        console.log(newTrain.frequency)
        console.log(newTrain.firstTime)

        //pushes train data to firebase
        database.ref().push(newTrain);
    });//end submitBtn onClick

}); //end of onReady Function