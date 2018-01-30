import Snake from './components/snakeClass';
import options from './constants/index';

import { resetScore } from './components/calculateScore';
import { resetCanvas } from './components/drawElements';

let timeout;

function gameInit() {
    resetCanvas();

    const snake = new Snake(options.startX, options.startY);

    snake[options.startDirection]();
    resetScore();

    function _nextFrame() {
        clearTimeout(timeout);
        timeout = setTimeout(_nextFrame, options.timeInterval);
        snake.moveSnake();
    }
    _nextFrame();

    window.onkeydown = (e) => {
        const keyMethods = {
            37: 'turnLeft',
            38: 'turnUp',
            39: 'turnRight',
            40: 'turnDown'
        };
        const method = keyMethods[e.keyCode];

        if (method) {
            snake[method]();
            _nextFrame();
        }
    };
}

gameInit();

function resetGame() {
    clearTimeout(timeout);
    gameInit();
}

function gameLost() {
    //  output `Game lost. Score ${finalScore}.`
    resetGame();
}

function gameWon() {
    // output "Congratulations!"
    resetGame();
}

export { gameLost, gameWon };
