var cards = []
var lato = 3
var altezza = 2
var tema = 'casa'
var lastTag = 0

// caricare il suono ed immagine
function preload() {
  for (var x = 0; x < lato; x++) {
    cards[x] = []
    for (var y = 0; y < altezza; y++) {
      cards[x][y] = new Card((x * 100) + 55, (y * 100) + 100, x + '' + y + '.mp3')
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
  }
}

// disegno
function draw() {
  background(214, 255, 213)
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
        cards[x][y].col = color(0, 0, 255)
        var tag = cards[x][y].tag


        if (tag == lastTag) {
          for (var x = 0; x < lato; x++) {
            for (var y = 0; y < altezza; y++) {
              if (cards[x][y].tag == tag) {
                cards[x][y].isActive = false
              }
            }
          }
        } else {
          lastTag = cards[x][y].tag
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
function Card(x, y, soundfile) {

  this.dim = 80
  this.sample = loadSound('assets/' + tema + '/' + soundfile);
  this.col = color(255)
  this.tag = 0
  this.isActive = true
  

  this.disegna = function() {
    if (this.isActive) {
      stroke(0)
      strokeWeight(5)
      fill(this.col)
      rect(x, y, this.dim, this.dim)
    }
  }

  this.isInside = function(mx, my) {
    if (mx > x && mx < x + this.dim && my > y && my < y + this.dim) {
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