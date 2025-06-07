const canvas = document.getElementById('hologram');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('startBtn');

let rotationX = 0;
let rotationY = 0;

function handleOrientation(event) {
  console.log("Orientation event:", event);
  rotationX = event.beta || 0;
  rotationY = event.gamma || 0;
}

function draw() {
  // Kolor dynamiczny RGB na podstawie ruchu
  const r = Math.min(255, Math.abs(rotationX) * 5);
  const g = Math.min(255, Math.abs(rotationY) * 5);
  const b = 255 - Math.min(255, Math.abs(rotationX + rotationY) * 2);

  // Ustaw tło canvas
  ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  requestAnimationFrame(draw);
}

startBtn.addEventListener('click', async () => {
  console.log("Start clicked");

  if (typeof DeviceOrientationEvent !== 'undefined' &&
      typeof DeviceOrientationEvent.requestPermission === 'function') {
    try {
      const response = await DeviceOrientationEvent.requestPermission();
      console.log("Permission:", response);
      if (response === 'granted') {
        window.addEventListener('deviceorientation', handleOrientation);
        draw();
        startBtn.style.display = 'none';
      } else {
        alert('Brak zgody na żyroskop');
      }
    } catch (err) {
      console.error("Błąd zgody:", err);
    }
  } else {
    console.log("No permission needed");
    window.addEventListener('deviceorientation', handleOrientation);
    draw();
    startBtn.style.display = 'none';
  }
});