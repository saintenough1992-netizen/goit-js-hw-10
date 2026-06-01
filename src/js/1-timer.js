import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
//getting action items - input and btn
const input = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');
// getting the spans for results
const refs = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
//setting default state for btn, selected Date and interval timer id;
btnStart.disabled = true;
let selectedDate = null;
let timerId = null;
//setting notification settings;
iziToast.settings({
  timeout: 10000,
  resetOnHover: true,
  icon: 'material-icons',
  transitionIn: 'flipInX',
  transitionOut: 'flipOutX',
});

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

//setting behaviour for selection in izitoast

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      btnStart.disabled = true;
      iziToast.warning({
        message: 'Please choose a date in the future',
        position: 'topLeft',
      });
      return;
    }
    btnStart.disabled = false;
  },
};

//render and normalize timer

function updateTimer({ days, hours, minutes, seconds }) {
  refs.days.textContent = padStartZero(days);
  refs.hours.textContent = padStartZero(hours);
  refs.minutes.textContent = padStartZero(minutes);
  refs.seconds.textContent = padStartZero(seconds);
}
function padStartZero(value) {
  return String(value).padStart(2, '0');
}

//timer execution

btnStart.addEventListener('click', () => {
  const countdownInt = setInterval(() => {
    btnStart.disabled = true;
    input.disabled = true;
    timerId = setInterval(() => {
      const currDate = new Date();
      const resDate = selectedDate - currDate;
      if (resDate <= 0) {
        clearInterval(timerId);
        updateTimer(convertMs(0));
        input.disabled = false;
        return;
      }
      updateTimer(convertMs(resDate));
    });
  }, 1000);
});

flatpickr(input, options);
