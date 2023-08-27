//константы из верстки
const pauseButton = document.querySelector(".pause-button");
const selectPomodoro = document.querySelector(".select-pomodoro");
const selectShortBreak = document.querySelector(".select-short-break");
const selectLongBreak = document.querySelector(".select-long-break");
const pomodoroContainer = document.querySelector(".pomodoro-container");
const timeContainer = document.querySelector(".time-container");

// модальное окно для настроек
let modalOptions = {
    color: "tomato",
    font: "kumbahSans",
    time: [{ shortBreakTime: 5, check: false }, { longBreakTime: 9, check: false }, { pomodoroMinutes: 0.1, check: false }]
};

//состояние приложения изначальное

let mode = "pomodoroMinutes";
let totalTime = modalOptions.time[mode] * 60; //в секундах в зависимости от выбранного интервала
let isPaused = true; // Флаг паузы
let interval = null; // Идентификатор интервала

//1. отрисовка при загрузки страницы
document.addEventListener("DOMContentLoaded", () => {
  timeContainer.textContent = formatTimeLeft(totalTime);
  pauseButton.textContent = "START";
});

//2.отрисовка времени
function formatTimeLeft(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  return `${minutes}:${seconds}`;
}

//3. тикающий таймер
function updateTimer() {
  if (!isPaused) {
    totalTime--;
    if (totalTime < 0) {
      clearInterval(interval);
      return;
    }
    const formattedTime = formatTimeLeft(totalTime);
    timeContainer.textContent = formattedTime;
  }
}

pauseButton.addEventListener("click", () => {
  if (isPaused) {
    pauseButton.textContent = "PAUSE";
    isPaused = false;
    interval = setInterval(updateTimer, 1000);
  } else {
    pauseButton.textContent = "RESUME";
    isPaused = true;
    clearInterval(interval);
  }
});

// Инициализация таймера
updateTimer();

// function togglePause() {
//   isPaused = !isPaused;
//   if (isPaused) {
//     pauseButton.innerText = "RESUME";
//   } else {
//     pauseButton.innerText = "PAUSE";
//   }
// }

// //3. событие на кнопку старт
// pauseButton.addEventListener("click", () => {
//   togglePause();
//   updateTimer();
// });
