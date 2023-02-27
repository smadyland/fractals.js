let minSlider, maxSlider;
let minVal = -2.5;
let maxVal = 1;
let maxIterations = 100;

function setup() {
  createCanvas(600, 600);
  pixelDensity(1);
  colorMode(HSB, 255);
  minSlider = createSlider(-3, 0, -2.5, 0.01);
  maxSlider = createSlider(0, 3, 1, 0.01);
  canvas.addEventListener("wheel", handleScroll);
}

function draw() {
  minVal = minSlider.value();
  maxVal = maxSlider.value();
  loadPixels();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let a = map(x, 0, width, minVal, maxVal);
      let b = map(y, 0, height, minVal, maxVal);
      let ca = map(mouseX, 0, width, -1, 1);
      let cb = map(mouseY, 0, height, -1, 1);
      let n = 0;
      while (n < maxIterations) {
        let aa = a * a - b * b;
        let bb = 2 * a * b;
        a = aa + ca;
        b = bb + cb;
        if (abs(a + b) > 16) {
          break;
        }
        n++;
      }
      let bright = map(n, 0, maxIterations, 0, 255);
      if (n === maxIterations) {
        bright = 0;
      }
      let hue = map(bright, 0, 255, 0, 255);
      let saturation = map(bright, 0, 255, 0, 255);
      let index = (x + y * width) * 4;
      pixels[index + 0] = hue;
      pixels[index + 1] = saturation;
      pixels[index + 2] = bright;
      pixels[index + 3] = 255;
    }
  }
  updatePixels();
}

function handleScroll(event) {
  let scrollAmount = event.deltaY;
  let zoomFactor = 0.05;
  if (scrollAmount > 0) {
    // zoom out
    minSlider.value(minSlider.value() - zoomFactor);
    maxSlider.value(maxSlider.value() + zoomFactor);
  } else {
    // zoom in
    minSlider.value(minSlider.value() + zoomFactor);
    maxSlider.value(maxSlider.value() - zoomFactor);
  }
}
