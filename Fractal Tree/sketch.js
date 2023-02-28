var angle;
var slider;
var sliderMoving;
var mousePressedAndMoving;
var growTree;

function setup() { 
  createCanvas(windowWidth, windowHeight);
  slider = createSlider(0, 2 * PI, PI / 4, 0.01, false); // set visible to false
  slider.position(10, height);
  slider.class('hidden'); // add a class to the slider element
  sliderMoving = false;
  mousePressedAndMoving = false;
  growTree = false;
  canvas = document.getElementsByTagName('canvas')[0];
  canvas.addEventListener('mousedown', mousePressed);
  canvas.addEventListener('mouseup', mouseReleased);
  canvas.addEventListener('mousemove', mouseMoved);
} 

function draw() { 
  background(0); // set background color to black
  angle = slider.value();
  
  // update slider value based on mouse movement
  if (mousePressedAndMoving) {
    sliderMoving = true;
    growTree = true;
  } else {
    sliderMoving = false;
    if (!growTree) {
      return;
    }
  }
  
  translate(width/2, height);
  stroke(255); // set tree color to white
  branch(100);
}

function branch(len) {
  if (!growTree) {
    return;
  }
  line(0, 0, 0, -len);
  translate(0, -len);
  if (len > 10 && sliderMoving) { // stop growing if slider is not moving
    push();
    rotate(angle);
    branch(len * 0.75);
    pop();
    push();
    rotate(-angle);
    branch(len * 0.75);
    pop();  
  }
}

function mousePressed() {
  if (isMouseOverCanvas()) {
    mousePressedAndMoving = true;
  }
}

function mouseReleased() {
  if (isMouseOverCanvas()) {
    mousePressedAndMoving = false;
    growTree = false;
  }
}

function mouseMoved(event) {
  if (isMouseOverCanvas() && mousePressedAndMoving) {
    var sliderValue = map(event.offsetY, 0, height, 2 * PI, 0);
    slider.value(sliderValue);
  }
}

function isMouseOverCanvas() {
  var rect = canvas.getBoundingClientRect();
  return (mouseX > rect.left && mouseX < rect.right &&
          mouseY > rect.top && mouseY < rect.bottom);
}