//константы из верстки
const pauseButton = document.querySelector(".pause-button");
const selectPomodoro = document.querySelector(".select-pomodoro");
const selectShortBreak = document.querySelector(".select-short-break");
const selectLongBreak = document.querySelector(".select-long-break");
const pomodoroContainer = document.querySelector(".pomodoro-container");
const timeContainer = document.querySelector(".time-container");

// модальное окно для настроек
let time = [
  { name: "shortBreakTime", minut: 5, check: false },
  { name: "longBreakTime", minut: 9, check: false },
  { name: "pomodoroMinutes", minut: 0.1, check: false },
];

// состояние приложения изначальное

let mode = "pomodoroMinutes"; // первоначально mode равен "pomodoroMinutes"
let timeNum = time.find((el) => el.name === mode);
let totalTime = timeNum.minut * 60; //в секундах в зависимости от выбранного интервала
let isPaused = true; // Флаг паузы
let interval = null; // Идентификатор интервала

//1. отрисовка при загрузки страницы
function render() {
  document.addEventListener("DOMContentLoaded", () => {
    timeContainer.textContent = formatTimeFirst(totalTime);
    pauseButton.textContent = "START";
  });
}

//2.отрисовка времени в формате мм:сс
function formatTimeFirst(time) {
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
      pauseButton.textContent = "START";
      return;
    }
    const formattedTime = formatTimeFirst(totalTime);
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
render();
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
