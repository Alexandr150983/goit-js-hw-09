import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      const selectedDate = selectedDates[0];

    if (selectedDate.getTime() <= Date.now()) {
      Notify.failure('Please choose a date in the future');
      document.querySelector('[data-start]').disabled = true;
    } else {
      document.querySelector('[data-start]').disabled = false;
    }
  },
};

const flatpickrInstance = flatpickr('#datetime-picker', options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
};

document.querySelector('[data-start]').addEventListener('click', () => {
    const selectedDate = flatpickrInstance.selectedDates[0];
    const timerEl = {
      days: document.querySelector('[data-days]'),
      hours: document.querySelector('[data-hours]'),
      minutes: document.querySelector('[data-minutes]'),
      seconds: document.querySelector('[data-seconds]'),
    };

    function updateTimer() {
        const diffTime = selectedDate.getTime() - Date.now();

        if (diffTime <= 0) {
            clearInterval(interval);
            timerEl.days.textContent = addLeadingZero(0);
            timerEl.hours.textContent = addLeadingZero(0);
            timerEl.minutes.textContent = addLeadingZero(0);
            timerEl.seconds.textContent = addLeadingZero(0);
            return;
        }

        const { days, hours, minutes, seconds } = convertMs(diffTime);

        timerEl.days.textContent = addLeadingZero(days);
        timerEl.hours.textContent = addLeadingZero(hours);
        timerEl.minutes.textContent = addLeadingZero(minutes);
        timerEl.seconds.textContent = addLeadingZero(seconds);
    }
    const interval = setInterval(updateTimer, 1000);
});




