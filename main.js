const minutesDisplay = document.querySelector("#minutes");
const secondsDisplay = document.querySelector("#seconds");

const playBtn = document.querySelector("#play");
const stopBtn = document.querySelector("#stop");

const timer = {
  minutes: 25,
  seconds: 0,
  intervalID: null,
};

playBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);

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
