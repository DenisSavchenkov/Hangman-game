// Переключатель на ночной режим
export const darkModeHandler = () => {
  const darkModeSwitcher = document.querySelector(
    '.switch-input'
  ) as HTMLInputElement;
  const bodyElement = document.body as HTMLBodyElement;

  if (localStorage.getItem('mode') === 'dark') {
    bodyElement.classList.add('dark-mode');
    darkModeSwitcher.checked = true;
  }

  darkModeSwitcher.addEventListener('click', () => {
    bodyElement.classList.toggle('dark-mode');

    if (bodyElement.classList.contains('dark-mode')) {
      localStorage.setItem('mode', 'dark');
    } else {
      localStorage.setItem('mode', 'light');
    }
  });
};
