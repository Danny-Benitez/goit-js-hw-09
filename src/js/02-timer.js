import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const currentDate = new Date();

    if (selectedDates < currentDate) {
      alert('Please choose a date in the future');
      document.querySelector('[type=text]').disabled = true;
    } else {
      document.querySelector('[type=text]').disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

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
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

document.querySelector('[data-start]').addEventListener('click', () => {
  const endDate = new Date(
    document.getElementById('datetime-picker').value
  ).getTime();
  const newInterval = setInterval(updateTime, 1000);

  function updateTime() {
    const currentDate = new Date().getTime();
    const remainingTime = endDate - currentDate;

    if (remainingTime <= 0) {
      clearInterval(newInterval);
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(remainingTime);

    document.querySelector('[data-days]').textContent = addLeadingZero(days);
    document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
    document.querySelector('[data-minutes]').textContent =
      addLeadingZero(minutes);
    document.querySelector('[data-seconds]').textContent =
      addLeadingZero(seconds);
  }
});
