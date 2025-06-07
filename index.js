const canvas = document.getElementById('hologram');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('startBtn');

let rotationX = 0;
let rotationY = 0;

function handleOrientation(event) {
  rotationX = event.beta || 0;
  rotationY = event.gamma || 0;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const x = 200 + rotationY * 2;
  const y = 200 + rotationX * 2;

  // Dynamiczny kolor RGB
  const r = Math.min(255, Math.abs(rotationX) * 5);
  const g = Math.min(255, Math.abs(rotationY) * 5);
  const b = 255 - Math.min(255, Math.abs(rotationX + rotationY) * 2);

  ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
  ctx.beginPath();
  ctx.arc(x, y, 50, 0, Math.PI * 2);
  ctx.fill();

  requestAnimationFrame(draw);
}

startBtn.addEventListener('click', () => {
  if (typeof DeviceOrientationEvent !== 'undefined' &&
      typeof DeviceOrientationEvent.requestPermission === 'function') {
    // iOS
    DeviceOrientationEvent.requestPermission()
      .then(permissionState => {
        if (permissionState === 'granted') {
          window.addEventListener('deviceorientation', handleOrientation);
          draw();
          startBtn.style.display = 'none';
        } else {
          alert('Brak dostępu do czujników.');
        }
      })
      .catch(console.error);
  } else {
    // Android / inne przeglądarki
    window.addEventListener('deviceorientation', handleOrientation);
    draw();
    startBtn.style.display = 'none';
  }
});