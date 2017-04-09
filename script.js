/* jshint -W033*/

// play videos on click
$('video').click(function(){
    $(this)[0].play()
    $(this).attr("controls", "true")
})

// p5js background sketch
var siz = 500
var rosso,giallo,blu

var t,c,q

function setup() {
    var myCanvas = createCanvas(window.innerWidth, window.innerHeight);
    myCanvas.parent('p5');

    rectMode(CENTER)
    noStroke()

    blu = color(66, 133, 244)
    giallo = color(251, 188, 5)
    rosso = color(234, 67, 53)

    t = new Shape(random(width), random(height), 3)
    c = new Shape(random(width), random(height), 1)
    q = new Shape(random(width), random(height), 2)
}

function draw() {
    background(255)

    t.update()
    c.update()
    q.update()
    t.draw()
    c.draw()
    q.draw()
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
		this.dx += (this.x - xx) / d * siz * .01
		this.dy += (this.y - yy) / d * siz * .01
	}

}



// matter js
// let Engine = Matter.Engine,
//     Render = Matter.Render,
//     World = Matter.World,
//     Mouse = Matter.Mouse,
//     Bodies = Matter.Bodies,
//     Common = Matter.Common,
//     Vertices = Matter.Vertices,
//     Svg = Matter.Svg,
//     Constraint = Matter.Constraint,
//     Composites = Matter.Composites,
//     MouseConstraint = Matter.MouseConstraint;
//
//   // create an engine
//   let engine = Engine.create();
//   let idRAF = null;
// function init(){
//   let numm = Math.random();
//   $("canvas").remove();
//
//   cancelAnimationFrame(idRAF);
//   let width = $(window).width();
//   let height = $(window).height();
//   let offset = -1;
//     // module aliases
//
//   engine.events = {};
//   World.clear(engine.world);
//   Engine.clear(engine);
//
//   engine = Engine.create();
//
//   engine.world.gravity.x = 0;
//   engine.world.gravity.y = 0;
//   let mouseConstraint = MouseConstraint.create(engine);
//   var mouse = mouseConstraint.mouse;
//   mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
//   mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);
//   World.add(engine.world, mouseConstraint);
//
//   // create a renderer
//   let render = Render.create({
//     element: document.body,
//     engine: engine,
//     options: {
//       wireframes: false,
//       background: 'transparent',
//       width: width,
//       height: height,
//       showDebug: false,
//       showBroadphase: false,
//       showBounds: false,
//       showVelocity: false,
//       showCollisions: false,
//       showSeparations: false,
//       showAxes: false,
//       showPositions: false,
//       showAngleIndicator: false,
//       showIds: false,
//       showShadows: false,
//       showVertexNumbers: false,
//       showConvexHulls: false,
//       showInternalEdges: false,
//       showMousePosition: false
//     }
//   });
//
//   // create two boxes and a ground
//   // add all of the bodies to the world
//   World.add(engine.world, [
//     // Bodies.rectangle(width / 2, height / 2, 500, 46, {
//     //   isStatic: true,
//     //   render: {
//     //     fillStyle: "transparent"
//     //   }
//     // }),
//
//     // Bodies.rectangle(width / 2, (height / 2) - 40, 180, 20, {
//     //   isStatic: true,
//     //   render: {
//     //     fillStyle: "transparent"
//     //   }
//     // }),
//     // Bodies.rectangle(width / 2, (height / 2) + 40, 180, 20, {
//     //   isStatic: true,
//     //   render: {
//     //     fillStyle: "transparent"
//     //   }
//     // }),
//     // bottom
//     Bodies.rectangle(width / 2, height - offset, width, 1, {
//       isStatic: true,
//       render: {
//         fillStyle: "#FFFFFF"
//       }
//     }),
//     //top
//     Bodies.rectangle(width / 2, offset, width, 1, {
//       isStatic: true,
//       render: {
//         fillStyle: "#FFFFFF"
//       }
//     }),
//     // left
//     Bodies.rectangle(offset, height / 2, 1, height, {
//       isStatic: true,
//       render: {
//         fillStyle: "#FFFFFF"
//       }
//     }),
//     // right
//     Bodies.rectangle(width - offset, height / 2, 1, height, {
//       isStatic: true,
//       render: {
//         fillStyle: "#FFFFFF"
//       }
//     })
//   ]);
//
//   for (let i = 0; i < 10; i++) {
//     let radius = 20 + Math.random() * 20
//     World.add(engine.world, Bodies.circle(
//       40 + Math.random() * width - 80,
//       40 + Math.random() * 100,
//       radius, {
//         render: {
//           fillStyle: ["#4285F4", "#EA4335", "#FBBC05", "#34A853"][Math.round(Math.random() * 3)]
//         }
//
//       }
//     ))
//   }
//
//
//   // run the engine
//   Engine.run(engine);
//
//   // run the renderer
//   Render.run(render);
//
//   let inc = 0
//
//   // engine.world.gravity.y = 4
//   // function update() {
//   //   if(inc > 8){
//   //     engine.world.gravity.x = Math.cos(inc / 55)
//   //     engine.world.gravity.y = Math.sin(inc / 55)
//   //   }
//   //   inc++
//   //   idRAF = requestAnimationFrame(update.bind(this))
//   // }
//
//   update()
// }
// init()
//
// function debounce(func, wait, immediate) {
// 	var timeout;
// 	return function() {
// 		var context = this, args = arguments;
// 		var later = function() {
// 			timeout = null;
// 			if (!immediate) func.apply(context, args);
// 		};
// 		var callNow = immediate && !timeout;
// 		clearTimeout(timeout);
// 		timeout = setTimeout(later, wait);
// 		if (callNow) func.apply(context, args);
// 	};
// };
//
//
// $(window).on("resize", debounce(function(){
//   init()
// }.bind(this), 200))
