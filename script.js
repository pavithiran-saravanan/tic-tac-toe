// Tic Tac Toe

// We will store the gameboard as an array inside an object. Players will also be stored as objects
// Our goal is to have as little global code as possible. Tuck all the code inside a factory or a module
// If we need one instance of something, we use module
// If we need multiples of something we use factories


/*

1. Create a gameboard object using module.
2. Create player objects using factory.
3. Write a javascript function to render the contents of the gameboard array to the webpage. For now, simply fill the array manually with 'X' and 'O'.
4. Write functions that allow players to add marks to a specific spot on the board, and then tie it to the dom. Players should be able to click on the gameboard to place the marker. 
5. While doing so, players should not be allowed to place markers in the spots that are already taken.
6. Every logic should reside in game, player or gameboard objects --> Brainstorm to figure out which functionality goes into which object.
7. Write the logic to check when the game is over.
8. Allow players to input names.
9. Add buttons to Start/Restart the game.
10. Add a display element to congratulate the winning player.

== Optional ==
11. Create an AI that allows playing against a computer. To start make the computer choose any random legal move. Once that is done, work on making the computer smart. Read about minmax algorithm which allows implementing an unbeatable AI.

// Objects required gameboard, game, factory, module

*/

// Declare a gameboard module (object)
const gameboard = function(){
    let _currPlayer = 0;
    let _markerCount = 0;
    let board = [['', '', ''],
                 ['', '', ''],
                 ['', '', ''],];
    const setMarker = function(row, col, marker){
        board[row][col] = marker;
    };
    const print = function(){
        console.log(board);
    };
    const isOver = function(){
        if(_markerCount < 9) return false;
        return true;
    }
    const displayResult = ()=>{
        document.querySelector('.result').classList.remove('hidden');
        document.querySelector('.turn-main').classList.add('hidden');
        document.querySelector('.btn-restart').classList.add('highlight-restart');
    }
    const is_three_in_a_row = function(marker){
        // Check row wise victory
        if(board[0][0] == marker && board[0][1] == marker && board[0][2] == marker) return true;
        if(board[1][0] == marker && board[1][1] == marker && board[1][2] == marker) return true;
        if(board[2][0] == marker && board[2][1] == marker && board[2][2] == marker) return true;

        // Check column wise victory
        if(board[0][0] == marker && board[1][0] == marker && board[2][0] == marker) return true;
        if(board[0][1] == marker && board[1][1] == marker && board[2][1] == marker) return true;
        if(board[0][2] == marker && board[1][2] == marker && board[2][2] == marker) return true;

        // Check diagonal victory
        if(board[0][0] == marker && board[1][1] == marker && board[2][2] == marker) return true;
        if(board[2][0] == marker && board[1][1] == marker && board[0][2] == marker) return true;
        
        return false;
    }
    const announceWinner = function(player){
        document.querySelector('.result').textContent = `-- ${player.name} Won --`;
        document.querySelector('.gameboard').style['pointer-events'] = 'none';
        displayResult();
    }
    const reset = function(){
        console.log(board);
        _currPlayer = 0;
        _markerCount = 0;
        board = [['', '', ''],
                 ['', '', ''],
                 ['', '', '']];
        document.querySelector('.gameboard').style['pointer-events'] = 'all';
        document.querySelector('.gameboard').innerHTML = '';
        document.querySelector('.result').textContent = '-- It is a tie --';
        document.querySelector('.result').classList.add('hidden');
        document.querySelector('.turn-main').classList.remove('hidden');
        document.querySelector('.symbol').textContent = 'X';
        document.querySelector('.btn-restart').classList.remove('highlight-restart');
        render();
    }

    const addClickEventListener = function(){
        const cells = document.querySelectorAll('.cell');
        cells.forEach((cell)=>{
            cell.addEventListener('click', (e)=>{
                if(cell.textContent === 'X' || cell.textContent === 'O') return;
                _markerCount++;
                const curr = players[_currPlayer];
                const marker = players[_currPlayer].marker;
                _currPlayer = _currPlayer === 0 ? 1 : 0;
                setMarker(cell.getAttribute('data-row'), cell.getAttribute('data-col'), marker);

                cell.textContent = marker;
                cell.setAttribute('mark', marker);

                cell.setAttribute('turn', players[_currPlayer].marker);
                document.querySelector('.turn-main').setAttribute('turn', players[_currPlayer].marker);
                document.querySelector('.symbol').textContent = players[_currPlayer].marker;
                document.querySelector('.turn').textContent = `${players[_currPlayer].name}`;

                if(is_three_in_a_row(curr.marker)) announceWinner(curr);
                if(isOver()) displayResult();
            });
        });
    };

    const render = function(){
        const gb = document.querySelector('.gameboard');
        board.forEach((row, r)=>{
            row.forEach((mark, c) => {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.textContent = mark;

                cell.setAttribute('data-row', r);
                cell.setAttribute('data-col', c);
                cell.setAttribute('mark', mark);
                cell.setAttribute('turn', 'X');
                document.querySelector('.turn-main').setAttribute('turn', 'X');
                document.querySelector('.turn').textContent = `${players[_currPlayer].name}`;

                gb.appendChild(cell);
            });
        });
        addClickEventListener();
    }
    return{setMarker, print, render, reset};
}();

// Write a factory function that returns a player object
const createPlayer = function(name, marker){
    const print = function(){
        console.log({name, marker});
    };
    return{name, marker, print};
};
// let players = [createPlayer("player1", "❤️"), createPlayer("player2", '💚')];
let players = [createPlayer("Player One", "X"), createPlayer("Player Two", 'O')];

gameboard.render();
document.querySelector('.btn-restart').addEventListener('click', gameboard.reset);

