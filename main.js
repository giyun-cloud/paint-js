const canvas = document.getElementById('jsCanvas')
const colorBtns = document.querySelectorAll('li.color')
const range = document.getElementById('jsRange')
const modeBtn = document.getElementById('jsMode')
const saveBtn = document.getElementById('jsSave')

//COMMON
const canvasSize = 600
const colorInitial = '#2c2c2c'
const lineWidthInitial = range.value

let paintingCan = false
let changedMode = false
canvas.width = canvasSize
canvas.height = canvasSize

const ctx = canvas.getContext('2d')

ctx.lineWidth = lineWidthInitial
ctx.strokeStyle = colorInitial
ctx.fillStyle = colorInitial

function stopPainting() {
  paintingCan = false
}

function onMouseMove(event) {
  const { offsetX: x, offsetY: y } = event
  if (paintingCan && !changedMode) {
    ctx.lineTo(x, y)
    ctx.stroke()
  }
}

function onMouseDown() {
  paintingCan = true
  ctx.beginPath()
  if (changedMode) {
    ctx.fillStyle === ctx.strokeStyle || (ctx.fillStyle = ctx.strokeStyle)
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }
}

function onMouseUp() {
  stopPainting()
}

function onContextMenu(event) {
  event.preventDefault()
}

function changeColor(e) {
  ctx.strokeStyle = getComputedStyle(e.target).backgroundColor
}

function changeLineWidth(e) {
  ctx.lineWidth = e.target.value
}

function changeModeFunc() {
  // changedMode 변수와 헷갈리지않게 Func추가함
  if (changedMode) {
    changedMode = false
    modeBtn.innerText = 'fill'
  } else {
    changedMode = true
    modeBtn.innerText = 'paint'
  }
}

function onSaveBtn() {
  const link = document.createElement('a')
  link.href = canvas.toDataURL()
  link.download = 'paintJs'
  link.click()
}

function init() {
  //canvas 초기 배경색 설정  안하면 투명색으로됨
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  canvas.addEventListener('mousemove', onMouseMove)
  canvas.addEventListener('mousedown', onMouseDown)
  canvas.addEventListener('mouseup', onMouseUp)
  canvas.addEventListener('mouseleave', stopPainting)
  // 위4개는 모두 canvas에서 첫번째 인자의 상태일때만 호출된다. 고로 canvas안에서만 일어남.
  canvas.addEventListener('contextmenu', onContextMenu)

  colorBtns.forEach((colorBtn, index) => {
    colorBtn.addEventListener('click', changeColor)
  })

  range.addEventListener('input', changeLineWidth)

  modeBtn.addEventListener('click', changeModeFunc)

  saveBtn.addEventListener('click', onSaveBtn)
}
init()
