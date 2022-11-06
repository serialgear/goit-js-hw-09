import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  inputTextEl: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.btnStart.addEventListener('click', onClickBtnStart);
refs.btnStart.disabled = true;

// let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (selectedDates[0] <= options.defaultDate) {
      Notify.failure('Please choose a date in the future');
      refs.btnStart.disabled = true;
    }
    if (selectedDates[0] >= options.defaultDate) {
      {
        refs.btnStart.disabled = false;
      }
    }
  },
};

const calendar = flatpickr(refs.inputTextEl, options);

function onClickBtnStart() {
  // console.log('onClickBtnStart');
  intervalId = setInterval(() => {
    updateTime();
  }, 1000);

  refs.inputTextEl.disabled = true;
  refs.btnStart.disabled = true;
}

function updateTime() {
  const currentTime = new Date();
  const selectedTime = new Date(refs.inputTextEl.value);

  const waitTime = selectedTime - currentTime;

  if (waitTime <= 0) {
    // console.log(waitTime);
    clearInterval(intervalId);
    Notify.success(`To select a new date, please reload the page.`);
    return;
  } else {
    const { days, hours, minutes, seconds } = convertMs(waitTime);
    // refs.days.textContent = `${days}`
    // refs.hours.textContent = `${hours}`
    // refs.minutes.textContent = `${minutes}`
    // refs.seconds.textContent = `${seconds}`
    updateTimeOnScreen(days, hours, minutes, seconds);
  }
}
function updateTimeOnScreen(days, hours, minutes, seconds) {
  refs.days.textContent = `${addLeadingZero(days)}`;
  refs.hours.textContent = `${addLeadingZero(hours)}`;
  refs.minutes.textContent = `${addLeadingZero(minutes)}`;
  refs.seconds.textContent = `${addLeadingZero(seconds)}`;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
