$(document).ready(function(){
    
    var WORK_DAY_LENGTH = 9;
    var WORK_DAY_START = 9;
    var timeblockContainer = $(".container");

    // Create current day and date string for jumbotron
    var todayStr = moment().format("dddd, MMMM Do");
    $("#currentDay").text(todayStr);

    // We'll get saved data from local storage 'scheduled' array
    var scheduled = JSON.parse(localStorage.getItem("scheduled")) || []; // Empty array when not set

    // Handle save operation
    timeblockContainer.on("click", {scheduled: scheduled}, handleSave);

    // Get current hour using moment().format("k") - use 24 hour notation to avoid complications of pm
    // This is used to determine whether timeblocks are past, present or future
    var currentHour = parseInt(moment().format("k"), 10);

    // Create timeblocks
    for (var i = 0; i < WORK_DAY_LENGTH; i++) {

        // Create entry for each timeblock
        var rowElmt = $("<li>");
        rowElmt.addClass("row");

        // Create element to display the hour
        var hourLabelElmt = $("<p>");

        // Set hour label to ith hour of working day with am/pm suffix
        // adding WORK_DAY_START to iterator to get correct hour
        hourLabelElmt.text(moment().hour(i + WORK_DAY_START).format("hA"));
        hourLabelElmt.addClass("hour");

        // Create textarea to accept and display memos
        var hourMemoText = $("<textarea>");
        var hourEntryBttn = $("<button>");

        // Set default memo class
        var memoClass = "future";
        // Update memo class if current timeblock is not in the future 
        if (i + WORK_DAY_START < currentHour) {
            memoClass = "past";
        } else if (i + WORK_DAY_START === currentHour) {
            memoClass = "present";
        }

        // Assemble memo classes 
        hourMemoText.addClass("memo " + memoClass);

        // Add data-index attribute to timeblock so we can store data on correct hour in scheduled array
        hourEntryBttn.attr("data-index", i);
        hourEntryBttn.addClass("iconSave saveBtn");

        // Get any existing memo for this hour
        var textContent = scheduled[i];

        // Add memo to textarea or leave blank
        if (textContent) {
            hourMemoText.text(textContent);
        } else {
            hourMemoText.text("");
        }
        hourEntryBttn.text("Save");

        // Add elements to row
        rowElmt.append(hourLabelElmt);
        rowElmt.append(hourMemoText);
        rowElmt.append(hourEntryBttn);

        // Add row to container
        timeblockContainer.append(rowElmt);
    }
});

function handleSave(event) {
    var clicked = $(event.target);
    // Act only on Save button clicks
    if (clicked.hasClass("saveBtn")) {
        var scheduled = event.data.scheduled;
        var scheduledIndex = parseInt(clicked.data("index"), 10);
        var textContent = clicked.siblings(".memo").val();
        // Update parsed array
        scheduled[scheduledIndex] = textContent;
        // Store JSON-encoded version of updated array in localStorage
        localStorage.setItem("scheduled", JSON.stringify(scheduled));
    }
}