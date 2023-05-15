'use strict';

const btnSubmit = document.querySelector('.submit');
const AttemptsField = document.querySelector('.attempts');
const bestScoreBox = document.querySelector('.bestscoreBox');
const overlay = document.querySelector('.overlay');
const app = document.querySelector('.app');
const closeModalBox = document.querySelector('.close-modal');
const modal = document.querySelector('.modal');
const messageBox = document.querySelector('.display-message');
const randomNumberField = document.querySelector('.random-number');
const wrapper = document.querySelector('.wrapper');

document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    wrapper.classList.add('removeWrapper');
  }
});

let randomNumber = Math.trunc(Math.random() * 20) + 1;
let attempts = 20;
let bestScore = 0;
console.log(randomNumber);

const message = function (message) {
  document.querySelector('.message').textContent = message;
};

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

const submitInput = function () {
  const input = Number(document.querySelector('input').value);

  if (attempts > 1) {
    if (!input) {
      message('Input is undefined !');
    } else if (input == randomNumber) {
      randomNumberField.textContent = randomNumber + '🎉';
      message("Congrats , you've guesssed the number.");

      if (attempts > bestScore) {
        bestScore = attempts;
        bestScoreBox.textContent = bestScore;
        openModal();
      }
    } else if (input !== randomNumber) {
      if (input > 20) {
        message('You should type numbers between 1 and 20');
      } else {
        messageBox.textContent = 'HINT';
        message(input > randomNumber ? 'It is low' : 'It is higher');
        attempts--;
        AttemptsField.textContent = attempts;
      }
    }
  } else {
    message('You have lost');
    AttemptsField.textContent = '0';
  }
};

document.querySelector('.reset').addEventListener('click', () => {
  AttemptsField.textContent = '20';
  randomNumber = Math.trunc(Math.random() * 20) + 1;
  randomNumberField.textContent = '?';
  attempts = 20;
  message('Start guessing ...');
  // input.textContent = ''; // inst working
  console.log(randomNumber);
});

btnSubmit.addEventListener('click', submitInput);
closeModalBox.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') submitInput();
});
