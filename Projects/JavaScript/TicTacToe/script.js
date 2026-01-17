document.addEventListener('DOMContentLoaded', () => {

    let turn = '◯';
    let matrix = new Array(9).fill('');

    const oScoreCard = document.querySelector('.o-score-box');
    const xScoreCard = document.querySelector('.x-score-box');
    const oScoreBox = document.querySelector('.o-score');
    const xScoreBox = document.querySelector('.x-score');
    const oScoreIcon = document.querySelector('#o-score-icon');
    const xScoreIcon = document.querySelector('#x-score-icon');
    const gameGrid = document.querySelector('.game-grid');
    const resetBtn = document.querySelector('.reset-btn');
    const winnerText = document.querySelector('.winner-text');

    const winMatrix = [[0,1,2],[3,4,5],[6,7,8],
                        [0,3,6],[1,4,7],[2,5,8],
                        [0,4,8], [2,4,6]];

    let score = {
        '✖' : 0,
        '◯' : 0
    };

    Array.from(gameGrid.children).forEach((box, index) => {
        box.addEventListener('click', (e) => {
            
            if(e.target.textContent === '') {
                e.target.textContent = turn;
                matrix[index] = turn;

                if(checkWinner()) {
                    score[turn]++;
                    winnerText.textContent = `${turn} wins !`;
                    setTimeout(resetUI, 1500);
                    return;
                } 
                
                if(resetBoard()) {
                    setTimeout(resetUI, 1500);
                    return;
                }

                turn === '✖'? turn = '◯' : turn = '✖';

                updateTurn();
            }
        })
    })

    resetBtn.addEventListener('click', () => {
        resetUI();
        resetScore();
    })
    function checkWinner() {
        for(let pattern of winMatrix) {
            let win = true;

            for(let index of pattern) {
                if(matrix[index] !== turn) {
                    win = false;
                    break;
                }
            }

            if(win === true) return true;
        }

        return false;
    }

    function updateTurn() {
        if(turn === '◯') {
            xScoreBox.style.boxShadow = 'none';
            oScoreBox.style.boxShadow = '0px 0px 50px purple';
            xScoreIcon.style.textShadow = 'none';
            oScoreIcon.style.textShadow = '0px 0px 50px rgb(255, 0, 191)';
        } else {
            xScoreBox.style.boxShadow = '0px 0px 50px blue';
            oScoreBox.style.boxShadow = 'none';
            xScoreIcon.style.textShadow = '0px 0px 50px aqua';
            oScoreIcon.style.textShadow = 'none';
        }
    }
    function resetBoard() {
        for(let i of matrix){
            if(i === '') {
                return false;
            }
        }

        return true;
    }

    function updateScoreUI() {
        oScoreCard.textContent = score['◯'];
        xScoreCard.textContent = score['✖'];
        updateTurn();
    }

    function resetUI() {
        Array.from(gameGrid.children).forEach((box) => {
            box.textContent = '';
        });

        winnerText.textContent = '';

        matrix.fill('', 0, 9);
        turn = '◯';
        
        updateScoreUI();
    }

    function resetScore() {
        score['◯'] = 0;
        score['✖'] = 0;

        updateScoreUI();
    }
})