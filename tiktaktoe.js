const AI = 'o';
const HUMAN = 'x';
const empty = '_';
var dificulty = 1;
var startsym = HUMAN;

const cellElements = document.querySelectorAll('[data-cell]');
const Gameboard = document.getElementById('board');
const winningMessageElement = document.getElementById('winning-message');
const restartButton = document.getElementById('restart-button');
const winningMessageTextElement = document.getElementById('data-winning-message-text');
const settingButtons = document.querySelectorAll('button');
console.log(settingButtons);

class Game {
    constructor(c) {
        this.board = new Array();
        this.currentClass = c;
        this.isFinished = 0;
        this.moves = 0;
        for (let i = 0; i < 9; i++) {
            this.board.push(empty);
        }
        Gameboard.classList.remove('x');
        Gameboard.classList.remove('o');
        Gameboard.classList.add(c);
    }

    swapTurns() {
        if (this.currentClass == 'x') {
            this.currentClass = 'o';
            Gameboard.classList.remove('x');
            Gameboard.classList.add('o');
        } else {
            this.currentClass = 'x';
            Gameboard.classList.remove('o');
            Gameboard.classList.add('x');
        }
    }

    placeMark(p) {
        if (this.board[p] == empty && !this.isFinished) {
            this.board[p] = this.currentClass;
            this.moves += 1;
            return 1;
        }
        return 0;
    }

    draw() {
        for (let i in this.board) {
            let cell = document.getElementById(i);
            cell.classList.remove('x');
            cell.classList.remove('o');
            cell.classList.add(this.getMark(i));

        }
    }

    checkWin() {
        if (this.isWinningCombination(0, 1, 2)  // check for 3-in-a-row horizontally
            || this.isWinningCombination(3, 4, 5)
            || this.isWinningCombination(6, 7, 8)
            || this.isWinningCombination(0, 3, 6)  // check for 3-in-a-row vertically
            || this.isWinningCombination(1, 4, 7)
            || this.isWinningCombination(2, 5, 8)
            || this.isWinningCombination(0, 4, 8)  // check for 3-in-a-row diagonally
            || this.isWinningCombination(6, 4, 2)) {
            this.isFinished = 1;
            return 1;
        }
        return 0;
    }

    isWinningCombination(p1, p2, p3) {
        let c1 = this.board[p1];
        if (c1 == empty)
            return 0;
        let c2 = this.board[p2];
        if (c1 != c2)
            return 0;
        let c3 = this.board[p3];
        if (c1 != c3)
            return 0;
        this.currentClass = c1;
        return 1;
    }

    isDraw() {
        if (this.board.every(mark => { return mark != empty })) {
            this.isFinished = 1;
            return 1;
        }
        return 0;
    }

    getMark(p) {
        if (this.board[p] != empty) {
            return this.board[p];
        }
    }

    getMove() {
        return this.moves;
    }

    clone() {
        let clone = new Game();
        clone.board = this.board;
        clone.currentClass = this.currentClass;
        clone.isFinished = this.isFinished;
        clone.moves = this.moves;
        return clone;
    }
}

var mainGame

// other functions
function setRandomMove(game) {
    console.log("setRandomMove", game.currentClass);
    if (game.isDraw()) {
        return 1;
    }
    while (true) {
        let i = Math.floor(Math.random() * 10000) % 9;
        if (game.board[i] == empty) {
            game.placeMark(i);
            break;
        }
    }
}

function setBestMove(game) {
    console.log("setBestMove:", game.currentClass);
    let bestScore = -Infinity;
    let bestMove;
    let score;
    for (let i = 0; i < 9; i++) {
        if (game.board[i] == empty) {
            let next = game.clone();
            next.placeMark(i);
            next.draw()
            next.swapTurns();
            score = minimax(next, 0);
            game.board[i] = empty;
            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }
    game.placeMark(bestMove);
}

function minimax(game, depht) {
    let score = 0;
    let bestScore;

    if (game.checkWin() && game.currentClass == HUMAN) {
        return -1;
    } else if (game.checkWin() && game.currentClass == AI) {
        return 1;
    } else if (game.isDraw()) {
        return 0;
    }

    if (game.currentClass == AI) {
        bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (game.board[i] == empty) {
                let next = game.clone();
                next.placeMark(i);
                next.swapTurns();
                score = minimax(next, depht + 1);
                game.board[i] = empty;
                bestScore = Math.max(score, bestScore)
            }
        }
        // console.log("AI:", depht, game.board, bestScore);
    } else {
        bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (game.board[i] == empty) {
                let next = game.clone();
                next.placeMark(i);
                next.swapTurns();
                score = minimax(next, depht + 1);
                game.board[i] = empty;
                bestScore = Math.min(score, bestScore);
            }
        }
        // console.log("HM:", depht, game.board, bestScore);
    }
    return bestScore;
}


function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!';
    } else {
        winningMessageTextElement.innerText = `${mainGame.currentClass == 'o' ? "O's" : "X's"} Wins!`;
        if (mainGame.currentClass == 'o') {
            winningMessageElement.classList.add('o');
        }
        else {
            winningMessageElement.classList.add('x');
        }
    }
    winningMessageElement.classList.add('show');
}


// main functions
function setDificulty(btn) {
    settingButtons.forEach(button => {
        button.classList.remove("active");
    })
    btn.classList.add("active");
    if (btn.innerText == "Duo") {
        dificulty = 0;
        startGame()
    } else if (btn.innerText == "Easy") {
        dificulty = 1;
        update();
    } else if (btn.innerText == "Hard") {
        dificulty = 2;
        update();
    } else if (btn.innerText == "Unbeatable") {
        dificulty = 3;
        update();
    }
    console.log(btn.innerText);
}

function handleClick(cell) {
    console.log("handleClick:", mainGame.currentClass, cell);
    if (mainGame.placeMark(cell)) {
        mainGame.swapTurns();
    }
    if (mainGame.checkWin()) {
        endGame(false);
    } else if (mainGame.isDraw()) {
        endGame(true);
    }
    mainGame.draw();
    update();
}

function update() {
    console.log("update:", mainGame.currentClass);
    if (mainGame.currentClass == AI) {
        if (dificulty == 1) {
            setRandomMove(mainGame);
        } else if (dificulty == 2) {
            if(mainGame.getMove() <= 2) {
                setRandomMove(mainGame)
            } else {
                setBestMove(mainGame);
            }
        } else if (dificulty == 3) {
            setBestMove(mainGame);
        }
        if(dificulty)
            mainGame.swapTurns();
    }
    if (mainGame.checkWin()) {
        endGame(false);
    } else if (mainGame.isDraw()) {
        endGame(true);
    }
    mainGame.draw();
}

function startGame() {
    console.log("startsym:", startsym);
    mainGame = new Game(startsym);
    if (startsym === 'x') {
        startsym = 'o';
    } else {
        startsym = 'x';
    }

    cellElements.forEach(cell => {
        cell.classList.remove('x');
        cell.classList.remove('o');
    })
    winningMessageElement.classList.remove('show');
    winningMessageElement.classList.remove('x');
    winningMessageElement.classList.remove('o');

    update()
}


startGame();

