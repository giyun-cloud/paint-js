const canvas = document.getElementById('jsCanvas')
const colorBtns = document.querySelectorAll('li.color')

let paintingCan = false
const ctx = canvas.getContext('2d')

ctx.setStrokeColor('rgb(200,50,50)')
ctx.lineWidth = 2.5
canvas.width = 600
canvas.height = 600

console.log(ctx.strokeStyle)

function stopPainting() {
  paintingCan = false
}

function onMouseMove(event) {
  const { offsetX: x, offsetY: y } = event
  if (paintingCan) {
    ctx.lineTo(x, y)
    ctx.stroke()
  }
}

function onMouseDown() {
  paintingCan = true
  ctx.beginPath()
}

function onMouseUp() {
  stopPainting()
}

function changeColor(index) {}

function init() {
  canvas.addEventListener('mousemove', onMouseMove)
  canvas.addEventListener('mousedown', onMouseDown)
  canvas.addEventListener('mouseup', onMouseUp)
  canvas.addEventListener('mouseleave', stopPainting)
  for (let index = 0; index < colorBtns.length; index++) {
    colorBtns[index].addEventListener('click', () => {
      changeColor(index)
    })
  }
}
init()
