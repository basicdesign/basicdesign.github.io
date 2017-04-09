var sf1
var panino
var dim = 100

var x, y
var dx, dy
var s = 0.5
var nImage = ['assets/0.png', 'assets/1.png', 'assets/2.png', 'assets/3.png', 'assets/4.png', 'assets/5.png', 'assets/6.png', 'assets/7.png', 'assets/8.png', 'assets/9.png']
var i = 1

function preload() {
  sf1 = loadImage(nImage[i])
   panino = loadImage('assets/panino.png')


}

function setup() {
  createCanvas(1450, 865)

  x = 100
  y = 100

}




function draw() {
  background(sf1)

  push()
  translate(x, y)
  scale(s)
  image(panino, -panino.width / 2, -panino.height / 2)
  pop()

  if (keyIsDown(UP_ARROW)) {
    s += 0.01
  }
  if (keyIsDown(DOWN_ARROW)) {
    s -= 0.01
  }
  
  if (mouseIsPressed) {
    if (dist(x, y, mouseX, mouseY)) {
      x = mouseX - dx
      y = mouseY - dy
    }
  }

}


function mousePressed() {
  dx = mouseX - x
  dy = mouseY - y
}

 function keyPressed() {
   if (key == ' ') {
     if (i == 9) {
       i = 0
     }
     else{
     i = i + 1
     }
     preload()
   }
}
