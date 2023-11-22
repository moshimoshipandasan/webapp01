document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('#tetris-board');
    let squares = Array.from(grid.querySelectorAll('div'));
    const scoreDisplay = document.querySelector('#score span');
    const startBtn = document.querySelector('#start-button');
    const width = 10;
    let nextRandom = 0;
    let timerId;
    let score = 0;
    const colors = [
        'orange', 'red', 'purple', 'green', 'blue'
    ];

    // テトリミノの形
    const lTetromino = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]
    ];

    const zTetromino = [
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1],
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1]
    ];

    const tTetromino = [
        [1,width,width+1,width+2],
        [1,width+1,width+2,width*2+1],
        [width,width+1,width+2,width*2+1],
        [1,width,width+1,width*2+1]
    ];

    const oTetromino = [
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1]
    ];

    const iTetromino = [
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3],
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3]
    ];

    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];

    let currentPosition = 4;
    let currentRotation = 0;

    // ランダムにテトリミノを選択し、最初の回転を取得
    let random = Math.floor(Math.random()*theTetrominoes.length);
    let current = theTetrominoes[random][currentRotation];

    // テトリミノを描画する関数
    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].style.backgroundColor = colors[random];
        });
    }

    // テトリミノを消す関数
    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].style.backgroundColor = '';
        });
    }

    // テトリミノを下に移動させる関数
    function moveDown() {
        undraw();
        currentPosition += width;
        draw();
        freeze();
    }

    // テトリミノが底についたかチェックする関数
    function freeze() {
        if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
            current.forEach(index => squares[currentPosition + index].classList.add('taken'));
            // 新しいテトリミノを開始
            random = nextRandom;
            nextRandom = Math.floor(Math.random() * theTetrominoes.length);
            current = theTetrominoes[random][currentRotation];
            currentPosition = 4;
            draw();
            displayShape();
            addScore();
            gameOver();
        }
    }

    // テトリミノを左に移動させる関数
    function moveLeft() {
        undraw();
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0);

        if (!isAtLeftEdge) currentPosition -= 1;

        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition += 1;
        }

        draw();
    }

    // テトリミノを右に移動させる関数
    function moveRight() {
        undraw();
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1);

        if (!isAtRightEdge) currentPosition += 1;

        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition -= 1;
        }

        draw();
    }

    // テトリミノを回転させる関数
    function rotate() {
        undraw();
        currentRotation++;
        if (currentRotation === current.length) { // 回転が最後の位置に達したら
            currentRotation = 0;
        }
        current = theTetrominoes[random][currentRotation];
        draw();
    }

    // キーボード操作の処理
    function control(e) {
        if (e.keyCode === 37) {
            moveLeft();
        } else if (e.keyCode === 38) {
            // 上矢印キーでの機能は省略
        } else if (e.keyCode === 39) {
            moveRight();
        } else if (e.keyCode === 40) {
            moveDown();
        } else if (e.keyCode === 32) {
            rotate();
        }
    }
    document.addEventListener('keyup', control);

    // スコアを更新する関数
    function addScore() {
        // 略、スコアの計算と更新
    }

    // ゲームオーバーのチェック
    function gameOver() {
        // 略、ゲームオーバーの条件と処理
    }

    // スタートボタンの処理
    startBtn.addEventListener('click', () => {
        if (timerId) {
            clearInterval(timerId);
            timerId = null;
        } else {
            draw();
            timerId = setInterval(moveDown, 1000);
            nextRandom = Math.floor(Math.random()*theTetrominoes.length);
            displayShape();
        }
    });
});
