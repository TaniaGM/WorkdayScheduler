let workSchedule = {
  "9 AM": "",
  "10 AM": "",
  "11 AM": "",
  "12 PM": "",
  "1 PM": "",
  "2 PM": "",
  "3 PM": "",
  "4 PM": "",
  "5 PM": "",
};

let counter = 1;
for (const property in workSchedule) {
  let enterText = "#enter-text" + counter;
  $(enterText).text(workSchedule[property]);
  let timeId = "#time" + counter;
  let currentHour = moment().hour();
  let timeString = $(timeId).text();
  let timeNumber = hourNumberFromHourString(timeString);
  if (timeNumber < currentHour) {
    $(enterText).addClass("past");
  } else if (timeNumber > currentHour) {
    $(enterText).addClass("future");
  } else {
    $(enterText).addClass("current");
  }
  counter++;
}

$(document).ready(function () {
  if (!localStorage.getItem('workSchedule')) {
    updateCalendarTasks(workSchedule);
  } else {
    updateCalendarTasks(JSON.parse(localStorage.getItem('workSchedule')));
  }
})

$('#date-today h6').text(moment().format('dddd') + ", " + moment().format('MMMM Do YYYY, h:mm:ss a'));

$("button").click(function () {
  value = $(this).siblings("textarea").val();
  hourString = $(this).siblings("div").text();

  saveSchedule(hourString, value);
});

function hourNumberFromHourString(hourString) {
  switch (hourString) {
    case "9 AM": return 9;
    case "10 AM": return 10;
    case "11 AM": return 11;
    case "12 PM": return 12;
    case "1 PM": return 13;
    case "2 PM": return 14;
    case "3 PM": return 15;
    case "4 PM": return 16;
    case "5 PM": return 17;
  }
}

function loadCorrectDataset() {
  result = localStorage.getItem('workSchedule')
  return (result ? result : workSchedule);
}

function initializeLocalStorage() {
  localStorage.setItem('workSchedule', JSON.stringify(workSchedule));
};

function saveToLocalStorage(dayObj) {
  localStorage.setItem('workSchedule', JSON.stringify(dayObj));
}

function saveSchedule(hourString, val) {
  if (!localStorage.getItem('workSchedule')) {
    initializeLocalStorage();
  }

let workHours = JSON.parse(localStorage.getItem('workSchedule'));
  workHours[hourString] = val

  saveToLocalStorage(workHours);
}

function updateCalendarTasks(dayObject) {
  $(".hour-row").each(function (index) {
    let res = $(this).children("div");
    $(this).children("textarea").text(dayObject[res.text()]);
  })
}