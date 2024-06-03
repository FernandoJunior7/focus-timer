const MINUTES_IN_MILISSECONDS = 60 * 1000;

const minutesDisplay = document.querySelector("#minutes");
const secondsDisplay = document.querySelector("#seconds");

const buttonPressAudio = new Audio("./assets/button-press.wav");
const clockAlarmAudio = new Audio("./assets/clock-alarm.mp3");

const playBtn = document.querySelector("#play");
const stopBtn = document.querySelector("#stop");
const addBtn = document.querySelector("#add");
const subtractBtn = document.querySelector("#subtract");

const timer = {
  minutes: 25,
  seconds: 0,
  startTime: null,
  endTime: null,
  intervalID: null,
};

playBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
addBtn.addEventListener("click", addFiveMinutes);
subtractBtn.addEventListener("click", subtractFiveMinutes);

function startTimer() {
  buttonPressAudio.play();
  playBtn.disabled = true;
  timer.startTime = new Date(Date.now());
  timer.endTime = new Date(
    Date.now() + timer.minutes * MINUTES_IN_MILISSECONDS
  );
  timer.intervalID = setInterval(countdown, 990);
}

function stopTimer() {
  buttonPressAudio.play();
  clearInterval(timer.intervalID);
  timer.intervalID = null;
  timer.startTime = null;
  timer.endTime = null;
  updateDisplay(timer.minutes);
  playBtn.disabled = false;
}

function addFiveMinutes() {
  buttonPressAudio.play();

  if (playBtn.disabled) {
    console.log("Não é possível adicionar tempo com o timer funcionando");
    return;
  }
  if (timer.minutes === 60) {
    console.log("Não é possível adicionar um tempo maior que 60 minutos");
    return;
  }

  timer.minutes += 5;
  updateDisplay(timer.minutes);
}

function subtractFiveMinutes() {
  buttonPressAudio.play();

  if (playBtn.disabled) {
    console.log("Não é possível subtrair tempo com o timer funcionando");
    return;
  }

  if (timer.minutes === 25) {
    console.log("Não é possível subtrair um tempo menor que 25 minutos");
    return;
  }

  timer.minutes -= 5;
  updateDisplay(timer.minutes);
}

function countdown() {
  if (Date.now() >= timer.endTime) {
    clockAlarmAudio.play();
    stopTimer();
    return;
  }

  updateDisplay();
}

function updateDisplay(minute) {
  if (minute !== undefined) {
    minutesDisplay.textContent = String(timer.minutes).padStart(2, "0");
    secondsDisplay.textContent = String(timer.seconds).padStart(2, "0");
    return;
  }

  const minutes = new Date(timer.endTime - Date.now()).getMinutes();
  const seconds = new Date(timer.endTime - Date.now()).getSeconds();
  console.log(minutes);
  console.log(seconds);
  minutesDisplay.textContent = String(minutes).padStart(2, "0");
  secondsDisplay.textContent = String(seconds).padStart(2, "0");
}

updateDisplay(timer.minutes);
