// Read the data from the board
// Figure out who the current player is
// Create the initial board
// Update the board based on the user click
// Define Winning conditions
// Check for winning condition in each step

window.addEventListener('DOMContentLoaded', ()=>{

    const tiles = Array.from(document.querySelectorAll('.tile'));
    const currentPlayer = document.querySelector("#displayPlayer");
    const reset = document.querySelector('#reset');
    const resultDisplay = document.querySelector("#resultsDisplayName");
    const resultsDisplayDiv= document.getElementById("resultsDisplay");
    let board = ['', '', '', '', '', '', '', '', ''];
    var roundWon="";
    let cp = 'X';

    const winningConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]                                                                                                 
    ];

    const isValid = (tile) => {
        if(tile.innerHTML === 'X' || tile.innerHTML === 'O'){
            return false;
        }
        return true;
    }

    const update = (index) => {
        board[index] = cp;
    }

    const playerChange = () => {
        cp = cp === 'X' ? 'O' : 'X';
        currentPlayer.innerHTML = cp;
    }

    const resetBoard = () => {
        console.log('reset called');
        board = ['', '', '', '', '', '', '', '', ''];
        //cp = 'X';
        currentPlayer.innerHTML = 'X';
        resultsDisplayDiv.style.display="none";
        tiles.forEach(tile=>{
            tile.innerHTML = '';
        });
    }

    async function handleResult(){
        roundWon = false;
        for(i=0;i<=7;i++)
        {
            const winCondition = winningConditions[i];
            const v1 = board[winCondition[0]];
            const v2 = board[winCondition[1]];
            const v3 = board[winCondition[2]];
            if(v1==='' || v2==='' || v3==='')
            {
                continue;
            }
            if(v1===v2 && v2===v3)
            {
                roundWon = true;
                currentPlayer.innerHTML = 'X';
                break;
            }
        }
        if(roundWon)
        {
            if(cp==='X'){
                resultDisplay.innerHTML="X";
                
                //alert('X won!');
            }
            else{
                resultDisplay.innerHTML="O";
                //alert('O won!');
            }
            resultsDisplayDiv.style.display="block";   
            //resetBoard();
        }
    }

    const userMove = (tile, index) => {
        if(isValid(tile) &&  roundWon!=true)
        {
            tile.innerHTML = cp;
            update(index);
            handleResult();
            playerChange();
        }
    }

    tiles.forEach((tile, index)=>{
        tile.addEventListener('click', ()=>userMove(tile,index));
    });

    reset.addEventListener('click', resetBoard);

});