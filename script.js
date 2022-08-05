const MAX_COUNTER = 8;

const Player = (mark, playerName) => {
    const getMark = () => mark;
    const getName = () => playerName;

    return {getMark, getName, playerName};
};

const game = (() => {
    let gameCounter = 0;
    let turnToken = 0;
    const player1 = Player("x", "Player 1");
    const player2 = Player('o', "Player 2");

    const input = document.querySelector('#playerOneName');
    const input2 = document.querySelector('#playerTwoName');
 
    if (input.value) {
        player1.playerName = input.value;
    }else if (input.valuelength === 0) {
        player1.playerName = "(X) Player 1";
    }

    if (input2.value) {
        player2.playerName = input2.value;
    }else if (input2.valuelength === 0) {
        player1.playerName = "(O) Player 1";
    }

    input.addEventListener('input', event => {
        player1.playerName = event.target.value;
        console.log(player1.playerName);
    })

    input2.addEventListener('input', event => {
        player2.playerName = event.target.value;
        console.log(player2.playerName);
    })

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

    var btn = document.getElementById("reset");

    btn.onclick = function() {
        gameBoard.reset();
        getCurrentPlayer();
        gameCounter = 0;
    }

    const displayResult = (num, player) => {
        // Get the modal
        var modal = document.getElementById("resultModal");
        modal.style.display = "grid";

        var modalContent = document.getElementsByClassName("modalContent")[0];
        if (num === 1){
            modalContent.innerHTML = `<span class="close">&times;</span><h2>${player.playerName} Wins</h2>`
        }else if (num === 2){
            modalContent.innerHTML = `<span class="close">&times;</span><h2>It's a draw!</h2>`
        }

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
            gameBoard.reset();
            getCurrentPlayer();
            gameCounter = 0;
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
            modal.style.display = "none";
            gameBoard.reset();
            getCurrentPlayer();
            gameCounter = 0;
            }
        }
    }

    const checkBoard = (gameArray ,player) => {
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
            displayResult(1, player);
        }else if (gameCounter < MAX_COUNTER) {
            gameCounter++;
        }else {
            displayResult(2, player);
        }
    }

    return {getCurrentPlayer, checkBoard};

})();

const gameBoard =(() => {

    const addInteractivity = () => {
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
                    game.checkBoard(ogameArray, player);
                } else {
                    spot.innerHTML = '<span class="material-symbols-outlined x">close</span>';
                    xgameArray.push(spot.id);
                    game.checkBoard(xgameArray, player);
                }
            }
        }))
    }
    
    const reset = () => {
        const board = document.querySelector(".gameBoard")
        board.innerHTML = 
        `<div class="spot" id="1"></div>
        <div class="spot" id="2"></div>
        <div class="spot" id="3"></div>
        <div class="spot" id="4"></div>
        <div class="spot" id="5"></div>
        <div class="spot" id="6"></div>
        <div class="spot" id="7"></div>
        <div class="spot" id="8"></div>
        <div class="spot" id="9"></div>`
        addInteractivity();
    }

    addInteractivity();
    return {reset};

})();
