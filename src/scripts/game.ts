import { WORDS, KEYBOARD_LETTERS } from './constants';

const gameDiv = document.querySelector('.game') as HTMLDivElement;
const logo = document.querySelector('.logo') as HTMLHeadElement;

// Добавление картинок
const createGameImage = () => {
  const image = document.createElement('img');
  image.src = 'images/hg-10.png';
  image.alt = 'Изображние игры';
  image.classList.add('game-img');
  return image;
};

// Создание пустых мест под буквы - placeholdres
const createPlaceholdersHTML = (): string => {
  // Берем сохраненное слово из хранилища
  const word: string = JSON.stringify(sessionStorage.getItem('word'));

  const placeholderHTML = Array.from(word).reduce(
    (acc: string, _, index: number) => {
      return acc + `<h2 id="${index}" class="letter-placeholder">_</h2>`;
    },
    ''
  );
  return `<div class="placeholders-wrapper">${placeholderHTML}</div>`;
};

// Создание счетчика того сколько осталось попыток
const createTriesHTML = () => {
  return `<p class="tries">Осталось попыток: <span class="tries-left">${10}</span></p>`;
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

// Старт игры
export const startGame = (): void => {
  // Генерируем рандомное слово из нашего массива
  const randomIndex: number = Math.floor(Math.random() * WORDS.length);
  const wordToGuess: string = WORDS[randomIndex];

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
    console.log(event.target);
  });
};
