const msgEl = document.getElementById('msg');

const randomNum = getRandomNumber();
console.log('Number:', randomNum);

function getRandomNumber() {
    return Math.ceil(Math.random() * 100);
};

// Capture user speak
function onSpeak(e) {
    const message = e.results[0][0].transcript;
    // console.log(message);

    writeMessag(message);
    checkNumber(message);
};

function writeMessag(message) {
    msgEl.innerHTML = `
        <div>You said:</div>
        <span class="box">${message}</span>
    `;
};

function checkNumber(message) {
    const number = +message;

    // Check if valid number
    if(Number.isNaN(number)) {
        msgEl.innerHTML += `<div>That is not a valid number</div>`;
        return;
    } 

    // Check if in range
    if(number > 100 || number < 1) {
        msgEl.innerHTML += `<div>Number must be between 1 and 100</div>`;
        return;
    }

    // Check number
    if(number === randomNum) {
        document.body.innerHTML = `<h1>Congrats! You have guessed the number! <br/><br/>
        It was ${number}.
        </h1>
        <button class="play-again" id="play-again">Play Again</button>` 
    } else if(number > randomNum) {
        msgEl.innerHTML += '<div>Go LOWER</div>';
    } else {
        msgEl.innerHTML += '<div>Go HIGHER</div>';

    }
};

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// Start recognition and game
recognition.start();

// Speak result
recognition.addEventListener('result', onSpeak);
recognition.addEventListener('end', () => recognition.start());

document.body.addEventListener('click', () => {
    if(e.target.id === 'play-again') {
        window.location.reload();
    }
})