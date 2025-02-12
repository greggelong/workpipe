let points1 = [];
let points2 = [];
const maxPoints = 1500; // Limit stored points for performance

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
}

function draw() {
  background(0);

  stroke(0, 0, 255);
  strokeWeight(20);

  for (let i = 0; i < points1.length - 1; i++) {
    line(points1[i].x, points1[i].y, points1[i + 1].x, points1[i + 1].y);
    line(
      width - points1[i].x,
      points1[i].y,
      width - points1[i + 1].x,
      points1[i + 1].y
    );
  }

  let boatps = points1.concat(points2);
  if (boatps.length > 0) {
    let boat = boatps[frameCount % boatps.length];
    fill(255, 255, 0);
    noStroke();
    ellipse(boat.x, boat.y, 40, 10);
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
}

function touchMoved() {
  if (touches.length > 0) {
    let x = touches[0].x;
    let y = touches[0].y;
    let px = x;
    let py = y;

    if (points1.length > 0) {
      px = points1[points1.length - 1].x;
      py = points1[points1.length - 1].y;
    }

    addPoint(x, y, px, py);
  }
  return false; // Prevent scrolling on touch devices
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
