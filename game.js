const wordList = ["javascript", "programming", "computer", "science"];
const images = [
  "img/0.png",
  "img/1.png",
  "img/2.png",
  "img/3.png",
  "img/4.png",
  "img/5.png",
  "img/6.png",
];
let score = 0;

// Select a random word
let word = wordList[Math.floor(Math.random() * wordList.length)];

// Initialize variables
let correctGuesses = [];
let incorrectGuesses = "";
let remainingGuesses = 6;

// Get the elements from the HTML
const wordEl = document.getElementById("word");
const imageEl = document.getElementById("image");
const incorrectEl = document.getElementById("incorrect");
const remainingEl = document.getElementById("remaining");
const scoreEl = document.getElementById("score");
const playAgainBtn = document.getElementById("playAgain");
const hintBtn = document.getElementById("hint");
const keyboard = document.getElementById("keyboard");

playAgainBtn.addEventListener("click", function () {
  // Reset the game
  correctGuesses = [];
  incorrectGuesses = "";
  remainingGuesses = 6;
  word = wordList[Math.floor(Math.random() * wordList.length)];
  playAgainBtn.style.display = "none";
  imageEl.src = images[0];
  wordEl.textContent = "";
  incorrectEl.textContent = "Incorrect guesses: ";
  remainingEl.textContent = "Remaining guesses: 6";
  scoreEl.textContent = "Score: " + score;
  hintBtn.style.display = "block";
  keyboard.style.display = "block";
});

hintBtn.addEventListener("click", function () {
  let hint = "";
  do {
    hint = word[Math.floor(Math.random() * word.length)];
  } while (correctGuesses.includes(hint) || incorrectGuesses.includes(hint));
  alert("Hint: " + hint);
});

keyboard.addEventListener("click", function (e) {
  if (e.target.matches(".key")) {
    let guess = e.target.textContent.toLowerCase();

    // Check if the guess is correct
    if (word.includes(guess)) {
      // Update the correct guesses array
      for (let i = 0; i < word.length; i++) {
        if (word[i] === guess && !correctGuesses.includes(guess)) {
          correctGuesses.push(guess);
        }
      }
    } else {
      // Update the incorrect guesses string
      if (!incorrectGuesses.includes(guess)) {
        incorrectGuesses += guess;
        remainingGuesses--;
      }
    }

    // Display the image
    imageEl.src = images[6 - remainingGuesses];

    // Display the word with the correct guesses filled in
    let wordToShow = "";
    for (let i = 0; i < word.length; i++) {
      if (correctGuesses.includes(word[i])) {
        wordToShow += word[i];
      } else {
        wordToShow += "_";
      }
    }
    wordEl.textContent = wordToShow;
    incorrectEl.textContent = "Incorrect guesses: " + incorrectGuesses;
    remainingEl.textContent = "Remaining guesses: " + remainingGuesses;

    // Check if the player won or lost
    if (word === wordToShow) {
      score += remainingGuesses * 10;
      scoreEl.innerHTML =
        'You won! The word was: <b>"' + word + '"</b>. Your score is: ' + score;
      playAgainBtn.style.display = "block";
      hintBtn.style.display = "none";
      keyboard.style.display = "none";
    } else if (remainingGuesses === 0) {
      scoreEl.innerHTML =
        'You lost! The word was: <b>"' +
        word +
        '"</b>. Your score is: ' +
        score;
      playAgainBtn.style.display = "block";
      hintBtn.style.display = "none";
      keyboard.style.display = "none";
    }
  }
});
