/* jshint -W033*/

// matlo
console.log('%cまてろ', 'color: #black; font-family: "Roboto Mono", monospace; font-size:42px')
console.log('%cmatlo.me', 'color: #black; font-family: "Roboto Mono", monospace; font-size:18px')

// play videos on click
// $('video').each(function(){
//     $(this).on('click touch', function () {
//         $(this).attr("controls", "true")
//         $(this)[0].play()
//     })
// });

$(document).ready(function(){
    $('video').on('click touchstart', function() {
        $(this)[0].play()
        $(this).attr("controls", "true")
    });
});

// p5js background sketch
var siz = 500
var rosso,giallo,blu

var t,c,q

function setup() {
    var myCanvas = createCanvas(window.innerWidth, window.innerHeight);
    myCanvas.parent('p5');

    rectMode(CENTER)
    noStroke()
    siz = 500
    if(width < 600) siz = 300

    blu = color(50, 80, 255)
    giallo = color(255, 240, 70)
    rosso = color(255, 60, 70)


    c = new Shape(random(width), random(height), 1)
    q = new Shape(random(width), random(height), 2)
    t = new Shape(random(width), random(height), 3)
}

function draw() {
    background(255)
    // fill(255,90);
    // rect(width/2, height/2, width, height);


    c.update()
    q.update()
    t.update()
    c.draw()
    q.draw()
    t.draw()
}

function Shape(_x, _y, type) {

    this.x = _x
    this.y = _y
    this.dx = _x
	  this.dy = _y
    this.damp = 0.1

    this.update = function() {

		this.x += (this.dx - this.x) * this.damp
		this.y += (this.dy - this.y) * this.damp

		if(dist(this.x, this.y, this.dx, this.dy) < 1) {
			this.x = this.dx
			this.y = this.dy
		}

		if(this.isInside(mouseX,mouseY)) {
			this.flyAwayFrom(mouseX, mouseY)
		}

	}

    this.draw = function() {
        push()
        translate(this.x, this.y)

        // circle
        if (type == 1) {
            fill(blu)
            ellipse(0,0,siz,siz)
        }

        // square
        if (type == 2) {
            fill(rosso)
            rect(0,0,siz,siz)
        }

        // triangle
        if (type == 3) {
            fill(giallo)
            rotate(radians(-90))
            let hs = siz/2
            triangle(0,-hs,-hs,hs,hs,hs)
        }
        pop()
    }

    this.isInside = function(xx, yy) {
		var d = dist(this.x, this.y, xx, yy)
		if(d < siz*0.5) {
			return true
		} else {
			return false
		}
	}

	this.flyAwayFrom = function(xx,yy) {
		var d = dist(this.x, this.y, xx, yy)
		this.dx += (this.x - xx) / d * siz * .007
		this.dy += (this.y - yy) / d * siz * .007
	}

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
