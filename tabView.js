document.querySelector('#setting-btn').addEventListener('click', () => {
  document.querySelector('#animation').classList.toggle('open');
});

const btn = document.getElementById('setting-btn');
const btn2 = document.getElementById('made_by');
btn.addEventListener('click', () => {
  btn.classList.toggle('active');
  btn2.classList.toggle('active');
});
