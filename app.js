// (function() {

    let objects = (() => {
        let gameboardArr = ['', '', '', '', '', '', '', '', ''];
        let form = document.querySelector('form');
        let selection = document.querySelector('#side');
        let selectionOpp = document.querySelector('#opp');
        let settings = document.querySelector('.game-settings');
        let [...gameSeq] = document.querySelectorAll('.game-sequence');
        let gameContainer = document.querySelector('.game-container');
        let winHeader = document.querySelector('.win-text');
        let retryBtn = document.querySelector('.retry');
        let playerOne;
        let playerTwo;
        let winner = (board, player) => {
            if (
            (board[0] == player && board[1] == player && board[2] == player) ||
            (board[3] == player && board[4] == player && board[5] == player) ||
            (board[6] == player && board[7] == player && board[8] == player) ||
            (board[0] == player && board[3] == player && board[6] == player) ||
            (board[1] == player && board[4] == player && board[7] == player) ||
            (board[2] == player && board[5] == player && board[8] == player) ||
            (board[0] == player && board[4] == player && board[8] == player) ||
            (board[2] == player && board[4] == player && board[6] == player)
            ) {
            return true;
            } else {
            return false;
            }
           }

        let gameboardChange = (value, index) => {
            if (gameboardArr[index] === value) {
                return;
            }
            gameboardArr[index] = value;
            gameControl.render();
            return gameboardArr;
        }
        let gameboardReadIndex = (index) => gameboardArr[index];
        return {
            form,
            selection,
            settings,
            gameContainer,
            playerOne,
            playerTwo,
            gameSeq,
            winHeader,
            retryBtn,
            selectionOpp,
            gameboardChange,
            gameboardReadIndex,
            winner
        }
    })();

    let Player = (side) => {
        let isPlaying = false;
        let isComputer = false;
        let getSide = () => side;
        return {
            isPlaying,
            isComputer,
            getSide
        }
    }

    let gameControl = (() => {
        let render = () => {
            for (let i in objects.gameSeq) {
            objects.gameSeq[i].textContent = objects.gameboardReadIndex([i]);
        }}
        let addMark = (e) => {
            if (e.target.className = 'game-sequence') {
                if (e.target.textContent.includes('X') || e.target.textContent.includes('O')) {
                    return;
                }
                if (objects.playerOne.isPlaying === true) {
                    objects.gameboardChange(objects.playerOne.getSide(), e.target.dataset.id);
                    objects.playerOne.isPlaying = false;
                    objects.playerTwo.isPlaying = true;
                    checkWin();
                    if (objects.playerTwo.isComputer === true) {
                        objects.gameboardChange(objects.playerTwo.getSide(), minimax(gameBoard(gameArr()), objects.playerTwo.getSide()).index);
                        objects.playerOne.isPlaying = true;
                        checkWin();
                    }
                } else if (objects.playerTwo.isPlaying === true && objects.playerTwo.isComputer === false) {
                    objects.gameboardChange(objects.playerTwo.getSide(), e.target.dataset.id);
                    objects.playerOne.isPlaying = true;
                    objects.playerTwo.isPlaying = false;
                    checkWin();
                }
            }
        }
        let winDisplay = (side) => {
            objects.winHeader.style.display = 'block';
            objects.winHeader.textContent = side + ' \'s wins';
            objects.retryBtn.style.display = 'block';
        }
        let checkWin = () => {
            let winOne = objects.winner(gameArr(), objects.playerOne.getSide());
            let winTwo = objects.winner(gameArr(), objects.playerTwo.getSide());
            let draw = () => {
                let drawArr = [];
                for (i = 0; i < 9; i++) {
                    drawArr.push(objects.gameboardReadIndex(i));
                }
                if (drawArr.filter((i) => i === 'X').length === 5 || drawArr.filter((i) => i === 'O').length === 5) {
                    objects.retryBtn.style.display = 'block';
                    objects.winHeader.style.display = 'block';
                    objects.winHeader.textContent = 'Draw!';
                }
            }
            if (winOne === true) {
                winDisplay(objects.playerOne.getSide())
                objects.playerOne.isPlaying = false;
                objects.playerTwo.isPlaying = false;
            } else if (winTwo === true) {
                winDisplay(objects.playerTwo.getSide())
                objects.playerOne.isPlaying = false;
                objects.playerTwo.isPlaying = false;
            } else {
                draw();
            }
        } 
        let retryGame = () => {
            objects.retryBtn.style.display = 'none';
            objects.winHeader.style.display = 'none';
            objects.settings.style.display = 'none';
            objects.gameContainer.style.display = 'grid';
            objects.playerOne.isPlaying = true;
            for (let i = 0; i < 9; i++) {
                objects.gameboardChange('', i);
            }
        }
        let emptyIndexies = (board) => {
            return board.filter(s => s != "O" && s != "X");
        }
        let gameArr = () => {
            let arr = [];
                for (i = 0; i < 9; i++) {
                    arr.push(objects.gameboardReadIndex(i));
                }
            return arr;
        }
        let gameBoard = (board) => {
            let arr = [];
                for (i = 0; i < 9; i++) {
                    if (board[i] === 'X' || board[i] === 'O') {
                        arr.push(board[i]);
                    } else if (board[i] === '') {
                        arr.push(i);
                    }
                }
                return arr;
        }
        let minimax = (newBoard, player) => {
            let avaliSpots = emptyIndexies(newBoard);
            if (objects.winner(newBoard, objects.playerOne.getSide())) {
                return {score:-10}
            } else if (objects.winner(newBoard, objects.playerTwo.getSide())) {
                return {score:10}
            } else if (avaliSpots.length === 0) {
                return {score:0};
            }
            let moves = [];

            for (let i = 0; i < avaliSpots.length; i++) {
                let move = {};
                move.index = newBoard[avaliSpots[i]];
                newBoard[avaliSpots[i]] = player;

                if (player == objects.playerTwo.getSide()){
                var result = minimax(newBoard, objects.playerOne.getSide());
                move.score = result.score;
                }
                else{
                var result = minimax(newBoard, objects.playerTwo.getSide());
                move.score = result.score;
                }
                newBoard[avaliSpots[i]] = move.index;
                
                moves.push(move);
            }
            let bestMove;
            if(player === objects.playerTwo.getSide()){
                var bestScore = -10000;
                for(var i = 0; i < moves.length; i++){
                if(moves[i].score > bestScore){
                    bestScore = moves[i].score;
                    bestMove = i;
                }
                }
            } else {
                var bestScore = 10000;
                for(var i = 0; i < moves.length; i++){
                if(moves[i].score < bestScore){
                    bestScore = moves[i].score;
                    bestMove = i;
                }
                }
            }
            return moves[bestMove];
            }
        objects.gameContainer.addEventListener('click', addMark);
        objects.retryBtn.addEventListener('click', retryGame)

        return {
            render,
            minimax,
            emptyIndexies,
            gameBoard,
            gameArr
        }
    })();

    let playerSelection = (() => {
        addPlayer = (e) => {
            e.preventDefault();
                if (objects.selection.value === 'X') {
                    objects.playerOne = Player('X');
                    objects.playerTwo = Player('O');
                    objects.playerOne.isPlaying = true;
                } else if (objects.selection.value === 'O') {
                    objects.playerOne = Player('O');
                    objects.playerTwo = Player('X');
                    objects.playerOne.isPlaying = true;
                }
                if (objects.selectionOpp.value === 'computer') {
                    objects.playerTwo.isComputer = true;
                }
            objects.gameContainer.style.display = 'grid';
            objects.settings.style.display = 'none';
        }
        objects.form.addEventListener('submit', addPlayer)
    })()


// })();









// (function() {

//     const objects = (() => {
//         let gameArr = ['', '', '',
//                         '', '', '',
//                         '', '', ''];
//         let [...gameSeq] = document.querySelectorAll('.game-sequence');
//         let gameContainer = document.querySelector('.game-container');
//         let form = document.querySelector('form');
//         let selection = document.querySelector('select');
//         let settings = document.querySelector('.game-settings')
//         return {
//             gameSeq,
//             gameContainer,
//             gameArr,
//             form,
//             selection,
//             settings
//         }
//     })();


//     const displayController = (() => {
//         const render = () => {
//             for (let i in objects.gameSeq) {
//             objects.gameSeq[i].textContent = objects.gameArr[i];
//         }}
//         return {
//             render
//         }
//     })();

//     const events = (() => {

//     })();

//     const Player = (side) => {
//         const getSide = () => side;
//         const turn = () => {
//             let random = Math.round(Math.random() * 8);
//             if (objects.gameArr[random].includes('X') || objects.gameArr[random].includes('O')){
//                 return;
//             } else {
//                 objects.gameArr[random] = getSide();
//                 displayController.render();
//             }
//         }
//         return {
//             turn
//         }
//     }

//     const createPlayer = (() => {
//         let cross;
//         let zero;
//         objects.form.addEventListener('submit', (e) => {
//             e.preventDefault();
//             if (objects.selection.value === 'X') {
//                 let cross = Player(objects.selection.value);
//             } else if (objects.selection.value === 'O') {
//                 let zero = Player(objects.selection.value);
//             }
//         })
//         return {
//             cross,
//             zero
//         }
//     })();
//     cross.turn();
//     zero.turn();
//     cross.turn();
//     zero.turn();
// })();