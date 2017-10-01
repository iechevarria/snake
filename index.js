var CANVAS_WIDTH = 800
var CANVAS_HEIGHT = 800
var FPS = 6

var direction = 'up'

var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')

var snake = {
  tail: new Node(20, 19, null),
  head: new Node(20, 20, this.tail),

  update: function () {
    if (direction === 'up') {
      this.head.y = (this.head.y + 39) % 40
    } else if (direction === 'down') {
      this.head.y = (this.head.y + 1) % 40
    } else if (direction === 'left') {
      this.head.x = (this.head.x + 39) % 40
    } else {
      this.head.x = (this.head.x + 1) % 40
    }
  },

  draw: function () {
    context.fillStyle = '#fff'
    var curNode = this.head
    while (curNode.next != null) {
      context.fillRect(curNode.x * 20, curNode.y * 20, 20, 20)
      curNode = curNode.next
    }
    context.fillRect(curNode.x * 20, curNode.y * 20, 20, 20)
  },

  append: function () {
    this.curNode = this.head
    while (this.curNode.next != null) {
      this.curNode = this.curNode.next
    }
    this.endNode = new Node(this.curNode.x, this.curNode.y)
    this.curNode.next = this.endNode
  }
}

function Node (x, y, next) {
  this.x = x
  this.y = y
  this.next = next
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
  } else if (key === 65) {
    snake.append()
  }
}

// main loop
setInterval(function () {
  update()
  draw()
}, 1000 / FPS)
