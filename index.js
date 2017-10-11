var CANVAS_WIDTH = 800
var CANVAS_HEIGHT = 800
var FPS = 6

var direction = 'up'

var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')

var snake = {
  head: new Node(20, 20),
  collided: false,

  update: function () {
    var tmpx1 = this.head.x
    var tmpy1 = this.head.y

    if (direction === 'up') {
      this.head.y = (this.head.y + 39) % 40
    } else if (direction === 'down') {
      this.head.y = (this.head.y + 1) % 40
    } else if (direction === 'left') {
      this.head.x = (this.head.x + 39) % 40
    } else {
      this.head.x = (this.head.x + 1) % 40
    }

    if (this.head.next !== null) {
      var curNode = this.head.next
      while (curNode.next != null) {
        var tmpx2 = curNode.x
        var tmpy2 = curNode.y
        curNode.x = tmpx1
        curNode.y = tmpy1
        tmpx1 = tmpx2
        tmpy1 = tmpy2
        curNode = curNode.next
      }
      curNode.x = tmpx1
      curNode.y = tmpy1

      this.collided = this.hasCollided()
    }
  },

  // TODO: write this
  hasCollided: function () {
    var curNode = this.head
    while (curNode.next !== null) {
      curNode = curNode.next
      if (curNode.x === this.head.x && curNode.y === this.head.y) {
        return true
      }
    }
    return false
  },

  draw: function () {
    context.fillStyle = '#fff'
    var curNode = this.head
    while (curNode.next != null) {
      context.fillRect(curNode.x * 20, curNode.y * 20, 20, 20)
      curNode = curNode.next
    }
    context.fillRect(curNode.x * 20, curNode.y * 20, 20, 20)

    if (this.collided) {
      context.fillStyle = '#f00'
      context.fillRect(100, 100, 100, 100, 100)
    }
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

// TODO: randomly dropped food
var food = {
  eaten: false,

  update: function () {
    
  },

  draw: function () {
    context.fillStyle = '#0f0'
    context.fillRect(this.x, this.y)
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
