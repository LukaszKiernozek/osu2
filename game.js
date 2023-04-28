// Get the canvas element and set its size
const canvas = document.getElementById('game-canvas');
canvas.width = 640;
canvas.height = 480;

// Get the canvas context and set the fill color to red
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'red';

// Set the game parameters
const circleRadius = 25;
const circleSpawnInterval = 1000;
const circleDisappearTime = 1000;
const losePointDelay = 1000;

// Initialize the game state
let score = 0;
let circles = [];

// Start the game loop
setInterval(gameLoop, 1000 / 60);

// Spawn a circle every circleSpawnInterval milliseconds
setInterval(() => {
  const circle = {
    x: Math.random() * (canvas.width - circleRadius * 2) + circleRadius,
    y: Math.random() * (canvas.height - circleRadius * 2) + circleRadius,
    spawnTime: Date.now(),
  };
  circles.push(circle);
}, circleSpawnInterval);

// Handle key presses
canvas.addEventListener('click', (event) => {
  const mouseX = event.offsetX;
  const mouseY = event.offsetY;
  circles.forEach((circle, index) => {
    const dx = circle.x - mouseX;
    const dy = circle.y - mouseY;
    const distance = Math.sqrt(dx*dx + dy*dy);
    if (distance < circleRadius) {
      score++;
      circles.splice(index, 1);
    }
  });
});

// The game loop function
function gameLoop() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the circles
  circles.forEach((circle) => {
    // Check if the circle has been on screen for longer than circleDisappearTime
    if (Date.now() - circle.spawnTime > circleDisappearTime) {
      // If the circle has been on screen for longer than circleDisappearTime,
      // remove it from the circles array and decrement the score after a delay
      setTimeout(() => {
        const index = circles.indexOf(circle);
        if (index >= 0) {
          circles.splice(index, 1);
          score--;
        }
      }, losePointDelay);
    } else {
      // If the circle is still visible, draw it on the canvas
      ctx.beginPath();
      ctx.arc(circle.x, circle.y, circleRadius, 0, 2 * Math.PI);
      ctx.fill();
    }
  });

  // Draw the score
  ctx.fillStyle = 'black';
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, 10, 25);
}