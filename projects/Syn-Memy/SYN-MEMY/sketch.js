                                                   //       SYN-MEMY        //


// PROGETTO DI:  Colorito Michela, Gabellini Mattia, Sanson Francesca


// variables
var temi = ["casa", "ambienti", "graphics"]
var indice = 0
tema = temi[indice]
//tempo in millisecondi tra un livello e l'altro
var millisecondi = 2000

var cards = []
var lato = 3
var altezza = 2
var lastTag = 0
var lastID = 0
var levelCounter = 0
var isLoading = false

// caricare il suono ed immagine
function preload() {
  for (var x = 0; x < lato; x++) {
    cards[x] = []
    for (var y = 0; y < altezza; y++) {
      cards[x][y] = new Card((x * 350) + 180, (y * 350) + 130, x + '' + y + '.mp3', x + '' + y + '.png')
    }
  }
}

// settings
function setup() {
  createCanvas(1280, 800)
  updateTema()
}

// disegno
function draw() {
  background(189, 226, 249)
  for (var x = 0; x < lato; x++) {
    for (var y = 0; y < altezza; y++) {
      cards[x][y].disegna()
    }
  }

  if (isLoading) {
      fill(255)
      textSize(80)
      textFont("Baskerville")
      text("loading...", 400, 300)
    }

    if (levelCounter == 6) {
      levelCounter = 0
      indice++
      indice = indice % 3

      window.setTimeout(function() {
        updateTema()
        isLoading = true
        for (var x = 0; x < lato; x++) {
          for (var y = 0; y < altezza; y++) {
            cards[x][y].isActive = false
          }
        }
      }, millisecondi)

      window.setTimeout(function() {
        isLoading = false
        for (var x = 0; x < lato; x++) {
          for (var y = 0; y < altezza; y++) {
            cards[x][y].isActive = true
          }
        }
      }, millisecondi * 2)
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


          if (tag == lastTag && x * 10 + y != lastID) {
            for (var x = 0; x < lato; x++) {
              for (var y = 0; y < altezza; y++) {
                if (cards[x][y].tag == tag) {
                  cards[x][y].isImage = true
                  levelCounter++
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

  function updateTema() {
    tema = temi[indice]
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
    for (var x = 0; x < lato; x++) {
      for (var y = 0; y < altezza; y++) {
        cards[x][y].loadAssets()
        cards[x][y].isImage = false
      }
    }
  }

  // classe 
  function Card(x, y, soundfile, picfile) {

    this.dim = 200
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

    // funzione per il suono
    this.play = function() {
      if (this.isActive) {
        this.sample.play()
      }
    }

    this.loadAssets = function() {
      this.sample = loadSound('assets/' + tema + '/' + soundfile);
      this.pic = loadImage('assets/' + tema + '/' + picfile);
    }

  }