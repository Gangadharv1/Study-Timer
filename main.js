let timerInterval;
let timeLeft;
let studyTime;
let breakTime;
let isStudying = true;

function startTimerSetup() {
    // Get study and break times from input fields
    studyTime = parseInt(document.getElementById('study-time').value) * 60; 
    breakTime = parseInt(document.getElementById('break-time').value) * 60; 
    timeLeft = studyTime; // Start with study time
    document.getElementById('settings-container').style.display = 'none'; 
    document.getElementById('timer-container').style.display = 'block'; 
    updateTimerDisplay();
    startTimer();
}

function updateTimerDisplay() {
    const timerDisplay = document.getElementById('timer');
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer() {
    if (!timerInterval) {
        timerInterval = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            } else {
                clearInterval(timerInterval);
                timerInterval = null;
                // Switch between study and break
                if (isStudying) {
                    timeLeft = breakTime; 
                    isStudying = false; 
                    alert("Time's up! It's break time.");
                } else {
                    timeLeft = studyTime; 
                    isStudying = true; 
                    alert("Break's over! Time to study.");
                }
                updateTimerDisplay();
                startTimer(); // Automatically start the next timer
            }
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    timeLeft = studyTime; 
    isStudying = true; 
    updateTimerDisplay();
    document.getElementById('settings-container').style.display = 'block'; 
    document.getElementById('timer-container').style.display = 'none'; 
}

// Initialize the timer display
function initializeTimerDisplay() {
    const timerDisplay = document.getElementById('timer');
    timerDisplay.textContent = "00:00"; 
}

// Call this function to set the initial display
initializeTimerDisplay();