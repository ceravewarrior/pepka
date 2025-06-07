const canvas = document.getElementById('hologram');
const ctx = canvas.getContext('2d');

let rotationX = 0;
let rotationY = 0;

window.addEventListener('deviceorientation', (event) => {
  rotationX = event.beta;   // góra-dół
  rotationY = event.gamma;  // lewo-prawo
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const x = 200 + rotationY * 2;
  const y = 200 + rotationX * 2;

  // Kolor zależny od ruchu – RGB na podstawie pochylenia
  const r = Math.min(255, Math.abs(rotationX) * 5);
  const g = Math.min(255, Math.abs(rotationY) * 5);
  const b = 255 - Math.min(255, (Math.abs(rotationX + rotationY) * 2));

  ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
  ctx.beginPath();
  ctx.arc(x, y, 50, 0, Math.PI * 2);
  ctx.fill();

  requestAnimationFrame(draw);
}

draw();
// iOS wymaga zgody użytkownika
if (typeof DeviceOrientationEvent !== 'undefined' &&
    typeof DeviceOrientationEvent.requestPermission === 'function') {
  DeviceOrientationEvent.requestPermission()
    .then(permissionState => {
      if (permissionState === 'granted') {
        window.addEventListener('deviceorientation', handleOrientation);
      } else {
        alert("Brak dostępu do żyroskopu.");
      }
    })
    .catch(console.error);
} else {
  // Inne przeglądarki
  window.addEventListener('deviceorientation', handleOrientation);
}

let rotationX = 0;
let rotationY = 0;

function handleOrientation(event) {
  rotationX = event.beta;
  rotationY = event.gamma;
}
