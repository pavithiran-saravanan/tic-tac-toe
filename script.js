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
    let board = [['X', 'O', 'X'],
                 ['X', 'O', 'X'],
                 ['X', 'O', 'X'],]
    const setMarker = function(row, col, marker){
        board[row][col] = marker;
    };
    const print = function(){
        console.log(board);
    };
    const render = function(){
        const gb = document.querySelector('.gameboard');
        board.forEach((row)=>{
            row.forEach((mark) => {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.textContent = mark;
                gb.appendChild(cell);
            });
        });
    }
    return{setMarker, print, render};
}();

gameboard.print();
gameboard.render();

// Write a factory function that returns a player object
const createPlayer = function(name, marker){
    const print = function(){
        console.log({name, marker});
    };
    return{name, marker, print};
};

const player1 = createPlayer("player1", "X");
const player2 = createPlayer("player2", "O");
player1.print();
player2.print();