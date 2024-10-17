// script.js

let timers = [];

function addNewTimer() {
  const timerObj = {
    id: Date.now(),
    time: 0,
    intervalId: null,
    isRunning: false,
  };

  timers.push(timerObj);
  renderTimers();
}

function formatTime(time) {
  let hours = Math.floor(time / 3600);
  let minutes = Math.floor((time % 3600) / 60);
  let seconds = time % 60;

  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function renderTimers() {
  const timersDiv = document.getElementById('timers');
  timersDiv.innerHTML = '';

  timers.forEach((timer) => {
    const timerDiv = document.createElement('div');
    timerDiv.classList.add('col-12', 'col-md-6', 'col-lg-4'); // Bootstrap grid classes

    timerDiv.innerHTML = `
      <div class="timer p-3 shadow-sm">
        <h5>Task ${timer.id}</h5>
        <div class="d-flex justify-content-between align-items-center mb-3">
          <span class="time-display">${formatTime(timer.time)}</span>
        </div>
        <div class="d-flex justify-content-center gap-2">
          <button class="btn btn-success" onclick="startTimer(${timer.id})">Start</button>
          <button class="btn btn-warning" onclick="pauseTimer(${timer.id})">Pause</button>
          <button class="btn btn-danger" onclick="resetTimer(${timer.id})">Reset</button>
        </div>
      </div>
    `;

    timersDiv.appendChild(timerDiv);
  });
}

function startTimer(id) {
  const timer = timers.find(t => t.id === id);
  if (timer && !timer.isRunning) {
    timer.intervalId = setInterval(() => {
      timer.time++;
      renderTimers();
    }, 1000);
    timer.isRunning = true;
  }
}

function pauseTimer(id) {
  const timer = timers.find(t => t.id === id);
  if (timer && timer.isRunning) {
    clearInterval(timer.intervalId);
    timer.isRunning = false;
  }
}

function resetTimer(id) {
  const timer = timers.find(t => t.id === id);
  if (timer) {
    timer.time = 0;
    clearInterval(timer.intervalId);
    timer.isRunning = false;
    renderTimers();
  }
}

document.getElementById('addTimer').addEventListener('click', addNewTimer);
renderTimers();
