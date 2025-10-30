document.querySelector('#setting-btn').addEventListener('click', () => {
  document.querySelector('#animation').classList.toggle('open');
});

const btn = document.getElementById('setting-btn');
btn.addEventListener('click', () => {
  btn.classList.toggle('active');
});
