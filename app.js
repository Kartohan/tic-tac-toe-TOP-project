// (function() {

    let objects = (() => {
        let gameboardArr = ['', '', '', '', '', '', '', '', ''];
        let form = document.querySelector('form');
        let selection = document.querySelector('select');
        let settings = document.querySelector('.game-settings');
        let [...gameSeq] = document.querySelectorAll('.game-sequence');
        let gameContainer = document.querySelector('.game-container');
        let winHeader = document.querySelector('.win-text');
        let retryBtn = document.querySelector('.retry');
        let playerOne;
        let playerTwo;
        let winCombinations = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ]  
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
            winCombinations,
            winHeader,
            retryBtn,
            gameboardChange,
            gameboardReadIndex,
        }
    })();

    let Player = (side) => {
        let isPlaying = false;
        let getSide = () => side;
        let isWinner = false;
        return {
            isPlaying,
            isWinner,
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
                } else if (objects.playerTwo.isPlaying === true) {
                    objects.gameboardChange(objects.playerTwo.getSide(), e.target.dataset.id);
                    objects.playerOne.isPlaying = true;
                    objects.playerTwo.isPlaying = false;
                    checkWin();
                }
            }
        }
        let winDisplay = (side) => {
            objects.gameContainer.style.display = 'none';
            objects.winHeader.style.display = 'block';
            objects.winHeader.textContent = side + ' \'s wins';
            objects.retryBtn.style.display = 'block';
        }
        let checkWin = () => {
            let winX = objects.winCombinations.some((combination) => combination.every((i) => objects.gameboardReadIndex(i).includes(objects.playerOne.getSide())));
            let winO = objects.winCombinations.some((combination) => combination.every((i) => objects.gameboardReadIndex(i).includes(objects.playerTwo.getSide())));
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
            if (winX === true) {
                winDisplay(objects.playerOne.getSide())
            } else if (winO === true) {
                winDisplay(objects.playerTwo.getSide())
            } else {
                draw();
            }
        } 
        let retryGame = () => {
            objects.retryBtn.style.display = 'none';
            objects.winHeader.style.display = 'none';
            objects.settings.style.display = 'block';
            objects.gameContainer.style.display = 'none';
            for (let i = 0; i < 9; i++) {
                objects.gameboardChange('', i);
            }
        }
        objects.gameContainer.addEventListener('click', addMark);
        objects.retryBtn.addEventListener('click', retryGame)

        return {
            render
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