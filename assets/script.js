$(document).ready(function(){
    
    var WORK_DAY_LENGTH = 9;
    var WORK_DAY_START = 9;
    var timeblockContainer = $(".container");
    // Create current day and date string for jumbotron
    var todayStr = moment().format("dddd, MMMM Do");
    $("#currentDay").text(todayStr);

    // - This will allow us to add/delete local storage scheduled entries
    var scheduled = JSON.parse(localStorage.getItem("scheduled")) || []; // Empty array when not set

    // Get any saved data from local storage (saved in a 'scheduled' array whose length is 9 - the number of timeblocks in the working day), provide scheduled var as handler function is in different scope
    timeblockContainer.on("click", {scheduled: scheduled}, handleSave);

    // Get current hour using moment().format("k") - use 24 hour notation to avoid complications of pm
    var currentHour = parseInt(moment().format("k"), 10);

    // Use for loop to create timeblocks - add 9 to iterator to get correct hour - the offset from 0 to 9am
    for (var i = 0; i < WORK_DAY_LENGTH; i++) {

        var rowElmt = $("<li>");
        rowElmt.addClass("row");

        // Timeblock: hour in dt, content in dd - text in span and button
        var hourLabelElmt = $("<p>");

        // Set hour label to ith hour of working day with am/pm suffix
        hourLabelElmt.text(moment().hour(i + WORK_DAY_START).format("hA"));
        hourLabelElmt.addClass("hour");

        // Add any existing data from the local storage scheduled array

        var hourMemoText = $("<textarea>");
        var hourEntryBttn = $("<button>");

        // Make text content editable
        hourMemoText.attr("contenteditable", "true");

        var memoClass = "future";
        // Apply time status class 
        if (i + WORK_DAY_START < currentHour) {
            memoClass = "past";
        } else if (i + WORK_DAY_START === currentHour) {
            memoClass = "present";
        }

        hourMemoText.addClass("memo " + memoClass);
        // Add data-index attribute to timeblock so we can store data on correct hour in scheduled array
        hourEntryBttn.attr("data-index", i);
        hourEntryBttn.addClass("iconSave saveBtn");

        var textContent = scheduled[i];

        if (textContent) {
            hourMemoText.text(textContent);
        } else {
            hourMemoText.text("");
        }
        hourEntryBttn.text("Save");

        rowElmt.append(hourLabelElmt);
        rowElmt.append(hourMemoText);
        rowElmt.append(hourEntryBttn);

        timeblockContainer.append(rowElmt);
    }

});

function handleSave(event) {
    var clicked = $(event.target);
    var scheduled = event.data.scheduled;

    if (clicked.hasClass("saveBtn")) {
        var scheduledIndex = parseInt(clicked.data("index"), 10);
        var textContent = clicked.siblings(".memo").val();
        scheduled[scheduledIndex] = textContent;
        localStorage.setItem("scheduled", JSON.stringify(scheduled));
    }
}