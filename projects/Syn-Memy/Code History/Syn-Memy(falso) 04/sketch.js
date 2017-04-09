// variables

var temi = ["casa", "ambienti", "graphics"]
var indexTema = 1
var tema = temi[indexTema]

var cards = []
var lato = 3
var altezza = 2
var lastTag = 0
var lastID = 0
var a = 200
var b = 350
var diameter = 40
var bottone
// caricare il suono ed immagine
function preload() {
  for (var x = 0; x < lato; x++) {
    cards[x] = []
    for (var y = 0; y < altezza; y++) {
      cards[x][y] = new Card((x * 100) + 100, (y * 100) + 100, x + '' + y + '.mp3', x + '' + y + '.png')
    }
  }
}


// settings
function setup() {
  createCanvas(400, 400)

  if (tema == 'ambienti') {
    // tags ambienti assignment
    cards[0][0].tag = 1
    cards[2][1].tag = 1
    cards[2][0].tag = 2
    cards[1][1].tag = 2
    cards[0][1].tag = 3
    cards[1][0].tag = 3
  } else if (tema == 'casa') {
    // tags casa assignment
    cards[0][0].tag = 1
    cards[2][0].tag = 1
    cards[1][0].tag = 2
    cards[2][1].tag = 2
    cards[0][1].tag = 3
    cards[1][1].tag = 3
  } else if (tema == 'graphics') {
    // tags graphics assignment
    cards[0][0].tag = 1
    cards[0][1].tag = 1
    cards[2][0].tag = 2
    cards[1][0].tag = 2
    cards[1][1].tag = 3
    cards[2][1].tag = 3
  }

}

// disegno
function draw() {
  background(189, 226, 249)
  fill(255, 0, 0)
  noStroke()
  bottone = ellipse(a, b, diameter, diameter)
  for (var x = 0; x < lato; x++) {
    for (var y = 0; y < altezza; y++) {
      cards[x][y].disegna()
    }
  }
}



// cliccare su una carta
function mousePressed() {
  for (var x = 0; x < lato; x++) {
    for (var y = 0; y < altezza; y++) {
      if (cards[x][y].isInside(mouseX, mouseY)) {
        cards[x][y].play()
        cards[x][y].col = color(249, 235, 229)
        var tag = cards[x][y].tag
      
      //if (bottone.isInsideButton(mouseX, mouseY)) {
        //indexTema++
      //}

        if (tag == lastTag && x * 10 + y != lastID) {
          for (var x = 0; x < lato; x++) {
            for (var y = 0; y < altezza; y++) {
              if (cards[x][y].tag == tag) {
                cards[x][y].isImage = true
              }
            }
          }
        } else {
          lastTag = cards[x][y].tag
          lastID = x * 10 + y

        }
      }
    }
  }
}

// rilasciare una carta
function mouseReleased() {

  for (var x = 0; x < lato; x++) {
    for (var y = 0; y < altezza; y++) {
      if (cards[x][y].isInside(mouseX, mouseY)) {
        cards[x][y].col = color(255)
      }
    }
  }
}


// classe 
function Card(x, y, soundfile, picfile) {

  this.dim = 80
  this.sample = loadSound('assets/' + tema + '/' + soundfile);
  this.pic = loadImage('assets/' + tema + '/' + picfile);
  this.col = color(255)
  this.tag = 0
  this.isActive = true
  this.isImage = false

  this.disegna = function() {
    if (this.isActive) {
      if (this.isImage) {
        image(this.pic, x, y, this.dim, this.dim)
      } else {
        stroke(249, 235, 229)
        strokeWeight(1)
        fill(this.col)
        rectMode(CENTER)
        rect(x, y, this.dim, this.dim)
      }
    }
  }

  this.isInside = function(mx, my) {
    if (mx > x && mx < x + this.dim && my > y && my < y + this.dim) {
      return true
    } else {
      return false
    }
  }
    
 this.isInsideButton = function(rx, ry) {
    if (rx > a - diameter && rx < a + diameter && ry > b + diameter && ry < b + diameter) {
      return true
    } else {
      return false
    }
  }

  // funzione per il suono
  this.play = function() {
    if (this.isActive) {
      this.sample.play()
    }
  }
}

// tasto reset
function reset() {
  indexTema++
}