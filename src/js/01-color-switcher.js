function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let intervalId;

function changeBgdColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

startBtn.addEventListener('click', () => {
    startBtn.disabled = true;
    stopBtn.disabled = false;

    intervalId = setInterval(changeBgdColor, 1000);
});

stopBtn.addEventListener('click', () => {
    clearInterval(intervalId);

    stopBtn.disabled = true;
    startBtn.disabled = false;
});



