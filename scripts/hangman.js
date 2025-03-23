document.addEventListener('DOMContentLoaded', () => {
    const wordDisplay = document.getElementById('word-display');
    const hintDisplay = document.getElementById('hint-display');
    const keyboardDiv = document.getElementById('keyboard');
    const letterInput = document.getElementById('letter-input');
    const guessButton = document.getElementById('guess-button');
    const hangmanImage = document.getElementById('hangman-image');
    const resultMessage = document.getElementById('result-message');
    const playAgainButton = document.getElementById('play-again');
  
    // Embedded JSON data (previously in words.json)
    const words = [
      { "phrase": "May the Force be with you", "hint": "Star Wars classic" },
      { "phrase": "I'll be back", "hint": "Terminator catchphrase" },
      { "phrase": "Houston we have a problem", "hint": "Apollo 13 quote" },
      { "phrase": "There's no place like home", "hint": "The Wizard of Oz" },
      { "phrase": "You talking to me", "hint": "Taxi Driver iconic line" },
      { "phrase": "The Great Gatsby", "hint": "F. Scott Fitzgerald novel" },
      { "phrase": "To Kill a Mockingbird", "hint": "Harper Lee novel" },
      { "phrase": "Pride and Prejudice", "hint": "Jane Austen novel" },
      { "phrase": "The Catcher in the Rye", "hint": "J.D. Salinger novel" },
      { "phrase": "Moby Dick", "hint": "Herman Melville classic" },
      { "phrase": "Hello World", "hint": "First program output" },
      { "phrase": "Have you tried turning it off and on again", "hint": "IT support advice" },
      { "phrase": "It's not a bug it's a feature", "hint": "Programmer excuse" },
      { "phrase": "There are 10 types of people in the world", "hint": "Binary joke" },
      { "phrase": "Blue Screen of Death", "hint": "Windows error" },
      { "phrase": "Winter is coming", "hint": "Game of Thrones warning" },
      { "phrase": "Keep Calm and Carry On", "hint": "British wartime slogan" },
      { "phrase": "Just Do It", "hint": "Famous advertising slogan" },
      { "phrase": "Live long and prosper", "hint": "Star Trek greeting" },
      { "phrase": "Hakuna matata", "hint": "The Lion King phrase" }
    ];
  
    let currentPhrase = '';
    let currentHint = '';
    let displayedPhrase = [];
    let wrongGuesses = 0;
    const maxWrongGuesses = 6;
    let guessedLetters = new Set();
    let gameActive = true;
  
    // Start a new game by resetting all variables
    function startNewGame() {
      gameActive = true;
      wrongGuesses = 0;
      guessedLetters = new Set();
      resultMessage.textContent = '';
      wordDisplay.classList.remove('win-word'); // Remove win styling if present
      playAgainButton.classList.add('hidden');
      hangmanImage.src = '../images/hang0.png';
      letterInput.disabled = false;
      guessButton.disabled = false;
      keyboardDiv.innerHTML = '';
  
      // Randomly select a phrase and its hint
      const randomIndex = Math.floor(Math.random() * words.length);
      currentPhrase = words[randomIndex].phrase.toUpperCase();
      currentHint = words[randomIndex].hint;
  
      // Prepare displayed phrase: letters as underscores, preserve spaces/punctuation
      displayedPhrase = currentPhrase.split('').map(char => {
        return /[A-Z0-9]/.test(char) ? '_' : char;
      });
  
      updateWordDisplay();
      hintDisplay.textContent = 'Hint: ' + currentHint;
      createKeyboard();
    }
  
    // Update the displayed phrase with spaces between letters
    function updateWordDisplay() {
      wordDisplay.textContent = displayedPhrase.join(' ');
    }
  
    // Create the on-screen keyboard
    function createKeyboard() {
      const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      for (let letter of alphabet) {
        const button = document.createElement('button');
        button.textContent = letter;
        button.addEventListener('click', () => handleGuess(letter));
        keyboardDiv.appendChild(button);
      }
    }
  
    // Handle letter guess
    function handleGuess(letter) {
      if (!gameActive || guessedLetters.has(letter)) return;
  
      guessedLetters.add(letter);
      disableKeyboardButton(letter);
  
      if (currentPhrase.includes(letter)) {
        // Reveal all instances of the guessed letter
        for (let i = 0; i < currentPhrase.length; i++) {
          if (currentPhrase[i] === letter) {
            displayedPhrase[i] = letter;
          }
        }
        updateWordDisplay();
        checkWin();
      } else {
        // Wrong guess: update hangman and animate
        wrongGuesses++;
        updateHangmanImage();
        animateWrongGuess();
        checkLoss();
      }
    }
  
    // Disable the on-screen button once guessed
    function disableKeyboardButton(letter) {
      const buttons = keyboardDiv.getElementsByTagName('button');
      for (let btn of buttons) {
        if (btn.textContent === letter) {
          btn.disabled = true;
          btn.classList.add('disabled');
          break;
        }
      }
    }
  
    // Update hangman image based on wrong guesses
    function updateHangmanImage() {
      hangmanImage.src = `../images/hang${wrongGuesses}.png`;
    }
  
    // Animate the hangman image on a wrong guess
    function animateWrongGuess() {
      hangmanImage.classList.add('shake');
      setTimeout(() => {
        hangmanImage.classList.remove('shake');
      }, 500);
      hangmanImage.style.border = `5px solid #ff6b6b`;
      setTimeout(() => {
        hangmanImage.style.border = 'none';
      }, 500);
    }
  
    // Check if the player has won
    function checkWin() {
      if (!displayedPhrase.includes('_')) {
        gameActive = false;
        resultMessage.textContent = 'Congratulations! You won!';
        wordDisplay.classList.add('win-word');
        endGame();
      }
    }
  
    // Check if the player has lost
    function checkLoss() {
      if (wrongGuesses >= maxWrongGuesses) {
        gameActive = false;
        resultMessage.textContent = `Game Over! The phrase was: ${currentPhrase}`;
        revealPhrase();
        endGame();
      }
    }
  
    // Reveal the complete phrase when game over
    function revealPhrase() {
      displayedPhrase = currentPhrase.split('');
      updateWordDisplay();
    }
  
    // End game by disabling inputs and dulling all keyboard buttons
    function endGame() {
      letterInput.disabled = true;
      guessButton.disabled = true;
      const buttons = keyboardDiv.getElementsByTagName('button');
      for (let btn of buttons) {
        btn.disabled = true;
        btn.classList.add('disabled');
      }
      playAgainButton.classList.remove('hidden');
    }
  
    // Event listener for the guess button (using the input box)
    guessButton.addEventListener('click', () => {
      const letter = letterInput.value.toUpperCase();
      if (letter && /^[A-Z0-9]$/.test(letter)) {
        handleGuess(letter);
      }
      letterInput.value = '';
    });
  
    // Allow the user to press Enter in the input box
    letterInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        guessButton.click();
      }
    });
  
    // Play Again button event listener
    playAgainButton.addEventListener('click', () => {
      startNewGame();
    });
  
    // Listen for physical keyboard input (unless focused in the text input)
    document.addEventListener('keydown', (e) => {
      const letter = e.key.toUpperCase();
      if (/^[A-Z0-9]$/.test(letter) && document.activeElement !== letterInput) {
        handleGuess(letter);
      }
    });
  
    // Initialize the game immediately using the embedded words
    startNewGame();
  });
  