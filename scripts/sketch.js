let fontExtra, fontBold, fontRegu, fontThin, tcBold, forImg;
let backgroundColor, textColor;

function preload() {
  fontExtra = loadFont("fonts/Montserrat/Montserrat-ExtraBold.ttf");
  fontBold = loadFont("fonts/Montserrat/Montserrat-Bold.ttf");
  fontRegu = loadFont("fonts/Proxima/ProximaNova-Regular.otf");
  fontThin = loadFont("fonts/Proxima/Proxima Nova Alt Thin.otf");
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
  backgroundColor = color(83, 15, 255);
  backgroundColor.setAlpha(0);
  textColor = color(0, 0, 255);
  textColor.setAlpha(0);
  tint(255, 0);
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent('canvasContainer');
  cnv.mouseWheel(_mouseWheel)
}

function drawPointer({ color = [83, 15, 255], width = 20, height = 20 } = {}) {
  noStroke();
  fill(color[0], color[1], color[2]);
  ellipse(mouseX, mouseY, width, height);
}

function draw() {
  blendMode(BLEND);
  sortADATexts(ADATexts)

  if (windowWidth <= 1306) {
    drawMobileTablet();
  } else {
    drawDesktop();
  }

  drawPointer();
}

function sortADATexts(ADATexts) {
  const index = [0, 1, 2]
  index.sort((i, j) => {
    x_i = ADATexts[i].xAxisPosition
    x_j = ADATexts[j].xAxisPosition

    if (x_i < x_j) {
      return -1
    } else if (x_i > x_j) {
      return 1
    } else {
      return 0
    }
  })
  index.forEach((element, index) => {
    if (index === 1) {
      ADATexts[element].text = 'D'
    } else {
      ADATexts[element].text = 'A'
    }
  })
}

function drawText({
  textObj,
  color = [83, 15, 255],
  font = fontBold,
  size = 300,
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
  fill(textColor);
  textSize(100);
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
  textAlign(RIGHT, TOP);
  textFont(fontBold);
  text("menu", windowWidth - 40 + 0.002 * mouseX, 20 + 0.002 * mouseY);

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
  text("2020", 10 + 0.002 * mouseX, windowHeight - 180 + 0.002 * mouseY);
  text("ADA", 10 + 0.002 * mouseX, windowHeight - 130 + 0.002 * mouseY);
  text("AWARDS", 10 + 0.002 * mouseX, windowHeight - 80 + 0.002 * mouseY);

  textSize(28);
  textFont(fontBold);
  text(
    "emerging architects",
    10 + 0.002 * mouseX,
    windowHeight - 10 + 0.002 * mouseY
  );

  textSize(30);
  textAlign(RIGHT, TOP);
  textFont(fontBold);
  text("menu", windowWidth - 10 + 0.002 * mouseX, 10 + 0.002 * mouseY);

  textSize(30);
  textAlign(LEFT, TOP);
  textFont(fontBold);
  text("ADA", 10 + 0.002 * mouseX, 10 + 0.002 * mouseY);

  textSize(23);
  textAlign(LEFT, TOP);
  textFont(tcBold);
  text("新銳建築獎", 83 + 0.002 * mouseX, 18 + 0.002 * mouseY);

  forImg.resize(88.8, 44.4);
  image(forImg, 10, windowHeight - 80 + 0.002 * mouseY);
}

function drawMobileTablet() {
  background(255);
  background(backgroundColor);
  ADATexts.forEach((textObj) => drawText({ textObj }));

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

  if (windowWidth < 592) drawMobileText();
  else drawTabletText();
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
  strokeWeight(400);
  strokeJoin(ROUND);
  strokeCap(ROUND);
  beginShape();
  curveVertex(mouseY - 100, 15);
  curveVertex(mouseX - 100, 15);
  curveVertex(windowWidth / 4, mouseY - 100);
  curveVertex(windowWidth / 2, mouseX);
  curveVertex(mouseY + 700, windowHeight / 2);
  curveVertex(mouseY + 200, windowHeight - 100);
  curveVertex(mouseX + 200, windowHeight - 100);
  endShape();
}

function drawDesktopText() {
  blendMode(DIFFERENCE);
  noStroke();
  fill(textColor);
  textSize(50);
  textAlign(LEFT, BOTTOM);
  textFont(fontExtra);
  text(
    "2020 ADA AWARDS",
    40 + 0.002 * mouseX,
    windowHeight - 30 + 0.002 * mouseY
  );

  textSize(50);
  textAlign(RIGHT, BOTTOM);
  textFont(fontBold);
  text(
    "emerging architects",
    windowWidth - 40 + 0.002 * mouseX,
    windowHeight - 30 + 0.002 * mouseY
  );

  textSize(50);
  textAlign(RIGHT, TOP);
  textFont(fontBold);
  text("menu", windowWidth - 40 + 0.002 * mouseX, 20 + 0.002 * mouseY);

  textSize(50);
  textAlign(LEFT, TOP);
  textFont(fontBold);
  text("ADA", 40 + 0.002 * mouseX, 20 + 0.002 * mouseY);

  textSize(40);
  textAlign(LEFT, TOP);
  textFont(tcBold);
  text("新銳建築獎", 170 + 0.002 * mouseX, 30 + 0.002 * mouseY);

  image(forImg, windowWidth - 730 + 1.2 * mouseX, windowHeight - 100 + 0.002 * mouseY);
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
  } else if (nextAlpha < 0) {
    nextAlpha = 0;
  }

  backgroundColor.setAlpha(nextAlpha);
  textColor.setAlpha(nextAlpha);
  tint(255, nextAlpha);
  console.log(`event: ${event.deltaY}`)
  console.log(`nextAlpha: ${nextAlpha}`)

  return nextAlpha < 255 ? false : undefined
  // return false;
}
