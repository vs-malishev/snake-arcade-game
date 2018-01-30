import options from '../constants/index';

import { incrementScore } from './calculateScore';
import { drawSegment, drawFood, eraseCell } from './drawElements';
import { gameLost } from '../app';

function _contains(segments, cell) {
    for (const segment of segments) {
        if (segment.x === cell.x && segment.y === cell.y) {
            return true;
        }
    }

    return false;
}

export default class Snake {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.directionX = 0;
        this.directionY = 0;
        this.segments = [{ x, y }];
        this.newSegmentCount = 0;
        this.updateFoodLocation();
    }
    turnRight() {
        this.directionX = 1;
        this.directionY = 0;
    }
    turnLeft() {
        this.directionX = -1;
        this.directionY = 0;
    }
    turnDown() {
        this.directionX = 0;
        this.directionY = 1;
    }
    turnUp() {
        this.directionX = 0;
        this.directionY = -1;
    }
    move() {
        this.x += this.directionX;
        this.y += this.directionY;

        if (this.x < 0 || this.x >= options.cols ||
            this.y < 0 || this.y >= options.rows) {
            gameLost();

            return;
        }
        const cell = {
            x: this.x,
            y: this.y
        };

        if (_contains(this.segments, cell)) {
            gameLost();

            return;
        }
        this.segments.push(cell);
        drawSegment(cell);

        if (_contains(this.segments, this.foodLocation)) {
            this.updateFoodLocation();
            incrementScore();
            this.newSegmentCount += options.segmentGrowth;
        }

        if (this.newSegmentCount === 0) {
            const last = this.segments.shift();
            eraseCell(last);
        } else {
            this.newSegmentCount -= options.segmentGrowth;
        }
    }

    updateFoodLocation() {
        const freeCellArray = [];
        const colLen = options.cols;
        const rowsLen = options.rows;

        for (let x = 0; x < colLen; x += 1) {
            for (let y = 0; y < rowsLen; y += 1) {
                const cell = { x, y };

                if (!_contains(this.segments, cell)) {
                    freeCellArray.push(cell);
                }
            }
        }

        const index = Math.floor(Math.random() * freeCellArray.length);

        this.foodLocation = freeCellArray[index];
        drawFood(this.foodLocation);
    }
}
