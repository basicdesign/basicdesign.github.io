//var dim = 100 var vel = 5 var minimo = 1000

var immagini = []
var img
var index
var song01, song02
var play = true
var myFont

function preload() {
  for (var i = 0; i < 4; i++) {
    immagini[i] = loadImage("assets/" + i + ".png")
    song01 = loadSound('assets/giusto.mp3')
    song02 = loadSound('assets/errore.mp3')
    myFont = loadFont('assets/Summer Font Light.otf')
  }
}

function setup() {
  createCanvas(1280, 762)
  imageMode(CENTER)
  randomImage()
  fill(255)
  textFont(myFont);
  textStyle(BOLD)
  textSize(200)
}

function draw() {
  if (play) {
    image(img, 550, 255)
  } else {
    background(175, 238, 238)
    text("HAI VINTO", (width/2)-200, height/2)
    
      
  }
}

function randomImage() {
  //indice random compreso nella lunghezza della lista
  index = int(random(immagini.length))
  img = immagini[index]
}

function keyPressed() {
  
  if (play == false) {
    play = true
  } 
  
  // mela
  if (keyCode == LEFT_ARROW) {
    checkFruit(0)
  }

  //pomodoro
  if (keyCode == UP_ARROW) {
    checkFruit(1)

  } 

  //arancia
  if (keyCode == DOWN_ARROW) {
    checkFruit(2)
 }

  //fragola
  if (keyCode == RIGHT_ARROW) {
    checkFruit(3)
    
  } 
}

function checkFruit(ind) {
  if (index == ind) {
    play = false
    song01.play()
    randomImage()
  }else{
     song02.play()
  }
}