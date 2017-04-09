var x, y
var dx, dy
var fontRegular;

function preload() {
 fontRegular = loadFont("assets/fontRegular.otf");
}

function setup() {
 createCanvas(600, 600)
 x = width / 2 + random(0, width / 2)
 y = random(height)
}

function draw() {

 //interaction
 background('#b7dcff')

 //left part 
 fill('#ffe359')
 rect(0, 0, width / 2, height)

 //object
 fill('#76aee2')
 noStroke()
 ellipse(x, y, 100, 100)

 if (mouseIsPressed) {
  x = mouseX - dx
  y = mouseY - dy
 }

 //textbox
 fill(255)
 rect(0, height - 70, width, 70)

 //text
 noStroke()
 fill('#ff56c1')
 textFont(fontRegular)
 textSize(36)
 text("SPOSTARE", width / 2 - 80, height - 20)
}

function mousePressed() {
 if (mouseIsPressed) {
  if (dist(x, y, mouseX, mouseY) < 50) {
   dx = mouseX - x
   dy = mouseY - y
  }
  if (mouseX <= 300) {
   fill(0)
   rect(0, 0, width / 2, height)
  }
 }

}