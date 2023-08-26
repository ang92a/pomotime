const start = document.querySelector("pomodoro-container");

let mode = "pomodoroMinutes"; //initial mode will be pomodoroMinutes, other mode will be short or long break
let totalTime = modalOptions.time[mode] * MINUTE; //in seconds
let timeRemaining = totalTime;
let percentRemaining = (timeRemaining / totalTime) * 100;
let interval = null;
let isModalOpen = false;
let isPaused = false;


function start() {

}









start.addEventListener("click", start)