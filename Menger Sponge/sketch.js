let sponge;

function setup() {
  createCanvas(400, 400, WEBGL);
  noStroke();
  sponge = new MengerSponge(0, 0, 0, 200);
}

function draw() {
  background(220);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  ambientLight(150);
  directionalLight(255, 255, 255, 0, 1, -1);
  specularMaterial(250);
  sponge.show();
}

class MengerSponge {
  constructor(x, y, z, size) {
    this.pos = createVector(x, y, z);
    this.size = size;
    this.subSponges = [];
    if (this.size > 20) {
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          for (let z = -1; z <= 1; z++) {
            if (abs(x) + abs(y) + abs(z) > 1) {
              let subSponge = new MengerSponge(
                this.pos.x + x * this.size / 3,
                this.pos.y + y * this.size / 3,
                this.pos.z + z * this.size / 3,
                this.size / 3
              );
              this.subSponges.push(subSponge);
            }
          }
        }
      }
    }
  }
  show() {
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    box(this.size);
    for (let i = 0; i < this.subSponges.length; i++) {
      this.subSponges[i].show();
    }
    pop();
  }
}
