$(document).ready(function(){
    
    var WORK_DAY_LENGTH = 9;
    var WORK_DAY_START = 9;
    var timeblockContainer = $(".container");
    // Create current day and date string for jumbotron
    var todayStr = moment().format("dddd, MMMM Do");
    $("#currentDay").text(todayStr);

    // - This will allow us to add/delete local storage scheduled entries
    var scheduled = JSON.parse(localStorage.getItem("scheduled")) || []; // Empty array when not set

    // Get any saved data from local storage (saved in a 'scheduled' array whose length is 9 - the number of timeblocks in the working day)
    timeblockContainer.on("click", {scheduled: scheduled}, handleSave);

    // Get current hour using moment().format("k") - use 24 hour notation to avoid complications of pm
    var currentHour = parseInt(moment().format("k"), 10);

    // Use for loop to create timeblocks - add 9 to iterator to get correct hour - the offset from 0 to 9am
    for (var i = 0; i < WORK_DAY_LENGTH; i++) {

        // Timeblock: hour in dt, content in dd - text in span and button
        var hourLabelElmt = $("<dt>");

        // Set hour label to ith hour of working day with am/pm suffix
        hourLabelElmt.text(moment().hour(i + WORK_DAY_START).format("hA"));
        timeblockContainer.append(hourLabelElmt);

        // Add any existing data from the local storage scheduled array

        var hourEntryElmt = $("<dd>");
        var hourEntryText = $("<span>");
        var hourEntryBttn = $("<button>");

        // Make text content editable
        hourEntryText.attr("contenteditable", "true");
        // Add data-index attribute to timeblock so we can store data on correct hour in scheduled array
        hourEntryBttn.attr("data-index", i);
        hourEntryBttn.addClass("saveBtn");

        var textContent = scheduled[i];

        if (textContent) {
            hourEntryText.text(textContent);
        } else {
            hourEntryText.text("");
        }
        hourEntryBttn.text("Save");

        hourEntryElmt.append(hourEntryText);
        hourEntryElmt.append(hourEntryBttn);

        timeblockContainer.append(hourEntryElmt);

        var timeClass = "future";
        // Apply time status class 
        if (i + WORK_DAY_START < currentHour) {
            timeClass = "past";
        } else if (i + WORK_DAY_START === currentHour) {
            timeClass = "present";
        }

        hourLabelElmt.addClass(timeClass);
    }

});

function handleSave(event) {
    var clicked = $(event.target);
    var scheduled = event.data.scheduled;

    if (clicked.hasClass("save-bttn")) {
        var scheduledIndex = parseInt(clicked.data("index"), 10);
        var textContent = clicked.siblings("span").text();
        scheduled[scheduledIndex] = textContent;
        localStorage.setItem("scheduled", JSON.stringify(scheduled));
    }
}