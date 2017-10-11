var CANVAS_WIDTH = 800
var CANVAS_HEIGHT = 800
var FPS = 6

var direction = 'up'

var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')

function Node (x, y) {
  this.x = x
  this.y = y
  this.next = null
}

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
    }

    this.collided = this.hasCollided()
    this.hasEaten()
  },

  append: function () {
    var curNode = this.head
    while (curNode.next != null) {
      curNode = curNode.next
    }
    var endNode = new Node(curNode.x, curNode.y)
    curNode.next = endNode
  },

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

  // sloppy, can add fruit under head
  hasEaten: function () {
    if (this.head.x === food.x && this.head.y === food.y) {
      this.append()
      scoreboard.addPoint()
      var newX = Math.floor(Math.random() * 40)
      var newY = Math.floor(Math.random() * 40)
      var curNode = this.head
      while (curNode.next !== null) {
        if (curNode.x === newX && curNode.y === newY) {
          curNode = this.head
          newX = Math.floor(Math.random() * 40)
          newY = Math.floor(Math.random() * 40)
        }
        curNode = curNode.next
      }
      food.setLocation(newX, newY)
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

    if (this.collided) {
      context.fillStyle = '#f00'
      context.fillRect(100, 100, 100, 100, 100)
    }
  }
}

var scoreboard = {
  points: 0,

  reset: function () {
    this.points = 0
  },

  addPoint: function () {
    this.points ++
  },

  draw: function () {

  }
}

// TODO: randomly dropped food
var food = {
  x: 10,
  y: 10,

  getX: function () {
    return this.x
  },

  getY: function () {
    return this.y
  },

  setLocation: function (x, y) {
    this.x = x
    this.y = y
  },

  draw: function () {
    context.fillStyle = '#0f0'
    context.fillRect(this.x * 20, this.y * 20, 20, 20)
  }
}

function draw () {
  context.beginPath()
  context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  snake.draw()
  food.draw()
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
