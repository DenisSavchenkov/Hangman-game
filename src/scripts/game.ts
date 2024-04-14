import { WORDS, KEYBOARD_LETTERS } from './constants';

const gameDiv = document.querySelector('.game') as HTMLDivElement;
const logo = document.querySelector('.logo') as HTMLHeadElement;

let triesLeft: number;
let triesCounet: number;

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
  const lowerCaseWord = word.toLowerCase();
  const inputLetter = letter.toLowerCase();

  // Если буквы в слове нету
  if (!lowerCaseWord.includes(inputLetter)) {
    triesLeft -= 1;

    const triesCounter = document.querySelector(
      '.tries-left'
    ) as HTMLSpanElement;
    triesCounter.innerText = triesLeft.toString();

    const image = document.querySelector('.game-img') as HTMLImageElement;
    image.src = `images/hg-${10 - triesLeft}.png`;

    if (triesLeft === 0) {
      stopGame('lose');
      const quitButton = document.querySelector(
        '.quit-game'
      ) as HTMLButtonElement;
      quitButton.remove();
    }
  } else {
    // Если буква в слове есть
    Array.from(lowerCaseWord).forEach(
      (currentLetter: string, index: number) => {
        if (currentLetter === inputLetter) {
          triesCounet += 1;

          if (triesCounet === word.length) {
            stopGame('win');
            const quitButton = document.querySelector(
              '.quit-game'
            ) as HTMLButtonElement;
            quitButton.remove();
            return;
          }

          const placeholderLetter = document.getElementById(
            `letter_${index}`
          ) as HTMLHeadElement;
          placeholderLetter.innerText = inputLetter.toUpperCase();
        }
      }
    );
  }
};

// Старт игры
export const startGame = () => {
  triesLeft = 10;
  triesCounet = 0;

  // Генерируем рандомное слово из нашего массива
  const randomIndex = Math.floor(Math.random() * WORDS.length);
  const wordToGuess = WORDS[randomIndex];

  // Сохраняем рандомное слово в хранилище сеансов
  sessionStorage.setItem('word', wordToGuess);

  // Делам лого меньше, чтобы не отвлекало от игры
  logo.classList.add('logo-mini');

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

  // Добавляем кнопу "Завершить игру"
  gameDiv.insertAdjacentHTML(
    'afterbegin',
    '<button class="quit-game button">Завершить игру</button>'
  );

  // Событие при клике на кнопку "Завершить игру"
  const quitButton = document.querySelector('.quit-game') as HTMLButtonElement;
  quitButton.onclick = () => {
    const exitQuestion = confirm('Вы действительно хотите завершить игру?');

    if (exitQuestion) {
      logo.classList.remove('logo-mini');
      gameDiv.innerHTML =
        ' <button class="start-button button">Начать игру</button>';
      const startButton = document.querySelector(
        '.start-button'
      ) as HTMLButtonElement;
      startButton.addEventListener('click', startGame);
    }
  };

  // Событие когда кликаем на буквы
  keyboard.addEventListener('click', (event: MouseEvent) => {
    const element = event.target as HTMLInputElement;

    if (element.tagName === 'BUTTON') {
      checkLetter(element.id);
      element.disabled = true;
    }
  });
};
// Конец игры
const stopGame = (status: string) => {
  document.querySelector('.placeholders-wrapper')?.remove();
  document.querySelector('.tries')?.remove();
  document.querySelector('.keyboard')?.remove();

  const word = sessionStorage.getItem('word');

  // Собитие если пользователь выйграл
  if (status === 'win') {
    const image = document.querySelector('.game-img') as HTMLImageElement;
    image.src = `images/hg-win.png`;
    gameDiv.innerHTML += '<h3 class="result-header win">Вы выйграли!</h3>';
  }
  // Собитие если пользователь проиграл
  if (status === 'lose') {
    gameDiv.innerHTML += '<h3 class="result-header lose">Вы проиграли :(</h3>';
  }

  gameDiv.innerHTML += `<p class="result-word">Слово было: <span>${word}</span></p>`;
  gameDiv.innerHTML +=
    '<button class="play-again button">Начать заново</button>';

  // Событие при нажатии кнопки "Начать заново"
  const playAgain = document.querySelector('.play-again') as HTMLButtonElement;
  playAgain.onclick = startGame;
};
