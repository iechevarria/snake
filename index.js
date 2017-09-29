var CANVAS_WIDTH = 800
var CANVAS_HEIGHT = 800
var FPS = 6

var direction = 'up'

var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')

var snake = {
  x: 20,
  y: 20,

  update: function () {
    if (direction === 'up') {
      this.y = (this.y + 39) % 40
    } else if (direction === 'down') {
      this.y = (this.y + 1) % 40
    } else if (direction === 'left') {
      this.x = (this.x + 39) % 40
    } else {
      this.x = (this.x + 1) % 40
    }
  },

  draw: function () {
    context.fillStyle = '#fff'
    context.fillRect(this.x * 20, this.y * 20, 20, 20)
  }
}

function draw () {
  context.beginPath()
  context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  snake.draw()
}

function update () {
  snake.update()
}

window.onkeydown = function (e) {
  var key = e.keyCode ? e.keyCode : e.which
  // up: move up
  if (key === 38) {
    direction = 'up'
  // down: move down
  } else if (key === 40) {
    direction = 'down'
  // left: move left
  } else if (key === 37) {
    direction = 'left'
  // right: move right
  } else if (key === 39) {
    direction = 'right'
  }
}

// main loop
setInterval(function () {
  update()
  draw()
}, 1000 / FPS)
