function dragonSequence(n) {
  var seq = [1];
  for (let i = 0, a = 0; i < n; i++, a = a ? 0 : 1) {
    seq = seq.concat(a, seq.reverse().map(s => s ? 0 : 1).reverse());
  }
  return seq;
}

function setup() {
  createCanvas(512, 512);
  noLoop();
  doLoop=false;
  colorMode(HSB);
  background(220,0,0);
}

function generate(){
  iterations = select("#iterNumber").value();
  dragon = dragonSequence(iterations);
  l = dragon.length;
  x = width / 2;
  y = width / 2;
  d = 0; // direction
  s = 1/select("#scaleNumber").value(); // scale
  index = 1;
  doLoop=true;
  loop();
  background(220,0,0);
}

function draw() {
  if(!doLoop) return;
  
  for (let k = 0; k < constrain(l/60,0,1000); k++) {
    d += dragon[index] * 2 - 1;
    var nx = x + cos(TAU / 4 * d) * s;
    var ny = y + sin(TAU / 4 * d) * s;

    stroke(360/l*index,127,127);
    line(x, y, nx, ny);
    x = nx;
    y = ny;

    index++;
    if (index > dragon.length) noLoop();
  }
}
