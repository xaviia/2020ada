let fontBold, fontRegu, fontThin;

function preload() {
  fontBold = loadFont('fonts/Proxima/Proxima Nova Bold.otf');
  fontRegu = loadFont('fonts/Proxima/ProximaNova-Regular.otf');
  fontThin = loadFont('fonts/Proxima/Proxima Nova Alt Thin.otf');
  tcThin = loadFont('fonts/KozGoPr6N/KozGoPr6N-Light.otf');
}

let maskImage;
let Pmain;
let photo;
let imgClone;
let x1 = 0,
  y1 = 0,
  x2 = 400,
  y2 = 0,
  x3 = 800,
  y3 = 300;
let a1 = 1,
  a2 = -0.8,
  a3 = 0.5,
  b1 = 1,
  b2 = -0.8,
  b3 = 0.5;
let num1 = 65,
  num2 = 68,
  num3 = 65;
let style = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  curvertexWidepositive()

  if ((x1 < x2 && x3 < x1) || (x1 > x2 && x3 > x1)) {
    num1 = 68;
    num2 = 65;
    num3 = 65;
  } else if ((x2 < x1 && x3 < x2) || (x2 > x1 && x3 > x2)) {
    num1 = 65;
    num2 = 68;
    num3 = 65;
  } else if ((x3 < x1 && x2 < x3) || (x3 > x1 && x2 > x3)) {
    num1 = 65;
    num2 = 65;
    num3 = 68;
  }

  noStroke();
  fill(255, 100, 100);
  ellipse(mouseX, mouseY, 20, 20);
}

function FIRST() {
  noStroke();
  textSize(300);
  fill(0);
  scale(1, 0.9);
  //textFont(fontRegu);
  textAlign(CENTER, CENTER);
  text(char(num1), x1, y1);

  if (x1 >= windowWidth || x1 < 0) {
    a1 = -a1;
  } else if (y1 >= windowHeight || y1 < 0) {
    b1 = -b1;
  }
  x1 += a1;
  y1 += b1;
}

function SECOND() {
  noStroke();
  textSize(300);
  fill(0);
  textAlign(CENTER, CENTER);
  //textFont(Regular);
  text(char(num2), x2, y2);

  if (x2 >= windowWidth || x2 < 0) {
    a2 = -a2;
  } else if (y2 >= windowHeight || y2 < 0) {
    b2 = -b2;
  }
  x2 += a2;
  y2 += b2;
}

function THIRD() {
  noStroke();
  textSize(300);
  fill(0);
  textAlign(CENTER, CENTER);
  //textFont(Regular);
  text(char(num3), x3, y3);

  if (x3 >= windowWidth || x3 < 0) {
    a3 = -a3;
  } else if (y3 >= windowHeight || y3 < 0) {
    b3 = -b3;
  }
  x3 += a3;
  y3 += b3;
}

function curvertexWidepositive() {
  background(255);
  FIRST();
  SECOND();
  THIRD();

  noFill();
  stroke(255, 255, 150);
  strokeWeight(300);
  strokeJoin(ROUND);
  strokeCap(ROUND);

  beginShape();
  curveVertex(mouseY - 100, 15);
  curveVertex(mouseX - 100, 15);
  curveVertex(windowWidth / 4, mouseX - 100);
  curveVertex(windowWidth / 4, mouseY - 100);
  // curveVertex(windowWidth / 2, mouseX);
  curveVertex(windowWidth / 2, mouseX);
  // curveVertex(mouseX + 700, windowHeight / 2);
  curveVertex(mouseY + 700, windowHeight / 2);
  curveVertex(mouseY + 200, windowHeight - 100);
  curveVertex(mouseX + 200, windowHeight - 100);
  endShape();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
