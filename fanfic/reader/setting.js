const menu = document.getElementById('myMenu');
const slider = document.getElementById('textSize');

function openSetting() {
  menu.hidden = !menu.hidden;
}

slider.addEventListener('input', (event) => {
  const newSize = event.target.value + 'px';
  
  document.documentElement.style.setProperty('--font-size-base', newSize);
});