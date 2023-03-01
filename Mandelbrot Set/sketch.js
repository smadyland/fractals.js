function setup() {
  createCanvas(710, 400);
  pixelDensity(1);
  noLoop();
}

function draw() {
  background(0);

  const w = 4;
  const h = (w * height) / width;
  const xmin = -w/2;
  const ymin = -h/2;

  loadPixels();

  const maxiterations = 100;
  const xmax = xmin + w;
  const ymax = ymin + h;
  const dx = (xmax - xmin) / (width);
  const dy = (ymax - ymin) / (height);

  let y = ymin;
  for (let j = 0; j < height; j++) {
    let x = xmin;
    for (let i = 0; i < width; i++) {
      let a = x;
      let b = y;
      let n = 0;
      while (n < maxiterations) {
        const aa = a * a;
        const bb = b * b;
        const twoab = 2.0 * a * b;
        a = aa - bb + x;
        b = twoab + y;
        if (dist(aa, bb, 0, 0) > 16) {
          break;  // Bail
        }
        n++;
      }
      const pix = (i+j*width)*4;
      const norm = map(n, 0, maxiterations, 0, 1);
      let bright = map(sqrt(norm), 0, 1, 0, 255);
      if (n == maxiterations) {
        bright = 0;
      } else {
        pixels[pix + 0] = bright;
        pixels[pix + 1] = bright;
        pixels[pix + 2] = bright;
        pixels[pix + 3] = 255;
      }
      x += dx;
    }
    y += dy;
  }
  updatePixels();
}
