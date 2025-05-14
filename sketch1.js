let x, y, px, py;
let points1 = [];
let points2 = [];
let boatcanvas;
function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);

  // Add bilingual instruction text
  let instructions = createDiv(
    "🖐️ Use your finger to draw. 🔄 Refresh the page to start over.<br>🖐️ 用手指在屏幕上画画。🔄 刷新页面重新开始。"
  );
  instructions.style("position", "absolute");
  instructions.style("top", "10px");
  instructions.style("left", "10px");
  instructions.style("color", "white");
  instructions.style("font-size", "18px");
  instructions.style("font-family", "sans-serif");
  instructions.style("background", "rgba(0,0,0,0.5)");
  instructions.style("padding", "10px");
  instructions.style("border-radius", "8px");
  instructions.style("z-index", "10");
}

function draw() {
  background(0);

  //image(boatcanvas,0,0)
  //stroke(frameCount %360, 75, 100);
  stroke(0, 0, 255);

  strokeWeight(20);

  x = mouseX;
  y = mouseY;
  px = pmouseX;
  py = pmouseY;
  //   if (mouseIsPressed) {
  //     points1.push(createVector(x, y));
  //     points1.push(createVector(px, py));
  //     points2.unshift(createVector(width - px, py));
  //     points2.unshift(createVector(width - x, y));
  //   }

  for (let i = 0; i < points1.length - 1; i++) {
    stroke(0, 255, 0);
    line(points1[i].x, points1[i].y, points1[i + 1].x, points1[i + 1].y);
    line(
      width - points1[i].x,
      points1[i].y,
      width - points1[i + 1].x,
      points1[i + 1].y
    );
  }
  let boatps = points1.concat(points2);
  let boat = boatps[frameCount % boatps.length];
  fill(255, 0, 0);
  if (boat != null) {
    noStroke();
    ellipse(boat.x, boat.y, 50, 30);
  }
}

// Function to handle drawing logic for both touch & mouse
function addPoint(x, y, px, py) {
  points1.push(createVector(x, y));
  points1.push(createVector(px, py));
  points2.unshift(createVector(width - px, py));
  points2.unshift(createVector(width - x, y));

  // Keep points array from growing infinitely
  //if (points1.length > maxPoints) points1.splice(0, 2);
  // if (points2.length > maxPoints) points2.splice(0, 2);
}

// Works for both mouse and touch input
function mouseDragged() {
  addPoint(mouseX, mouseY, pmouseX, pmouseY);
  return false;
}
