function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);
  drawCurve(50, 50, 300, 4);
}

function drawCurve(x, y, length, level) {
  const h = length/(8*(2**(level-1)-1)+6);
  let cx = x+h;
  let cy = y;

  DEA(level);
  line_d();
  CHD(level);
  line_c();
  BGC(level);
  line_b();
  AFB(level);
  line_a();

  function lineTo(newX, newY) {
    line(cx, cy, newX, newY);
    cx = newX;
    cy = newY;
  }

  function line_a() {
    lineTo(cx+h, cy-h);
  }
  function line_b() { 
    lineTo(cx-h, cy-h);
  }
  function line_c() {
    lineTo(cx-h, cy+h);
  }
  function line_d() {
    lineTo(cx+h, cy+h);
  }
  function line_e() {
    lineTo(cx+2*h, cy);
  }
  function line_f() {
    lineTo(cx, cy-2*h);
  }
  function line_g() {
    lineTo(cx-2*h, cy);
  }
  function line_h() {
    lineTo(cx, cy+2*h);
  }

  function DEA(n){
   if (n == 0) {

   } else {
    DEA(n-1);
    line_d();
    CHD(n-1);
    line_e();
    AFB(n-1);
    line_a();
    DEA(n-1);
   }
  }
  function CHD(n){
    if (n == 0) {

    } else {
      CHD(n-1);
      line_c();
      BGC(n-1);
      line_h();
      DEA(n-1);
      line_d();
      CHD(n-1);
    }
  }
  function BGC(n){
    if (n == 0) {

    } else {
      BGC(n-1);
      line_b();
      AFB(n-1);
      line_g();
      CHD(n-1);
      line_c();
      BGC(n-1);
    }
  }
  function AFB(n){
    if (n == 0) {

    } else {
      AFB(n-1);
      line_a();
      DEA(n-1);
      line_f();
      BGC(n-1);
      line_b();
      AFB(n-1);
    }
  }
}
