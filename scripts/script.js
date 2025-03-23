document.addEventListener("DOMContentLoaded", () => {
  const wordContainer = document.getElementById("word-container");
  const keyboard = document.getElementById("keyboard");
  const hangmanImage = document.getElementById("hangman-image");
  const playAgainBtn = document.getElementById("play-again");
  const hintDisplay = document.getElementById("hint");
  
  let words = [];
  let selectedWord = "";
  let selectedHint = "";
  let guessedLetters = [];
  let wrongGuesses = 0;
  const maxGuesses = 6;

  // Fetch words from JSON
  fetch("words.json")
      .then(response => response.json())
      .then(data => {
          words = data;
          startGame();
      });

  function startGame() {
      const randomIndex = Math.floor(Math.random() * words.length);
      selectedWord = words[randomIndex].word.toUpperCase();
      selectedHint = words[randomIndex].hint;
      guessedLetters = [];
      wrongGuesses = 0;
      hangmanImage.src = `images/hang0.png`;
      hintDisplay.textContent = `Hint: ${selectedHint}`;
      updateWordDisplay();
      generateKeyboard();
      playAgainBtn.classList.add("hidden");
  }

  function updateWordDisplay() {
      wordContainer.innerHTML = selectedWord
          .split("")
          .map(letter => (guessedLetters.includes(letter) || letter === " " ? letter : "_"))
          .join(" ");
  }

  function generateKeyboard() {
      keyboard.innerHTML = "";
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      alphabet.split("").forEach(letter => {
          const button = document.createElement("button");
          button.textContent = letter;
          button.classList.add("letter-button");
          button.addEventListener("click", () => handleGuess(letter, button));
          keyboard.appendChild(button);
      });
  }

  function handleGuess(letter, button) {
      if (guessedLetters.includes(letter) || wrongGuesses >= maxGuesses) return;
      guessedLetters.push(letter);

      if (selectedWord.includes(letter)) {
          updateWordDisplay();
          checkWin();
      } else {
          wrongGuesses++;
          hangmanImage.src = `images/hang${wrongGuesses}.png`;
          button.classList.add("wrong");
          button.classList.add("shake");
          setTimeout(() => button.classList.remove("shake"), 500);
          checkLoss();
      }

      button.disabled = true;
  }

  function checkWin() {
      if (!wordContainer.textContent.includes("_")) {
          alert("Congratulations! You won!");
          playAgainBtn.classList.remove("hidden");
      }
  }

  function checkLoss() {
      if (wrongGuesses >= maxGuesses) {
          alert(`Game Over! The word was "${selectedWord}".`);
          playAgainBtn.classList.remove("hidden");
      }
  }

  document.addEventListener("keydown", (event) => {
      const letter = event.key.toUpperCase();
      if (/^[A-Z]$/.test(letter)) {
          const button = [...keyboard.children].find(btn => btn.textContent === letter);
          if (button && !button.disabled) {
              handleGuess(letter, button);
          }
      }
  });

  playAgainBtn.addEventListener("click", startGame);
});