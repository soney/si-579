const display = document.getElementById('time-digit');
const start_button = document.getElementById('start-button');
const stop_button = document.getElementById('stop-button');
const reset_button = document.getElementById('reset-button');
let clock = 0;
let isStart = false;
let offset  = Date.now();
let interval = null;

const handleStart = (event) => {
    // if the timer is not started, then start it
    if(!isStart) {
        isStart = true;

        // disable the start button, enable the stop button
        start_button.toggleAttribute('disabled');
        stop_button.toggleAttribute('disabled');
        // compute the current time
        offset = Date.now();
        // run the update function every 1000 milliseconds
        interval = setInterval(update, 1000);
    }
};

const handleStop = (event) => {
    if(isStart) {
        // disable the start button, enable the stop button
        start_button.toggleAttribute('disabled');
        stop_button.toggleAttribute('disabled');
        isStart = false;
        if(interval) {
            clearInterval(interval);
            interval = null;
        }
    }
}

const handleReset = (event) => {
    handleStop();
    clock = 0;
    render();
}

const update = () => {
    const now = Date.now()
    const delta = now - offset;
    offset = now;
    clock += delta;
    render();
}

const render = () => {
    display.innerHTML = Math.round(clock / 1000); 
}

start_button.addEventListener('click', handleStart);
stop_button.addEventListener('click', handleStop);
reset_button.addEventListener('click', handleReset);