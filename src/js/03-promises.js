const form = document.querySelector('.form');
const button = document.querySelector('button');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const firstDelay = parseInt(form.elements.delay.value);
  const stepDelay = parseInt(form.elements.step.value);
  const amount = parseInt(form.elements.amount.value);

  function createPromise(position, delay) {
    const shouldResolve = Math.random() > 0.3;

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldResolve) {
          resolve({ position, delay });
        } else {
          reject({ position, delay });
        }
      }, delay);
    });
  }

  for (let i = 0; i < amount; i++) {
    const position = i + 1;
    const currentDelay = firstDelay + i * stepDelay;

    createPromise(position, currentDelay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        const successMessage = `✅ Fulfilled promise ${position} in ${delay}ms`;
        const div = document.createElement('div');
        div.textContent = successMessage;
        div.style.color = 'green';
        form.appendChild(div);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        const errorMessage = `❌ Rejected promise ${position} in ${delay}ms`;
        const div = document.createElement('div');
        div.textContent = errorMessage;
        div.style.color = 'red';
        form.appendChild(div);
      });
  }
});
