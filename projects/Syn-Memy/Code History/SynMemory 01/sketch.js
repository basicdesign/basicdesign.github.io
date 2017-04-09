var xCard = -50
var yCard = -50
var widthCard = 50
var heightCard = 80
var strokSelection = 4
//147, 255, 217

function setup() {
  createCanvas(400, 400)
  stroke(0)
  strokeWeight(strokSelection)
}

function draw() {
  // settings 
  background(214, 255, 213)
  rectMode(CENTER)

  // generatore carte memory
  for (var j = 0; j < 5; j++) {
    for (var i = 0; i < 5; i++) {
      push()
      translate(j * 100, i * 100)
      fill(255, 222, 222)
      rect(xCard, yCard, widthCard, heightCard)
      //xCard
      pop()
    }
  }
  // touching card
  if (mouseX == xCard || mouseY == yCard) {
    strokSelection += 3
  }
}