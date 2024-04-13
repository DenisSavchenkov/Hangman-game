import { WORDS, KEYBOARD_LETTERS } from './constants';

const gameDiv = document.querySelector('.game') as HTMLDivElement;
const logo = document.querySelector('.logo') as HTMLHeadElement;
let triesLeft: number = 10;

// Добавление картинок
const createGameImage = () => {
  const image = document.createElement('img');
  image.src = 'images/hg-0.png';
  image.alt = 'Изображние игры';
  image.classList.add('game-img');
  return image;
};

// Создание пустых мест под буквы - placeholdres
const createPlaceholdersHTML = () => {
  const word = sessionStorage.getItem('word') as string;
  const placeholderHTML = Array.from(word).reduce(
    (acc: string, _, index: number) => {
      return acc + `<h2 id="letter_${index}" class="letter-placeholder">_</h2>`;
    },
    ''
  );
  return `<div class="placeholders-wrapper">${placeholderHTML}</div>`;
};

// Создание счетчика того сколько осталось попыток
const createTriesHTML = () => {
  return `<p class="tries">Осталось попыток: <span class="tries-left">${triesLeft}</span></p>`;
};

// Создание клавиатуры
const createKeyboard = () => {
  const keyboardDiv = document.createElement('div');
  keyboardDiv.classList.add('keyboard');

  const keyboardHTML = KEYBOARD_LETTERS.reduce(
    (acc: string, letter: string) => {
      return (
        acc +
        `<button id="${letter}" class="keyboard-button">${letter}</button>`
      );
    },
    ''
  );

  keyboardDiv.innerHTML = keyboardHTML;
  return keyboardDiv;
};

// Проверяем буквку на которую нажали
const checkLetter = (letter: string) => {
  const word = sessionStorage.getItem('word') as string;
  const inputLetter = letter.toLowerCase();
  // Если буквы в слове нету
  if (!word.includes(inputLetter)) {
    triesLeft -= 1;
    const triesCounter = document.querySelector(
      '.tries-left'
    ) as HTMLSpanElement;
    triesCounter.innerText = triesLeft.toString();
    const image = document.querySelector('.game-img') as HTMLImageElement;
    image.src = `images/hg-${10 - triesLeft}.png`;
  } else {
    // Если буква в слове есть

    Array.from(word).forEach((currentLetter: string, index: number) => {
      if (currentLetter === inputLetter) {
        const placeholderLetter = document.getElementById(
          `letter_${index}`
        ) as HTMLHeadElement;
        placeholderLetter.innerText = inputLetter.toUpperCase();
      }
    });
  }
};

// Старт игры
export const startGame = () => {
  // Генерируем рандомное слово из нашего массива
  const randomIndex = Math.floor(Math.random() * WORDS.length);
  const wordToGuess = WORDS[randomIndex];

  // Делам лого меньше, чтобы не отвлекало от игры
  logo.classList.add('logo-mini');

  // Сохраняем рандомное слово в хранилище сеансов
  sessionStorage.setItem('word', wordToGuess);

  // Добавляем пустые места под буквы
  gameDiv.innerHTML = createPlaceholdersHTML();

  // Добавляем количество попыток
  gameDiv.innerHTML += createTriesHTML();

  // Добавляем клавиатуру
  const keyboard = createKeyboard();
  gameDiv.appendChild(keyboard);

  // Добавляем изображение
  const image = createGameImage();
  gameDiv.prepend(image);

  // Событе когда кликаем на буквы
  keyboard.addEventListener('click', (event: MouseEvent) => {
    const element = event.target as HTMLInputElement;
    if (element.tagName === 'BUTTON') {
      checkLetter(element.id);
      element.disabled = true;
    }
  });
};
