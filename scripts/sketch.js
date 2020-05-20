let fontExtra, fontBold, fontRegu, fontThin, tcBold, forImg;
let backgroundColor, textColor, scrolltextColor;

function preload() {
  fontExtra = loadFont("fonts/Montserrat/Montserrat-ExtraBold.ttf");
  fontBold = loadFont("fonts/Montserrat/Montserrat-Bold.ttf");
  //fontRegu = loadFont("fonts/Proxima/ProximaNova-Regular.otf");
  fontThin = loadFont("fonts/Montserrat/Montserrat-Light.ttf");
  tcBold = loadFont("fonts/KozGoPr6N/KozGoPr6N-Bold.otf");
  forImg = loadImage("images/forImg.png");
}

function Text(
  text = "",
  xAxisPosition = 0,
  yAxisPosition = 0,
  xAxisSpeed = 0,
  yAxisSpeed = 0
) {
  this.text = text;
  this.xAxisPosition = xAxisPosition;
  this.yAxisPosition = yAxisPosition;
  this.xAxisSpeed = xAxisSpeed;
  this.yAxisSpeed = yAxisSpeed;
}

const ADATexts = [
  new Text("A", 0, 0, 1, 1),
  new Text("D", 400, 0, -0.8, -0.8),
  new Text("A", 800, 300, 0.5, 0.5),
];

function setup() {
  noCursor();
  backgroundColor = color(83, 15, 255);
  backgroundColor.setAlpha(0);
  textColor = color(0, 0, 255);
  textColor.setAlpha(0);
  scrolltextColor = color(255, 255, 255);
  tint(255, 0);
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent("canvasContainer");
  cnv.mouseWheel(_mouseWheel);
}

function drawPointer({ color = [83, 15, 255], width = 20, height = 20 } = {}) {
  noStroke();
  fill(color[0], color[1], color[2]);
  ellipse(mouseX, mouseY, width, height);
}

function draw() {
  blendMode(BLEND);
  sortADATexts(ADATexts);

  if (windowWidth <= 592) {
    drawMobileTablet();
  } else {
    drawDesktop();
  }

  drawPointer();
}

function sortADATexts(ADATexts) {
  const index = [0, 1, 2];
  index.sort((i, j) => {
    x_i = ADATexts[i].xAxisPosition;
    x_j = ADATexts[j].xAxisPosition;

    if (x_i < x_j) {
      return -1;
    } else if (x_i > x_j) {
      return 1;
    } else {
      return 0;
    }
  });
  index.forEach((element, index) => {
    if (index === 1) {
      ADATexts[element].text = "D";
    } else {
      ADATexts[element].text = "A";
    }
  });
}

function drawText({
  textObj,
  color = [83, 15, 255],
  font = fontBold,
  size = 200,
} = {}) {
  if (!textObj) return;

  noStroke();
  fill(...color);
  textAlign(CENTER, CENTER);
  textSize(size);
  textFont(font);

  text(textObj.text, textObj.xAxisPosition, textObj.yAxisPosition);

  if (textObj.xAxisPosition >= windowWidth) {
    textObj.xAxisSpeed = -Math.abs(textObj.xAxisSpeed);
  } else if (textObj.xAxisPosition < 0) {
    textObj.xAxisSpeed = Math.abs(textObj.xAxisSpeed);
  }

  if (textObj.yAxisPosition >= windowHeight) {
    textObj.yAxisSpeed = -Math.abs(textObj.yAxisSpeed);
  } else if (textObj.yAxisPosition < 0) {
    textObj.yAxisSpeed = Math.abs(textObj.yAxisSpeed);
  }

  textObj.xAxisPosition += textObj.xAxisSpeed;
  textObj.yAxisPosition += textObj.yAxisSpeed;
}

function drawTabletText() {
  blendMode(DIFFERENCE);
  noStroke();

  scrolltextColor.setAlpha(0 + 128 * cos(millis() / 1000));
  fill(scrolltextColor);
  textSize(20);
  textAlign(CENTER, CENTER);
  textFont(fontThin);
  text(
    "SCROLL FOR MORE",
    windowWidth / 2,
    windowHeight - 150
  );

  fill(textColor);
  textSize(10);
  textAlign(LEFT, BOTTOM);
  textFont(fontExtra);
  text("2020", 40 + 0.002 * mouseX, windowHeight - 350 + 0.002 * mouseY);
  text("ADA", 40 + 0.002 * mouseX, windowHeight - 250 + 0.002 * mouseY);
  text("AWARDS", 40 + 0.002 * mouseX, windowHeight - 150 + 0.002 * mouseY);

  textSize(50);
  textFont(fontBold);
  text(
    "emerging architects",
    40 + 0.002 * mouseX,
    windowHeight - 30 + 0.002 * mouseY
  );

  textSize(50);
  textAlign(LEFT, TOP);
  textFont(fontBold);
  text("ADA", 40 + 0.002 * mouseX, 20 + 0.002 * mouseY);

  textSize(40);
  textAlign(LEFT, TOP);
  textFont(tcBold);
  text("新銳建築獎", 170 + 0.002 * mouseX, 30 + 0.002 * mouseY);

  image(forImg, 40 + 0.002 * mouseX, windowHeight - 160 + 0.002 * mouseY);
}

function drawMobileText() {
  backgroundColor.setAlpha(255);
  textColor.setAlpha(255);
  tint(255, 255);
  blendMode(DIFFERENCE);
  noStroke();
  fill(textColor);
  textSize(50);
  textAlign(LEFT, BOTTOM);
  textFont(fontExtra);
  text("2O2O", 30 + 0.002 * mouseX, windowHeight - 220 + 0.002 * mouseY);
  text("ADA", 30 + 0.002 * mouseX, windowHeight - 170 + 0.002 * mouseY);
  text("AWARDS", 30 + 0.002 * mouseX, windowHeight - 120 + 0.002 * mouseY);

  forImg.resize(88.8, 44.4);
  image(forImg, 30, windowHeight - 120 + 0.002 * mouseY);

  textSize(28);
  textFont(fontBold);
  text(
    "emerging architects",
    30 + 0.002 * mouseX,
    windowHeight - 50 + 0.002 * mouseY
  );

  textSize(40);
  textAlign(LEFT, TOP);
  textFont(fontBold);
  text("ADA", 30 + 0.002 * mouseX, 10 + 0.002 * mouseY);

  textSize(33);
  textAlign(LEFT, TOP);
  textFont(tcBold);
  text("新銳建築獎", 128 + 0.002 * mouseX, 18 + 0.002 * mouseY);

  
}

function drawMobileTablet() {
  //background(255);
  background(backgroundColor);
  //ADATexts.forEach((textObj) => drawText({ textObj }));

  noFill();
  stroke(255, 74, 39);
  strokeWeight(300);
  strokeJoin(ROUND);
  strokeCap(ROUND);

  beginShape();
  curveVertex(mouseX - 100, mouseX / 3 + mouseY * 0.5);
  curveVertex(mouseX - 100, mouseX / 3 + mouseY * 0.5);
  curveVertex(windowWidth / 2 - 0.5 * mouseX + 0.7 * mouseY, mouseY + 100);
  curveVertex(windowWidth / 2, mouseX);
  curveVertex(400 - mouseY / 2, windowHeight - mouseY /2);
  curveVertex(windowWidth - mouseX / 2, windowHeight - mouseY / 2);
  curveVertex(windowWidth - mouseX / 2, windowHeight - mouseY / 2);
  endShape();

  drawMobileText();
}

function drawDesktop() {
  background(255);
  background(backgroundColor);
  ADATexts.forEach((textObj) => drawText({ textObj }));
  drawDesktopCurve();
  drawDesktopText();
}

function drawDesktopCurve() {
  noFill();
  stroke(255, 74, 39);
  strokeWeight(350);
  strokeJoin(ROUND);
  strokeCap(ROUND);

  beginShape();
  curveVertex(mouseX - 300, mouseX / 3);
  curveVertex(mouseX - 300, mouseX / 3);
  curveVertex(windowWidth / 4, mouseX - 100);
  curveVertex(windowWidth / 4 - 0.1 * mouseX, mouseY - 100);
  curveVertex(windowWidth / 2, mouseX);
  curveVertex(mouseX + 700, windowHeight / 2);
  curveVertex(mouseY + 700, windowHeight / 2);
  curveVertex(windowWidth - mouseX / 2, windowHeight - mouseY / 2);
  curveVertex(windowWidth - mouseX / 2, windowHeight - mouseY / 2);
  endShape();
}

function drawDesktopText() {
  blendMode(DIFFERENCE);
  noStroke();

  scrolltextColor.setAlpha(0 + 128 * cos(millis() / 1000));
  fill(scrolltextColor);
  textSize(20);
  textAlign(CENTER, CENTER);
  textFont(fontThin);
  text(
    "SCROLL FOR MORE",
    windowWidth / 2,
    windowHeight - 150
  );

  fill(textColor);
  textSize(40);
  textAlign(LEFT, BOTTOM);
  textFont(fontExtra);
  text(
    "2O2O ADA AWARDS",
    40 + 0.003 * mouseX,
    windowHeight - 30 + 0.003 * mouseY
  );

  textSize(40);
  textAlign(RIGHT, BOTTOM);
  textFont(fontBold);
  text(
    "emerging architects",
    windowWidth - 40 + 0.003 * mouseX,
    windowHeight - 30 + 0.003 * mouseY
  );

  textSize(40);
  textAlign(LEFT, TOP);
  textFont(fontBold);
  text(
    "ADA",
    40 + 0.003 * mouseX, 
    20 + 0.003 * mouseY
  );

  textSize(30);
  textAlign(LEFT, TOP);
  textFont(tcBold);
  text(
    "新銳建築獎", 
    140 + 0.003 * mouseX, 
    30 + 0.003 * mouseY
  );

  forImg.resize(100, 50);
  image(
    forImg, 
    windowWidth - 580 + 0.003 * mouseX, 
    windowHeight - 80 + 0.003 * mouseY
  );
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function _mouseWheel(event) {
  const prevAlpha = alpha(backgroundColor);
  const delta = event.deltaY;
  let nextAlpha = prevAlpha + (delta / windowHeight) * 255 * 0.2;

  if (nextAlpha > 255) {
    nextAlpha = 255;
    scrolltextColor.setAlpha(0);

  } else if (nextAlpha < 0) {
    nextAlpha = 0;
  }

  backgroundColor.setAlpha(nextAlpha);
  textColor.setAlpha(nextAlpha);
  tint(255, nextAlpha);
}

function mouseWheel() {
  const _alpha = alpha(backgroundColor);
  const delta = event.deltaY;
  if (delta > 0 && _alpha < 254) {
      return false;
    }
}
