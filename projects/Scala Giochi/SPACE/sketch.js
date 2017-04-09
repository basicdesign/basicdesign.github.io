var draggabili = []
var NUM = 9

var XposImage =[120,250,650,50,0,500,120,450,240]
var YposImage =[50,50,90,80,280,30,260,100,210]

function setup() {
  sfondo = loadImage('assets/sfondo.png')
  createCanvas(812, 466)
  for (var i = 0; i < NUM; i++) {
    draggabili[i] = new Draggable(XposImage[i], YposImage[i], i + ".png")
  }
}

function draw() {
  background(sfondo)
  for (var i = 0; i < NUM; i++) {
    draggabili[i].disegna()
  }
}

function mousePressed() {
  for (var i = 0; i < NUM; i++) {
    if (draggabili[i].isInside(mouseX, mouseY)) {
      draggabili[i].dx = mouseX - draggabili[i].x
      draggabili[i].dy = mouseY - draggabili[i].y
      draggabili[i].isDragged = true
    }
  }
}

function mouseReleased() {
  for (var i = 0; i < NUM; i++) {
    draggabili[i].isDragged = false
  }
}

function Draggable(_x, _y, file) {

  this.x = _x
  this.y = _y
  this.img = loadImage("assets/" + file)
  this.dx
  this.dy
  this.isDragged = false

  this.disegna = function() {
    image(this.img, this.x, this.y, this.img.width, this.img.height)
    if (this.isDragged == true) {
      this.x = mouseX - this.dx
      this.y = mouseY - this.dy
    }
  }

  this.isInside = function(mx, my) {
    if (mx > this.x && mx < this.x + this.img.width && my > this.y && my < this.y + this.img.height) {
      return true
    } else {
      return false
    }
  }

}