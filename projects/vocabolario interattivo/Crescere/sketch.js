var y = 450
var fontRegular;

function preload() {
 fontRegular = loadFont("assets/fontRegular.otf");
}

function setup() {
 createCanvas(600, 600)

}

function draw() {
 background(255)

 //roots
 fill('#ffe359')
 rectMode(CENTER)
 rect(width / 2, y, 20, 30)

 //object
 fill('#ffe359')
 ellipse(width / 2, 450, 50, 50)

 //text
 noStroke()
 fill('#ff56c1')
 textFont(fontRegular)
 textSize(36)
 text("CRESCERE", width / 2 - 90, height - 20)
}

function keyPressed() {
 if (keyCode == UP_ARROW) {
  //if (mouseX >= width / 2 || mouseX <= width / 2 + 50 || mouseY >= 450 || mouseY <= 450 + 50) {
  y -= 1
   // }
 } else {
  if (keyCode == RIGHT_ARROW) {
   rotate(radians(random(360)))
   y -= 1
  }
 }
}