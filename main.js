const minutesDisplay = document.querySelector("#minutes");
const secondsDisplay = document.querySelector("#seconds");

const playBtn = document.querySelector("#play");
const stopBtn = document.querySelector("#stop");
const addBtn = document.querySelector("#add");
const subtractBtn = document.querySelector("#subtract");

const timer = {
  minutes: 25,
  seconds: 0,
  intervalID: null,
};

playBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
addBtn.addEventListener("click", addFiveMinutes);
subtractBtn.addEventListener("click", subtractFiveMinutes);

function startTimer() {
  playBtn.disabled = true;
  timer.intervalID = setInterval(countdown, 1000);
}

function stopTimer() {
  clearInterval(timer.intervalID);
  timer.intervalID = null;
  timer.minutes = 25;
  timer.seconds = 0;
  updateDisplay();
  playBtn.disabled = false;
}

function addFiveMinutes() {
  if (timer.intervalID !== null) {
    console.log("Não é possível adicionar tempo com o timer funcionando");
    return;
  }
  if (timer.minutes === 60) {
    console.log("Não é possível adicionar um tempo maior que 60 minutos");
    return;
  }

  timer.minutes += 5;
  updateDisplay();
}

function subtractFiveMinutes() {
  if (timer.intervalID !== null) {
    console.log("Não é possível subtrair tempo com o timer funcionando");
    return;
  }

  if (timer.minutes === 25) {
    console.log("Não é possível subtrair um tempo menor que 25 minutos");
    return;
  }

  timer.minutes -= 5;
  updateDisplay();
}

function countdown() {
  timer.seconds--;

  if (timer.seconds === 0 && timer.minutes === 0) {
    clearInterval(timer.intervalID);
    timer.intervalID = null;
    playBtn.disabled = false;
    updateDisplay();
    return;
  }

  if (timer.seconds <= 0) {
    timer.minutes--;
    timer.seconds = 59;
  }

  updateDisplay();
}

function updateDisplay() {
  minutesDisplay.textContent = String(timer.minutes).padStart(2, "0");
  secondsDisplay.textContent = String(timer.seconds).padStart(2, "0");
}
