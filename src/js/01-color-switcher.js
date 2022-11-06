const refs = {
  startRandomBodyBackgroundColor: document.querySelector('button[data-start]'),
  stopRandomBodyBackgroundColor: document.querySelector('button[data-stop]'),
};

refs.startRandomBodyBackgroundColor.addEventListener('click', getStart);
refs.stopRandomBodyBackgroundColor.addEventListener('click', getStop);

function getStart() {
  refs.startRandomBodyBackgroundColor.setAttribute('disabled', 'true');
  refs.stopRandomBodyBackgroundColor.removeAttribute('disabled');
  timerId = setInterval(() => {
    document.body.style.background = getRandomHexColor();
  }, 1000);
  console.log('Меняем цвет раз в 1 секунду');
}

function getStop() {
  refs.stopRandomBodyBackgroundColor.setAttribute('disabled', 'true');
  refs.startRandomBodyBackgroundColor.removeAttribute('disabled');
  clearInterval(timerId);
  console.log('Остановка изменения цвета');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
