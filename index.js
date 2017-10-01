var CANVAS_WIDTH = 800
var CANVAS_HEIGHT = 800
var FPS = 6

var direction = 'up'

var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')

var snake = {
  head: new Node(20, 20),

  update: function () {
    this.checkCollisions()

    if (direction === 'up') {
      this.head.y = (this.head.y + 39) % 40
    } else if (direction === 'down') {
      this.head.y = (this.head.y + 1) % 40
    } else if (direction === 'left') {
      this.head.x = (this.head.x + 39) % 40
    } else {
      this.head.x = (this.head.x + 1) % 40
    }

    var curNode = this.head
    var tmpx1 = this.head.x
    var tmpy1 = this.head.y

    while (curNode.next != null) {
      var tmpx2 = curNode.x
      var tmpy2 = curNode.y
      curNode.x = tmpx1
      curNode.y = tmpy1
      tmpx1 = tmpx2
      tmpy1 = tmpy2
      curNode = curNode.next
    }
    if (curNode !== this.head) {
      curNode.x = tmpx1
      curNode.y = tmpy1
    }
  },

  checkCollisions: function () {
  },

  draw: function () {
    context.fillStyle = '#fff'
    var curNode = this.head.next
    while (curNode.next != null) {
      context.fillRect(curNode.x * 20, curNode.y * 20, 20, 20)
      curNode = curNode.next
    }
    context.fillRect(curNode.x * 20, curNode.y * 20, 20, 20)
  },

  append: function () {
    var curNode = this.head
    while (curNode.next != null) {
      curNode = curNode.next
    }
    var endNode = new Node(curNode.x, curNode.y)
    curNode.next = endNode
  }
}

function Node (x, y) {
  this.x = x
  this.y = y
  this.next = null
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
  if (key === 38 && direction !== 'down') {
    direction = 'up'
  // down: move down
  } else if (key === 40 && direction !== 'up') {
    direction = 'down'
  // left: move left
  } else if (key === 37 && direction !== 'right') {
    direction = 'left'
  // right: move right
  } else if (key === 39 && direction !== 'left') {
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

snake.append()
