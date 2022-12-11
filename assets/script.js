$(document).ready(function(){
    
    // Create current day and date string for jumbotron
    var todayStr = moment().format("dddd, MMMM Do");
    $("#currentDay").text(todayStr);
});