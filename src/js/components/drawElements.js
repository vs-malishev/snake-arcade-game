import options from '../constants/index';

const canvas = document.getElementById('snakeGameCanvas');
const context = canvas.getContext('2d');

canvas.width = options.width;
canvas.height = options.height;

function _drawElement(cell, color = options.backgroundColor) {
    const width = options.width / options.cols;
    const height = options.height / options.rows;
    const x = cell.x * width;
    const y = cell.y * height;

    context.fillStyle = color;
    context.fillRect(x, y, width, height);
}

function drawSegment(cell) {
    _drawElement(cell, options.snakeColor);
}

function drawFood(cell) {
    _drawElement(cell, options.foodColor);
}

function eraseCell(cell) {
    _drawElement(cell);
}

function resetCanvas() {
    context.clearRect(0, 0, options.width, options.height);
}

export { drawSegment, drawFood, eraseCell, resetCanvas };
