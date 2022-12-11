$(document).ready(function(){
    
    // Create current day and date string for jumbotron
    var todayStr = moment().format("dddd, MMMM Do");
    $("#currentDay").text(todayStr);

    // Get any saved data from local storage (saved in a 'scheduled' array whose length is 9 - the number of timeblocks in the working day)
    // Add change event listener to .container - hopefully will be able to get events bubbling from timeblocks
    // - This will allow us to add/delete local storage scheduled entries

    // Get current hour using moment().format("k") - use 24 hour notation to avoid complications of pm
    // Use for loop to create timeblocks - add 9 to iterator to get correct hour - the offset from 0 to 9am

    //      Timeblock: hour in dt, content in dd - text in span and button

    //      Add any existing data from the local storage scheduled array

    //      Add appropriate class to timeblock -
    //          if i < currHour class = 'past'
    //          else if i === currHour class = 'present'
    //          else class = 'future'

    //      Add data-hour attribute to timeblock so we can store data on correct hour in scheduled array

    //      set contenteditable attribute to true

});