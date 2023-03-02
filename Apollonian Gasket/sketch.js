var circles;

function setup() {
  var side = windowWidth < windowHeight ? windowWidth:windowHeight;
  createCanvas(side,side); 
  background(0);

  var z1 = new complex(side/2,side/2);
  var z2 = new complex(side/2-100,side/2,200);
  var z3 = new complex(side/2+200,side/2,100);
 
  var r1 = 300;
  var r2 = 200;
  var r3 = 100;
  
  var k1 = -1/r1;
  var k2 = 1/r2;
  var k3 = 1/r3;
  
  var c1 = new Circle(z1.scale(k1),k1);
  var c2 = new Circle(z2.scale(k2),k2);
  var c3 = new Circle(z3.scale(k3),k3);
  
  c1.tangentCircles = [c2,c3];
  c2.tangentCircles = [c1,c3];
  c3.tangentCircles = [c2,c1];
  
  circles = [c1,c2,c3];
  frameRate(15)
} 
          
function draw() {
  background(0);
  
  var incompleteCircles = circles.filter((x) => x.tangentCircles.length>0  && x.tangentCircles.length<5);
  var completion = incompleteCircles.reduce( function(acc,obj) { return concat(acc,apollonian(obj));},[]);
  circles = concat(circles,completion);

  circles.map((x) => x.draw());
  if(circles.length>15000) noLoop();
}

function apollonian(c){
  if(c.tangentCircles.length<2)return [];
  if(c.tangentCircles.length==2) return decartes(c,c.tangentCircles[0],c.tangentCircles[1]);
  
  c1 = c.tangentCircles[0];
  c2 = c.tangentCircles[1];
  c3 = c.tangentCircles[2];
 
  var c23 = decartes(c,c2,c3).filter((x)=> !c1.isEqual(x) && x.r > 0.5)
  var c13 = decartes(c,c1,c3).filter((x)=> !c2.isEqual(x) && x.r > 0.5);
  var c12 = decartes(c,c1,c2).filter((x)=> !c3.isEqual(x) && x.r > 0.5);

  return concat(c23,concat(c12,c13));
}




function decartes(c1,c2,c3){
  var k_plus = c1.k + c2.k + c3.k + 2*sqrt(c1.k*c2.k + c3.k*c2.k + c1.k*c3.k);
  var k_minus = c1.k + c2.k + c3.k - 2*sqrt(c1.k*c2.k + c3.k*c2.k + c1.k*c3.k);
  
  var c12 = c1.z.mult(c2.z);
  var c23 = c2.z.mult(c3.z); 
  var c31 = c3.z.mult(c1.z); 
  
  var t1 = c1.z.add(c2.z.add(c3.z));
  var t2 = c12.add(c23.add(c31));
  var t3 = t2.sqrt().scale(2.0);                

  var z_plus = t1.add(t3);
  var z_minus = t1.minus(t3);

  var c_plus = new Circle(z_plus,k_plus);
  var c_minus = new Circle(z_minus,k_minus);
  
  c_plus.tangentCircles = [c1,c2,c3];
  c_minus.tangentCircles = [c1,c2,c3];
  
  c1.tangentCircles = [];
  c2.tangentCircles = [];
  c3.tangentCircles = [];
  
  return [c_plus,c_minus];
}

function Circle(z,k) {
  this.k = k;
  this.r = 1/abs(k);
  this.z = z;
  this.x = z.x/k;
  this.y = z.y/k;
  
  this.tangentCircles = []
  
  this.isEqual = function(c) {
    var tolerance = 1.0;
    
    var  equalR = abs(this.r - c.r) < tolerance;
    var  equalX = abs(this.x - c.x) < tolerance;
    var  equalY = abs(this.y - c.y) < tolerance;
    
    return equalR && equalX && equalY;
  }
  
  this.draw = function(){
    noFill();
    stroke(255);
    ellipse(this.x,this.y,2*this.r,2*this.r);
  }
}

function complex(x,y) {
  this.x = x;
  this.y = y;
  
  this.add = function(z){
    return new complex(this.x + z.x,this.y + z.y);
  }
  
  this.minus = function(z){
    return new complex(this.x - z.x,this.y - z.y);
  }
  
  this.mult = function(z){
    return new complex(this.x * z.x - this.y * z.y ,this.x * z.y + this.y * z.x);
  }
  
  this.scale = function(s){
    return new complex(this.x * s  ,this.y * s);
  }
  
  this.sq = function() {
    	return this.mult(this);
  }
  
  this.sqrt = function() {
    	var r = sqrt(this.modulus());
    	var arg = this.arg()/2.0;
    	return new complex(r*cos(arg),r*sin(arg));
  }
  
  this.modulus = function() {
    	return sqrt(this.x * this.x + this.y * this.y);
  }
  
  this.arg = function() {
    	return atan2(this.y,this.x);
  }
}
