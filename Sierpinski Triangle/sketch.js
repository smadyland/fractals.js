var len = 500;

function setup() {
  createCanvas(540, 540);
  noStroke();
  fill(50);
}

function draw() {
  background(255);
  divide(width / 2 - len / 2, height / 2 + len * sqrt(3) / 4, len, 1, floor(map(mouseX, 0, width, 1, 10)));
}

function divide(x, y, l, lvl, max) {
  if (lvl == max) {
    tri(x, y, l);
  } else {
    divide(x, y, l / 2, lvl + 1, max);
    divide(x + l / 2, y, l / 2, lvl + 1, max);
    divide(x + l / 4, y - l * sqrt(3) / 4, l / 2, lvl + 1, max);
  }
}

function tri(x, y, l) {
  triangle(x, y, x + l / 2, y - l * sqrt(3) / 2, x + l, y);
}
