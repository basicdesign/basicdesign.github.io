// ----------- CONTROL PANEL ------------ //

var angl_quant = 10
var angl_pos_speed = 1
var angl_neg_speed = 2
var angl_minim = 0
var angl_booln = false

var size_quant = 101
var size_pos_speed = 1.5
var size_neg_speed = 3
var size_minim = 100
var size_booln = false

var shape_nmbr = 3
var shape_angle = 120
var shape_angles = [120, 90, 60, 30]

// Color
var hue_shape = 100
var hue_shape_increase = 1

var hue_backg = 280
var hue_backg_increase = 1

var sat = 360
var lum = 360

// Music
var notes = [440, 495.0, 556.87, 586.67, 660.0, 742.5, 835.31, 880]

var osc_1
var osc_3
var osc_5
var osc_8

var note_1
var note_3
var note_5
var note_8

var vol = 5

var sample

// ---------------  SETUP --------------- //

function setup() {
  createCanvas(window.innerWidth, window.innerHeight)
  rectMode(CENTER)
  noStroke()
  colorMode(HSB, 360)

  hue_val = 100

  osc_1 = new p5.Oscillator([440        ], ['saw'])
  osc_3 = new p5.Oscillator([440 * 5 / 4], ['saw'])
  osc_5 = new p5.Oscillator([440 * 3 / 2], ['saw'])
  osc_8 = new p5.Oscillator([440 * 2    ], ['saw'])

  soundFormats('wav')
  sample = loadSound('assets/jamblock.wav')
}




// ------ FUNCTIONS AND PROCEDURES ------ //

function rotateOnPress() {
  if (keyIsDown(RIGHT_ARROW)) {
    angl_booln = true
  } else {
    angl_booln = false
  }

  if (angl_booln === true) {
    angl_quant += angl_pos_speed
  } else {
    if (angl_quant > angl_minim) {
      angl_quant -= angl_neg_speed
    }
  }
}


function scaleOnPress() {
  if (keyIsDown(LEFT_ARROW)) {
    size_booln = true
  } else {
    size_booln = false
  }

  if (size_booln === true) {
    size_quant += size_pos_speed
  } else {
    if (size_quant > size_minim) {
      size_quant -= size_neg_speed
    }
  }
}

function colorsOnPress() {
  if (keyIsDown(DOWN_ARROW)) {
    hue_shape = hue_shape + hue_shape_increase
  }
  if (keyIsDown(UP_ARROW)) {
    hue_backg = hue_backg + hue_backg_increase
  }
}


// an index to chose the shape from the list
var shape_nmbr = 0

// a function to create regular polygons (from p5.js documentation)
function polygon(x, y, radius, npoints) {

  var angle = TWO_PI / npoints;
  beginShape();

  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius;
    var sy = y + sin(a) * radius;
    vertex(sx, sy);
  }

  endShape(CLOSE);
}


// a function that draws the called shape
function draw_shape(shape_nmbr) {

  if (shape_nmbr % 4 === 0) {
    polygon(0, 0, size_quant * 0.7, 3)
  } else if (shape_nmbr % 4 == 1) {
    rect(0, 0, size_quant, size_quant)
  } else if (shape_nmbr % 4 == 2) {
    polygon(0, 0, size_quant * 0.6, 6)
  } else if (shape_nmbr % 4 == 3) {
    ellipse(0, 0, size_quant * 1.1, size_quant * 1.1)
  }
}

function mousePressed() {
  shape_nmbr = shape_nmbr + 1
  shape_angle = shape_angles[shape_nmbr % 4]

  note_1 = notes[Math.floor(Math.random() * notes.length)]
  
  osc_1.freq(note_1 * 1/1)
  osc_3.freq(note_1 * 4/5)
  osc_5.freq(note_5 * 3/2)
  osc_8.freq(note_8 * 2/1)

  sample.play()
}


function keyPressed() {

  if (keyCode == LEFT_ARROW) {
    osc_1.amp(vol)
    osc_1.start()
  }

  if (keyCode == UP_ARROW) {
    osc_3.amp(vol)
    osc_3.start()
  }

  if (keyCode == RIGHT_ARROW) {
    osc_5.amp(vol)
    osc_5.start()
  }

  if (keyCode == DOWN_ARROW) {
    osc_8.amp(vol)
    osc_8.start()
  }
}


function keyReleased() {
  if (keyCode == LEFT_ARROW) {
    osc_1.stop()
  }
  if (keyCode == UP_ARROW) {
    osc_3.stop()
  }
  if (keyCode == RIGHT_ARROW) {
    osc_5.stop()
  }
  if (keyCode == DOWN_ARROW) {
    osc_8.stop()
  }
}




// --------------- DRAWING -------------- //

function draw() {

  colorsOnPress()

  // context
  background(hue_backg % 360, sat, lum)
  translate(width / 2, height / 2)

  // transform
  if (angl_quant % shape_angle == 0 && size_quant == size_minim) {
    angl_quant = 0
  } else {
  }
  rotate(radians(angl_quant))
  scaleOnPress()
  rotateOnPress()

  // color
  fill(hue_shape % 360, sat, lum)

  // drawing
  draw_shape(shape_nmbr)

}