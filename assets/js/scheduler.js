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

      //loads database data to table

    
      //ADDS TRAIN DATA TO FIREBASE WITH BUTTON CLICK
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
    
            //console log all of the things
                console.log(newTrain.trainName)
                console.log(newTrain.destination)
                console.log(newTrain.frequency)
                console.log(newTrain.firstTime)
    
            //pushes train data to firebase
            database.ref().push(newTrain);

            //clears all of the form text-boxes
            $("#train-name-input").val('');
            $("#destination-input").val('');
            $("#frequency-input").val('');
            $("#first-time-input").val('');

        });//end submitBtn onClick

    
    let nextTrain;
    
    // DATA CALCULATED AND APPENDED TO TABLE
      database.ref().on("child_added", function(trainInfo){

        //console log more things
            console.log(trainInfo.val());
            console.log("frequency: " + trainInfo.frequency)

        // CALCULATION VARIABLES
        
        let train = trainInfo.val(); // snapshot of train data

        // initial info needed to start calculations
        let trainFrequency = trainInfo.frequency;
        let firstTrain = trainInfo.firstTime;

        //data from first train gets converted
        let convertedFirstArrival = moment(trainInfo.firstTime, "HH:mm").subtract(1, "years");
        
        let currentTime = moment();

        //time difference between current time and the converted initial time
        let timeDiff = moment().diff(moment(convertedFirstArrival), "minutes");
        
        //calculate the remainder between the time difference and the train frequency
        let timeRemainder = timeDiff % trainFrequency;
        //the difference between the frequency and the remainder SHOULD give the minutes until the next train.
        let minutesAway = trainFrequency - timeRemainder;

        //adds the minutes away to the current time to show when the next train is.
        let nextTrain = moment().add(minutesAway, "minutes");

        //formats the nextTrain into an actual time
        let arrivalTime = moment(nextTrain).format("hh:mm");

        
        //console log all of the things
            console.log("TRAIN FREQUENCY: " + trainFrequency);
            console.log("FIRST TRAIN: " + firstTrain);
            console.log("CURRENT TIME:" + currentTime);
            console.log("CONVERTED TIME: " + convertedFirstArrival);
            console.log("TIME DIFFERENCE: " + timeDiff);
            console.log("REMAINDER: " + timeRemainder);
            console.log("MINUTES AWAY: " +  minutesAway)
            console.log("ARRIVAL TIME: " + arrivalTime);
            console.log("NEXT TRAIN: " + nextTrain);
   
        //let nextArrival = (++[trainInfo.firstTime + trainInfo.frequency]); // firstTime + frequency till greater than current time
                       // while next train is > than current time +frequency until < than current time in a loop
        
   
   
        let newTR = $("<tr>");
        
        newTR.append($("<td>" + train.trainName + "</td>"));
        newTR.append($("<td>" + train.destination + "</td>"));
        newTR.append($("<td>" + train.frequency + "</td>"));
        newTR.append($("<td>" + nextTrain + "</td>"));
        newTR.append($("<td>" + minutesAway + "</td>"));
   
   
   
       $("#train-data").append(newTR);
   
      });//end of calualate and append function

    
    }); //end of onReady Function



//       //TABLE MOD
//         database.ref().on("child_added", function(trainInfo, prevTrainInfo){
    
//         console.log(trainInfo.val()); //snapshot of train info values logged in console
     
//         let train = trainInfo.val();

//      //snapshots 


//         //times
//         let timeDiff = 0;
//         let minutes = frequency - timeDiff;
//         let nextArrival = moment().add(minutes, "m").format("hh:mm A");

//         let currentTime = moment(new Date ());
        
//         console.log(currentTime);

    
    
//         let minutesAway = currentTime.diff(nextArrival, "Minutes");
    


//     let newTR = $("<tr>");
    
//     newTR.append($("<td>" + train.trainName + "</td>"));
//     newTR.append($("<td>" + train.destination + "</td>"));
//     newTR.append($("<td>" + train.frequency + "</td>"));
//     newTR.append($("<td>" + moment(nextArrival).format("h:mm") + "</td>"));
//     newTR.append($("<td>" + minutesAway + "</td>"));



//    $("#train-data").append(newTR);

//   });


// }); //end of onReady Function