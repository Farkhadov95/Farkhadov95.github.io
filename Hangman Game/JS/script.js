var wordEl = document.querySelector('#word');
var wrongLetterEl = document.querySelector('#wrong-letters');
var playAgainBtn = document.querySelector('#play-button');
var popup = document.querySelector('#popup-container');
var notification = document.querySelector('#notification-container');
var finalMessage = document.querySelector('#final-message');

var figureParts = document.querySelectorAll('.figure-part');
var words = ['application', 'programming','interface', 'wizard'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

var correctLetters = [];
var wrongLetters = [];

function displayWord() {
    wordEl.innerHTML = `
        ${selectedWord
            .split('')
            .map(letter => `
                <span class="letter">
                    ${correctLetters.includes(letter) ? letter : ''}
                </span>
            `).join('')}
    `;
    
    var innerWord = wordEl.innerText.replace(/\n/g, '');

    if(innerWord === selectedWord) {
        finalMessage.innerText = 'Congratulations! You Won! =)';
        popup.style.display = 'flex';
    }
}


// Update wrong letters
function updateWrongLettersEl() {
    wrongLetterEl.innerHTML = `
        ${wrongLetters.length > 0 ? `<p>Wrong</p>` : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;
    
    // Display parts
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;
        
        if(index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    });
    
    //Check if lost 
    if(wrongLetters.length === figureParts.length) {
        finalMessage.innerText = 'Unfortunaly you lost. =(';
        popup.style.display = 'flex';
    }
}

// Show notification 

function showNotification() {
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

//keydown letter press
window.addEventListener('keydown', e => {
    if(e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;
        
        if(selectedWord.includes(letter)) {
            if(!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            } else {
                showNotification();
            }
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                
                updateWrongLettersEl();
            } else {
                showNotification();
            }
        }
    }
});

// Restart game and play again 
playAgainBtn.addEventListener('click', () => {
    // Empty arrays
    correctLetters.splice(0);
    wrongLetters.splice(0);
    
    selectedWord = words[Math.floor(Math.random() * words.length)];
    
    displayWord();
    
    updateWrongLettersEl();
    
    popup.style.display = 'none';
})

displayWord();