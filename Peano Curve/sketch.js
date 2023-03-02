let peanoCurve = "F".split("");
const initialSegmentLength = 750;
let segmentLength = initialSegmentLength;
let minimalSegmentLength = 10;
let theta = 90;

function setup() {
  createCanvas(650, 650, P2D);
  background(0);
  stroke(0, 255, 0);
  strokeWeight(1);
  angleMode(DEGREES);
}

let createCurve = setInterval(() => {

  if (segmentLength > minimalSegmentLength) {
    background(0);
    drawPeanoCurve(segmentLength);
    calculatePeanoCurve();
  }
  else {
    segmentLength = initialSegmentLength;
    peanoCurve = "F".split("");
  }
}, 2000);

function calculatePeanoCurve() {

  let peanoCurveTemp = [];

  peanoCurve.forEach(function (element) {

    if (element === "F") {
      let tempRuleArray = "F+F-F-F-F+F+F+F-F".split("");
      tempRuleArray.forEach(function (element1) {
        peanoCurveTemp.push(element1);
      });

    }
    else if (element === "+") peanoCurveTemp.push(element);
    else if (element === "-") peanoCurveTemp.push(element);

    peanoCurve = peanoCurveTemp.slice(0);
  });
}

function drawPeanoCurve(length) {

  translate(50, 50);
  rotate(45);

  if (length > minimalSegmentLength) {

    push();
    for (let i = 0; i < peanoCurve.length; i++) {
      const element = peanoCurve[i];

      if (element === "F") {
        line(0, 0, length, 0);
        translate(length, 0);
      }
      else if (element === "+") {
        rotate(theta);
      }
      else if (element === "-") {
        rotate(-theta);
      }
    }
    pop();
    segmentLength *= 0.335;
  }
}

function draw() {
}
