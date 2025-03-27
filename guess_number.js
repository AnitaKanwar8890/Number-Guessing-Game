let randomNumber = Math.floor(Math.random() * 100) + 1;

const submitBtn = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remainingAttempts = document.querySelector('.lastResult');
const feedback = document.querySelector('.lowOrHi');
const resetButton = document.querySelector('#resetGame');

let previousGuesses = [];
let attemptsLeft = 10;
let gameActive = true;

// Event listener for guess submission
submitBtn.addEventListener('click', function (e) {
    e.preventDefault();
    if (gameActive) {
        const guess = parseInt(userInput.value);
        validateGuess(guess);
    }
});

function validateGuess(guess) {
    if (isNaN(guess) || guess < 1 || guess > 100) {
        alert('⚠️ Please enter a number between 1 and 100!');
    } else {
        previousGuesses.push(guess);
        updateGame(guess);
    }
}

function updateGame(guess) {
    userInput.value = '';
    guessSlot.textContent = previousGuesses.join(', ');
    attemptsLeft--;
    remainingAttempts.textContent = attemptsLeft;

    if (guess === randomNumber) {
        displayMessage('🎉 Congratulations! You guessed the number!', 'green');
        endGame();
    } else if (attemptsLeft === 0) {
        displayMessage(`❌ Game Over! The number was ${randomNumber}`, 'red');
        endGame();
    } else if (guess < randomNumber) {
        displayMessage('📉 Too low! Try again.', 'yellow');
    } else {
        displayMessage('📈 Too high! Try again.', 'yellow');
    }
}

function displayMessage(message, color) {
    feedback.textContent = message;
    feedback.style.color = color;
}

function endGame() {
    gameActive = false;
    userInput.setAttribute('disabled', true);
    submitBtn.setAttribute('disabled', true);
    resetButton.classList.remove('hidden');
}

resetButton.addEventListener('click', function () {
    gameActive = true;
    previousGuesses = [];
    attemptsLeft = 10;
    randomNumber = Math.floor(Math.random() * 100) + 1;

    userInput.removeAttribute('disabled');
    submitBtn.removeAttribute('disabled');
    guessSlot.textContent = 'None';
    remainingAttempts.textContent = '10';
    feedback.textContent = '';
    resetButton.classList.add('hidden');
});
