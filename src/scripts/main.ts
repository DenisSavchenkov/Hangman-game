import '../scss/style.scss';
import { darkModeHandler } from './darkModeHandler';
import { startGame } from './game';

const startButton = document.querySelector('.button') as HTMLButtonElement;

// Ночной режим
darkModeHandler();

// Старт игры
startButton.addEventListener('click', () => {
  startGame();
});
