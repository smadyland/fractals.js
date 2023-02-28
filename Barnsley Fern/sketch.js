let x, y;

function setup() {
  createCanvas(600, 600);
  background(0);
  x = 0;
  y = 0;
}

function draw() {
  let r = random(1);
  if (r < 0.01) {
    x = 0;
    y = 0.16 * y;
  } else if (r < 0.86) {
    x = 0.85 * x + 0.04 * y;
    y = -0.04 * x + 0.85 * y + 1.6;
  } else if (r < 0.93) {
    x = 0.2 * x - 0.26 * y;
    y = 0.23 * x + 0.22 * y + 1.6;
  } else {
    x = -0.15 * x + 0.28 * y;
    y = 0.26 * x + 0.24 * y + 0.44;
  }
  
  let px = map(x, -2.182, 2.6558, 0, width);
  let py = map(y, 0, 9.9983, height, 0);
  
  // Draw the point(s) and color them green
  stroke(0, 255, 0);
  strokeWeight(1);
  point(px, py);
}
