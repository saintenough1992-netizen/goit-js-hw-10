import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

iziToast.settings({
  timeout: 10000,
  resetOnHover: true,
  icon: 'material-icons',
  transitionIn: 'flipInX',
  transitionOut: 'flipOutX',
});
const form = document.querySelector('.form');

const refs = {};

form.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  refs.delay = Number(formData.get('delay'));
  refs.state = formData.get('state');
  console.log(refs);
  simulatePromise(refs.delay, refs.state);
  form.reset();
});

function simulatePromise(time, state) {
  const promise = new Promise((res, rej) => {
    setTimeout(() => {
      if (state == 'fulfilled') {
        res(time);
      } else {
        rej(time);
      }
    }, time);
  });
  promise
    .then(time => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${time}ms`,
        position: 'topRight',
      });
    })
    .catch(time => {
      iziToast.error({
        message: `❌ Rejected promise in ${time}ms`,
        position: 'topRight',
      });
    });
}
