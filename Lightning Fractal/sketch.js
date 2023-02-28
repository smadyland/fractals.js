let roughness, slider;

function setup() {
  createCanvas(600, 600);
  strokeWeight(2);
  noFill();

  // Create slider to adjust number of lightning bolts
  slider = createSlider(1, 10, 5);
  slider.position(10, 10);
}

function draw() {
  background(0);
  stroke(255);

  // Get number of lightning bolts from slider
  const numBolts = slider.value();

  // Generate the specified number of lightning bolts
  for (let i = 0; i < numBolts; i++) {
    const startX = random(width);
    const startY = 0;
    const endX = startX + random(-50, 50);
    const endY = height;
    roughness = random(0.2, 0.8);

    lightning(startX, startY, endX, endY, roughness);
  }
}

function lightning(x1, y1, x2, y2, roughness) {
  if (dist(x1, y1, x2, y2) < 5) {
    line(x1, y1, x2, y2);
  } else {
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    const displacement = (random() - 0.5) * roughness * (y2 - y1);

    const newMidX = midX + displacement;
    lightning(x1, y1, newMidX, midY, roughness);
    lightning(newMidX, midY, x2, y2, roughness);
  }
}
