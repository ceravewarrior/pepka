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

  ctx.fillStyle = 'cyan';
  ctx.beginPath();
  ctx.arc(x, y, 50, 0, Math.PI * 2);
  ctx.fill();

  requestAnimationFrame(draw);
}

draw();