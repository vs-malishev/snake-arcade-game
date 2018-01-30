
const scoreContainer = document.getElementById('scoreContainer');
let score = 0;

function _setScore() {
    scoreContainer.innerText = score;
}

function incrementScore() {
    score += 1;
    _setScore();
}

function resetScore() {
    score = 0;
    _setScore();
}

function getScore() {
    return score;
}

export { incrementScore, resetScore, getScore };

