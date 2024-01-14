"use strict";

const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const dice = document.querySelector(".dice");
const currentScr0El = document.getElementById("current--0");
const currentScr1El = document.getElementById("current--1");
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");

const btnRoll = document.querySelector(".btn--roll");
const btnNew = document.querySelector(".btn--new");
const btnHold = document.querySelector(".btn--hold");

let currentScore, playing, scores, activePlayer;

const newGame = () => {
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScr0El.textContent = 0;
  currentScr1El.textContent = 0;
  activePlayer = 0;
  playing = true;
  currentScore = 0;
  scores = [0, 0];
  dice.classList.add("hidden");
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
};
newGame();

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};

btnRoll.addEventListener("click", () => {
  if (playing) {
    const diceNo = Math.trunc(Math.random() * 6) + 1;
    dice.classList.remove("hidden");
    dice.src = `dice-${diceNo}.png`;

    if (diceNo !== 1) {
      currentScore += diceNo;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", () => {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 25) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      dice.classList.add("hidden");
      playing = false;

      show();
    } else switchPlayer();
  }
});

btnNew.addEventListener("click", newGame);

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const winner = document.getElementById("winner-name");
const btnNewW = document.getElementById("btn-restart");

const show = () => {
  winner.textContent = activePlayer === 0 ? "Player 1" : "Player 2";

  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const hide = () => {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnCloseModal.addEventListener("click", hide);
overlay.addEventListener('click', hide);
btnNewW.addEventListener("click", () => {
  hide();
  newGame();
});
