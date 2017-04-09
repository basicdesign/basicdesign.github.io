var c
var c1
var c2
var disegna
var but

document.addEventListener('touchstart', function(e) {e.preventDefault()}, false);
document.addEventListener('touchmove', function(e) {e.preventDefault()}, false);

function setup() {
  canvasX = window.innerWidth
  canvasY = window.innerHeight
  createCanvas(canvasX,canvasY)
  blendMode(LIGHTEST)
  background(20)
  
  c = new Cerchio(random(width), random(height), color(0,255,0))
  c1 = new Cerchio(random(width), random(height), color(255,0,0))
  c2 = new Cerchio(random(width), random(height), color(0,0, 255))
  
  but = new Bottone(canvasX -40, canvasY - 40)
  
  
}

function draw() {
  c.disegna()
  c1.disegna()
  c2.disegna()
  
  if(disegna) {
    if (c.isDraggable) {
      c.x = mouseX - c.dx
      c.y = mouseY - c.dy
    }
    
    if (c1.isDraggable) {
      c1.x = mouseX - c1.dx
      c1.y = mouseY - c1.dy
    }
    if (c2.isDraggable) {
      c2.x = mouseX - c2.dx
      c2.y = mouseY - c2.dy
    }
  }
  but.disegna()
}

function touchMoved() {
  disegna=true
  
  if (but.isInside(mouseX,mouseY)){
    blendMode(BLEND)
    background(0)
    blendMode(LIGHTEST)
  }
  
  if (c.isInside(mouseX, mouseY)) {
    c.isDraggable = true
    c.dx = mouseX - c.x
    c.dy = mouseY - c.y
  }
  
  if (c1.isInside(mouseX, mouseY)) {
    c1.isDraggable = true
    c1.dx = mouseX - c1.x
    c1.dy = mouseY - c1.y
  }
  if (c2.isInside(mouseX, mouseY)) {
    c2.isDraggable = true
    c2.dx = mouseX - c2.x
    c2.dy = mouseY - c2.y
  }
  
}

function touchEnded() {
  c2.isDraggable = false
  c1.isDraggable = false
  c.isDraggable = false
  disegna=false
}

function Cerchio(_x, _y, col) {
  this.x = _x
  this.y = _y
  this.raggio = 40
  this.isDraggable = false
  
  
  this.disegna = function() {
    fill(col)
    if (this.isDraggable) {
      this.raggio = random(20,50)
    }
    ellipse(this.x, this.y, this.raggio, this.raggio)
    
  }
  
  this.isInside = function(mx, my) {
    if (dist(mx,my, this.x, this.y) < this.raggio) {
      return true
    } else {
      return false
    }
  }
  
}

function Bottone(_x, _y) {
  this.x = _x
  this.y = _y
  this.w = 30
  this.h = 30
  
  this.disegna = function() {
    fill(120)
    rect(this.x, this.y, this.w, this.h)
  }
  
  this.isInside = function(mx, my) {
    if (mx > this.x && mx < this.x+this.w && my>this.y && my<this.y+this.h) {
      return true
    } else {
      return false
    }
  }
  
}

function keyPressed() {
  blendMode(BLEND)
  background(0)
  blendMode(LIGHTEST)
}

/*function touchMoved() {
  if(mouseX>0 && mouseX<width){
  strokeWeight(2)
  stroke(255);
  line(mouseX, mouseY, pmouseX, pmouseY);
  
  return false;
 }
}
*/
