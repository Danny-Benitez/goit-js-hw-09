const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
let timeOutID;
//get Random Hex Color Function//

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function changeBodyBackground() {
    const color = getRandomHexColor();
     document.body.style.backgroundColor = color;
    timeOutID = setTimeout(changeBodyBackground, 1000);
}

startButton.addEventListener('click', () => {
    startButton.disabled = true; 
    stopButton.disabled = false; 
    changeBodyBackground();
});

stopButton.addEventListener('click', () => {
    startButton.disabled = false; 
    stopButton.disabled = true; 
    clearTimeout(timeOutID);
})

// Write a script that after clicking the start button changes the body element's//
// background color randomly once a second to a random value using the inline style //
// when clicking on the "stop" button the color change function stops //
// Please note that the «Start» button can be clicked an infinite number of times. //
// Make sure that the «Start» button is disabled while the theme change is running. //
