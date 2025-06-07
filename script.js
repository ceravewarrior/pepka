const canvas = document.getElementById('hologram');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('startBtn');

let rotationX = 0;
let rotationY = 0;

function handleOrientation(event) {
  console.log('rotationX:', event.beta, 'rotationY:', event.gamma);
  rotationX = event.beta || 0;
  rotationY = event.gamma || 0;
}

function draw() {
  const red = Math.min(255, Math.abs(rotationX) * 5);
  const green = 50;
  const blue = 150;

  ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  requestAnimationFrame(draw);
}

startBtn.addEventListener('click', async () => {
  console.log('Start clicked');

  if (typeof DeviceOrientationEvent !== 'undefined' &&
      typeof DeviceOrientationEvent.requestPermission === 'function') {
    try {
      const permission = await DeviceOrientationEvent.requestPermission();
      console.log('Permission:', permission);
      if (permission === 'granted') {
        window.addEventListener('deviceorientation', handleOrientation);
        draw();
        startBtn.style.display = 'none';
      } else {
        alert('Brak zgody na dostęp do czujników');
      }
    } catch (e) {
      console.error('Błąd:', e);
    }
  } else {
    window.addEventListener('deviceorientation', handleOrientation);
    draw();
    startBtn.style.display = 'none';
  }
});