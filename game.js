const images = [
  "img/0.png",
  "img/1.png",
  "img/2.png",
  "img/3.png",
  "img/4.png",
  "img/5.png",
  "img/6.png",
];

let word;

async function getRandomWord() {
  const response = await fetch("https://random-word-api.herokuapp.com/word");
  const data = await response.json();
  return data[0];
}

// at the beginning of the game
async function startGame() {
  word = await getRandomWord();
  word = word.toUpperCase();

  // Initialize variables
  let score = 0;
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

  function showModal(message) {
    var modal = document.getElementById("modal");
    var modalMessage = document.getElementById("modal-message");
    modalMessage.innerHTML = message;
    modal.style.display = "block";
  }

  playAgainBtn.addEventListener("click", async function () {
    // Reset the game
    score = 0;
    correctGuesses = [];
    incorrectGuesses = "";
    remainingGuesses = 6;
    word = await getRandomWord();
    word = word.toUpperCase();
    playAgainBtn.style.display = "none";
    imageEl.src = images[0];
    wordEl.textContent = "";
    incorrectEl.textContent = "Incorrect guesses: ";
    remainingEl.textContent = "Remaining guesses: 6";
    scoreEl.textContent = "Score: " + score;
    hintBtn.style.display = "block";
    keyboard.style.display = "block";
    modal.style.display = "none";
  });

  hintBtn.addEventListener("click", function () {
    let hint = "";
    do {
      hint = word[Math.floor(Math.random() * word.length)];
    } while (correctGuesses.includes(hint) || incorrectGuesses.includes(hint));
    alert("Hint: " + hint);

    score -= 10;
    scoreEl.innerHTML = "Score: " + score;
  });

  keyboard.addEventListener("click", function (e) {
    if (e.target.matches(".key")) {
      let guess = e.target.textContent.toUpperCase();

      // Check if the guess is correct
      if (word.includes(guess)) {
        score += 10;
        // Update the correct guesses array
        for (let i = 0; i < word.length; i++) {
          if (word[i] === guess && !correctGuesses.includes(guess)) {
            correctGuesses.push(guess);
          }
        }
      } else {
        score -= 10;
        // Update the incorrect guesses string
        if (!incorrectGuesses.includes(guess)) {
          incorrectGuesses += guess;
          remainingGuesses--;
        }
      }

      scoreEl.innerHTML = "Score: " + score;

      // Display the image
      imageEl.src = images[6 - remainingGuesses];

      // Display the word with the correct guesses filled in
      let wordToShow = "";
      for (let i = 0; i < word.length; i++) {
        if (correctGuesses.includes(word[i])) {
          wordToShow += word[i];
        } else {
          wordToShow += "_ ";
        }
      }
      wordEl.textContent = wordToShow;
      incorrectEl.textContent = "Incorrect guesses: " + incorrectGuesses;
      remainingEl.textContent = "Remaining chances: " + remainingGuesses;

      // Check if the player won or lost
      if (word === wordToShow) {
        showModal(
          '<h2>You won!</h2> The word was: <b>"' +
            word +
            '"</b>. Your score is: ' +
            score
        );
        scoreEl.innerHTML =
          '<h2>You won!</h2> The word was: <b>"' +
          word +
          '"</b>. Your score is: ' +
          score;
        playAgainBtn.style.display = "block";
        hintBtn.style.display = "none";
        keyboard.style.display = "none";
      } else if (remainingGuesses === 0) {
        showModal(
          '<h2>You lost :(</h2> The word was: "<b>' +
            word +
            '</b>". Your score is: ' +
            score
        );
        scoreEl.innerHTML =
          '<h2>You lost :(</h2> The word was: <b>"' +
          word +
          '"</b>. Your score is: ' +
          score;
        playAgainBtn.style.display = "block";
        hintBtn.style.display = "none";
        keyboard.style.display = "none";
      }
    }
  });
}

const startBtn = document.getElementById("start-button");
const start = document.getElementById("start");
const game = document.getElementById("game");

startBtn.addEventListener("click", function () {
  start.style.display = "none";
  startBtn.style.display = "none";
  game.style.display = "block";
  startGame();
});
