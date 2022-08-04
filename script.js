const MAX_COUNTER = 9;

const Player = (mark) => {
    const getMark = () => mark;

    return {getMark};
};

const game = (() => {
    const gameCounter = 0;
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

    return {getCurrentPlayer};

})();

console.log(game.getCurrentPlayer());

const gameBoard =(() => {
    const boardSpots = document.querySelectorAll(".spot");

    boardSpots.forEach(el => el.addEventListener('click', event => {
        const spot = event.currentTarget;
        const player = game.getCurrentPlayer();
        if (spot.children.length === 0) {
            if (player.getMark() == "o") {
                spot.innerHTML = '<span class="material-symbols-outlined o">circle</span>';
                event.currentTarget.removeEventListener('click', event);
            } else {
                spot.innerHTML = '<span class="material-symbols-outlined x">close</span>';
                event.currentTarget.removeEventListener('click', event);
            }
        }
    }))
    console.log(boardSpots);

})();


/*
1. Start Game
2. x starts game
3. Switch player/icon
3a. place icon on board in a specific spot
4. Determine winner.
*/