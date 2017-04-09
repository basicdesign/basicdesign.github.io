var fixH
var s = 100
var b = 100
var w = 8
var stripeW = 360
var range = 5
var play = true
var vel = 0
var ang = 0

var p2;
var p1;

function setup() {
  createCanvas(1000, 800)
  noStroke()
  rectMode(CENTER)
  colorMode(HSB, stripeW, 100, 100, 1);
  fixH = random(360)

  p1 = new player(250, height / 2, 0)
  p2 = new player(750, height / 2, 0)
}

function draw() {
  background(90)

  p1.disegna()
  p2.disegna()

  //TASTI
  if (play) {

    if (keyIsDown(LEFT_ARROW)) {
      p1.scrollColor()
    }
    if (keyIsDown(RIGHT_ARROW)) {
      p2.scrollColor()
    }
  } else {
    var winner
    if (chiVince() == 1) {
      //winner = "player 1"
      p1.ingrandisci()
      p2.collapse()
    }
    if (chiVince() == 2) {
      //winner = "player 2"
      p2.ingrandisci()
      p1.collapse()
    }
    //fill(0, 0, 0)
    //noStroke()
    //text(winner + ' hai vinto!', 100, 100)
  }

  // RETTANGOLO RIFERIMENTO
  noStroke()
  fill(fixH, s, b)
  rect(width / 2, height / 2, 400, 150)

}




function player(x, y, _h) {

  this.dim = 400
  this.barX = x - 180
  this.barY = y + 240
  this.lineX = this.barX
  this.h = _h

  this.disegna = function() {
    noStroke()
    fill(this.h, s, b)
      //this.drawRect(x, y, this.dim, this.dim)
    rect(x, y, this.dim, this.dim)
    this.drawBar(this.barX, this.barY)
    this.drawLine()
  }

  /*this.drawRect = function(x, y, this.dim, this.dim){
    rect(x, y, this.dim, this.dim)
  }*/

  this.drawBar = function(px, py) {
    for (i = 0; i < 360; i++) {
      var rectX = map(i, 0, 360, 0, stripeW)
      fill(i, s, b)
      noStroke()
      push()
      translate(px, py)
      rect(rectX, 0, 1, 20)
      pop()
    }
  }

  this.drawLine = function() {
    stroke(0)
    strokeWeight(3)
    line(this.lineX, this.barY - 15, this.lineX, this.barY + 15)
  }

  this.scrollColor = function() {
    this.lineX++
      if (this.lineX > this.barX + 360) this.lineX = this.barX
    this.h++
      if (this.h > 360) this.h = 0
  }

  this.ingrandisci = function() {
    if (this.dim < 430) {
      this.dim = this.dim + 1
    }
  }

  this.collapse = function() {
    if (this.dim > 1) {
      this.dim = this.dim - 7
    }
  }

  this.resett = function() {
    this.h = 0
    this.dim = 400
    this.lineX = x - 180
    this.barX = x - 180
  }


}

function keyPressed() {
  if (keyCode == DOWN_ARROW) {
    play = false
  }
  if (keyCode == UP_ARROW) {
    play = true
    resett()
  }
}

function chiVince() {
  var diff1 = abs(fixH - p1.h)
  var diff2 = abs(fixH - p2.h)
  var winner = 0
  if (diff1 < diff2) winner = 1
  if (diff2 < diff1) winner = 2
  return winner
}

function resett() {
  p1.resett()
  p2.resett()
  fixH = random(360)
}