let fontBold, fontRegu, fontThin, forImg;
let backgroundColor, textColor

function preload() {
  fontExtra = loadFont('fonts/Montserrat/Montserrat-ExtraBold.ttf');
  fontBold = loadFont('fonts/Montserrat/Montserrat-Bold.ttf');
  fontRegu = loadFont('fonts/Proxima/ProximaNova-Regular.otf');
  fontThin = loadFont('fonts/Proxima/Proxima Nova Alt Thin.otf');
  tcBold = loadFont('fonts/KozGoPr6N/KozGoPr6N-Bold.otf');
  forImg = loadImage('images/forImg.png');

}

function Character(
  character = '',
  xAxisPosition = 0,
  yAxisPosition = 0,
  xAxisSpeed = 0,
  yAxisSpeed = 0
) {
  this.character = character;
  this.xAxisPosition = xAxisPosition
  this.yAxisPosition = yAxisPosition;
  this.xAxisSpeed = xAxisSpeed;
  this.yAxisSpeed = yAxisSpeed;
}

const characters = [
  new Character('A', 0, 0, 1, 1),
  new Character('D', 400, 0, -0.8, -0.8),
  new Character('A', 800, 300, 0.5, 0.5)
]

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

function setup() {
  backgroundColor = color(83, 15, 255)
  backgroundColor.setAlpha(0)
  textColor = color(0, 0, 255)
  textColor.setAlpha(0)
  tint(255,0)
  createCanvas(windowWidth, windowHeight);
}

function drawPointer({
  color = [83, 15, 255],
  width = 20,
  height = 20
} = {}) {
  noStroke();
  fill(color[0], color[1], color[2]);
  ellipse(mouseX, mouseY, width, height);
}

function draw() {
  blendMode(BLEND);

  if (windowWidth <= 1306) {
    drawMobileTablet()
  } else {
    drawDesktop()
  }

  drawPointer()

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
}

function drawCharacter({
  character,
  color = [83, 15, 255],
  font = fontBold,
  size = 300,
} = {}) {
  if (!character) return

  noStroke();
  fill(...color);
  textAlign(CENTER, CENTER);
  textSize(size);
  textFont(font);

  text(character.character, character.xAxisPosition, character.yAxisPosition);

  if (character.xAxisPosition >= windowWidth) {
    character.xAxisSpeed = -Math.abs(character.xAxisSpeed)
  } else if (character.xAxisPosition < 0) {
    character.xAxisSpeed = Math.abs(character.xAxisSpeed)
  }

  if (character.yAxisPosition >= windowHeight) {
    character.yAxisSpeed = -Math.abs(character.yAxisSpeed)
  } else if (character.yAxisPosition < 0) {
    character.yAxisSpeed = Math.abs(character.yAxisSpeed)
  }

  character.xAxisPosition += character.xAxisSpeed
  character.yAxisPosition += character.yAxisSpeed
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

function drawTabletText(){
  blendMode(DIFFERENCE);
  noStroke();
  fill(textColor);
  textSize(100);
  textAlign(LEFT, BOTTOM);
  textFont(fontExtra);
  text('2020', 40 + 0.002 * mouseX, windowHeight - 350 + 0.002 * mouseY);
  text('ADA', 40 + 0.002 * mouseX, windowHeight - 250 + 0.002 * mouseY);
  text('AWARDS', 40 + 0.002 * mouseX, windowHeight - 150 + 0.002 * mouseY);

  textSize(50);
  textFont(fontBold);
  text('emerging architects', 40 + 0.002 * mouseX, windowHeight - 30 + 0.002 * mouseY);

  textSize(50);
  textAlign(RIGHT, TOP);
  textFont(fontBold);
  text('menu', windowWidth - 40 + 0.002 * mouseX, 20 + 0.002 * mouseY);
  
  textSize(50);
  textAlign(LEFT, TOP);
  textFont(fontBold);
  text('ADA', 40 + 0.002 * mouseX, 20 + 0.002 * mouseY);

  textSize(40);
  textAlign(LEFT, TOP);
  textFont(tcBold);
  text('新銳建築獎', 170 + 0.002 * mouseX, 30 + 0.002 * mouseY);

  image(forImg, 40 , windowHeight - 160 + 0.002 * mouseY);

}

function drawMobileText(){
  blendMode(DIFFERENCE);
  noStroke();
  fill(textColor);
  textSize(50);
  textAlign(LEFT, BOTTOM);
  textFont(fontExtra);
  text('2020', 10 + 0.002 * mouseX, windowHeight - 180 + 0.002 * mouseY);
  text('ADA', 10 + 0.002 * mouseX, windowHeight - 130 + 0.002 * mouseY);
  text('AWARDS', 10 + 0.002 * mouseX, windowHeight - 80 + 0.002 * mouseY);

  textSize(28);
  textFont(fontBold);
  text('emerging architects', 10 + 0.002 * mouseX, windowHeight - 10 + 0.002 * mouseY);

  textSize(30);
  textAlign(RIGHT, TOP);
  textFont(fontBold);
  text('menu', windowWidth - 10 + 0.002 * mouseX, 10 + 0.002 * mouseY);
  
  textSize(30);
  textAlign(LEFT, TOP);
  textFont(fontBold);
  text('ADA', 10 + 0.002 * mouseX, 10 + 0.002 * mouseY);

  textSize(23);
  textAlign(LEFT, TOP);
  textFont(tcBold);
  text('新銳建築獎', 83 + 0.002 * mouseX, 18 + 0.002 * mouseY);

  forImg.resize(88.8, 44.4)
  image(forImg, 10 , windowHeight - 80 + 0.002 * mouseY);
}

function drawDesktopText(){
  blendMode(DIFFERENCE);
  noStroke();
  fill(textColor);
  textSize(50);
  textAlign(LEFT, BOTTOM);
  textFont(fontExtra);
  text('2020 ADA AWARDS', 40 + 0.002 * mouseX, windowHeight - 30 + 0.002 * mouseY);

  textSize(50);
  textAlign(RIGHT, BOTTOM);
  textFont(fontBold);
  text('emerging architects', windowWidth - 40 + 0.002 * mouseX, windowHeight - 30 + 0.002 * mouseY);

  textSize(50);
  textAlign(RIGHT, TOP);
  textFont(fontBold);
  text('menu', windowWidth - 40 + 0.002 * mouseX, 20 + 0.002 * mouseY);
  
  textSize(50);
  textAlign(LEFT, TOP);
  textFont(fontBold);
  text('ADA', 40 + 0.002 * mouseX, 20 + 0.002 * mouseY);

  textSize(40);
  textAlign(LEFT, TOP);
  textFont(tcBold);
  text('新銳建築獎', 170 + 0.002 * mouseX, 30 + 0.002 * mouseY);

  image(forImg, windowWidth - 730 , windowHeight - 100 + 0.002 * mouseY);

}

function drawMobileTablet() {
  background(255);
  background(backgroundColor);
  characters.forEach(character => drawCharacter({ character }))
  
  noFill();
  stroke(255, 74, 39);
  strokeWeight(400);
  strokeJoin(ROUND);
  strokeCap(ROUND);

  beginShape();
  curveVertex(mouseY - 100, 15);
  curveVertex(mouseX - 100, 15);
  //curveVertex(windowWidth / 4, mouseX - 100);
  //curveVertex(windowWidth / 4, mouseY - 100);
  // curveVertex(windowWidth / 2, mouseX);
  //curveVertex(windowWidth / 2, mouseX);
  // curveVertex(mouseX + 700, windowHeight / 2);
  //curveVertex(mouseY + 700, windowHeight / 2);
  curveVertex(mouseY + 200, windowHeight - 100);
  curveVertex(mouseX + 200, windowHeight - 100);
  endShape();

  if(windowWidth < 592)
    drawMobileText()
  else
    drawTabletText()
}

function drawDesktop() {
  background(255);
  background(backgroundColor);
  characters.forEach(character => drawCharacter({ character }))
  
  noFill();
  stroke(255, 74, 39);
  strokeWeight(400);
  strokeJoin(ROUND);
  strokeCap(ROUND);

  beginShape();
  curveVertex(mouseY - 100, 15);
  curveVertex(mouseX - 100, 15);
  curveVertex(windowWidth / 4, mouseX - 100);
  curveVertex(windowWidth / 4, mouseY - 100);
  curveVertex(windowWidth / 2, mouseX);
  curveVertex(windowWidth / 2, mouseX);
  curveVertex(mouseX + 700, windowHeight / 2);
  curveVertex(mouseY + 700, windowHeight / 2);
  curveVertex(mouseY + 200, windowHeight - 100);
  curveVertex(mouseX + 200, windowHeight - 100);
  endShape();

  drawDesktopText();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mouseWheel(event) {
  const prevAlpha = alpha(backgroundColor)
  const delta = event.deltaY
  let nextAlpha = prevAlpha + (delta / windowHeight) * 255 * 0.2

  if (nextAlpha > 255) {
    nextAlpha = 255
  } else if (nextAlpha < 0) {
    nextAlpha = 0
  }

  backgroundColor.setAlpha(nextAlpha)
  textColor.setAlpha(nextAlpha)
  tint(255, nextAlpha)

  return false
}

// 0~255/windowHeight
