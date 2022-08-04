const MAX_COUNTER = 9;

const Player = (mark) => {
    const getMark = () => mark;

    return {getMark};
};

const game = (() => {
    let gameCounter = 0;
    let turnToken = 0;
    const player1 = Player("x");
    const player2 = Player('o');

    const setCurrentPlayer = () => {
        if (turnToken == 0){
            turnToken++
            return player1;
        }else {
            turnToken--;
            return player2;
        }
    }

    const getCurrentPlayer = () => {
            const currentPlayer = setCurrentPlayer();
            return currentPlayer;
    }

    const checkBoard = (gameArray) => {
        const verifyArray = (arr, target) => target.every(v => arr.includes(v))

        let winArray = [
            ["1", "2", "3"],
            ["4", "5", "6"],
            ["7", "8", "9"],
            ["1", "4", "7"],
            ["2", "5", "8"],
            ["3", "6", "9"],
            ["1", "5", "9"],
            ["3", "5", "7"]
        ];

        if (winArray.some(element => verifyArray(gameArray, element))) {
            console.log("win");
        }else {
            console.log("not yet");
        }
    }

    return {getCurrentPlayer, checkBoard};

})();

const gameBoard =(() => {
    const boardSpots = document.querySelectorAll(".spot");
    let ogameArray = [];
    let xgameArray = [];

    boardSpots.forEach(el => el.addEventListener('click', event => {
        const spot = event.currentTarget;
        if (spot.children.length === 0) {
            const player = game.getCurrentPlayer();
            if (player.getMark() == "o") {
                spot.innerHTML = '<span class="material-symbols-outlined o">circle</span>';
                ogameArray.push(spot.id);  
                game.checkBoard(ogameArray);
                console.log(ogameArray);
            } else {
                spot.innerHTML = '<span class="material-symbols-outlined x">close</span>';
                xgameArray.push(spot.id);
                game.checkBoard(xgameArray);
                console.log(xgameArray);
            }
        }
    }))
    console.log(boardSpots);

})();
