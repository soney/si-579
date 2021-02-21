var myVar = setInterval(myTimer, 1000);
var moment = require('moment');

function myTimer() {
    document.getElementById("demo").innerHTML = moment().format("DD-MM-YYYY hh:mm:ss A");
}


function myFunction() {
    var x = document.getElementById("myInput").value;
    let number = parseInt(x);
    document.getElementById("date").innerHTML =
        moment().add(number, 'days').calendar() ; // September 18th 2020, 10:30:42 pm
}

function dateFunction() {
    var x = document.getElementById("dateInput").value;
    var date1 = moment(x);
    var date2 = moment();
    var diff = date1.diff(date2, 'days') + " days away from today";

    document.getElementById("days").innerHTML = diff;
}