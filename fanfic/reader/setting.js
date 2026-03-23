const menu = document.getElementById('myMenu');
const textSizeValue = document.getElementById('text-size-value');
const slider = document.getElementById('textSize');

document.documentElement.style.setProperty('--font-size-base', slider.value + 'px');

function openSetting() {
  menu.hidden = !menu.hidden;
}

slider.addEventListener('input', (event) => {
  const newSize = event.target.value + 'px';

  textSizeValue.textContent = newSize;
  
  document.documentElement.style.setProperty('--font-size-base', newSize);
});