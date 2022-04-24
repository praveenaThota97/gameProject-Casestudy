window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const currentPlayer = document.getElementById('displayPlayer');

    // Winning conditions
    let board = ['','','','','','','','',''];
    let cp = 'X';
    
    const winningCondition = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    async function handleResult(){
        let currentRound = false;
        for(let i=0;i<=7;i++)
        {
            const winCondition = winningCondition[i];
            const input1 = board[winCondition[0]];
            const input2 = board[winCondition[1]];
            const input3 = board[winCondition[2]];
            if(input1==='' || input2 === '' || input3==='')
            {
                continue;
            }
            if(input1===input2 && input2=== input3)
            {
                currentRound=true;
                break;
            }
        }

        if(currentRound==true)
        {
            if(cp==='X')
                window.alert("X Won!");
            else
                window.alert("O Won!");
        }
    }

    const playerChange = () =>{
        cp = cp==='X' ? 'O' : 'X';
        currentPlayer.innerHTML = cp;
    }

    const userAction = (tile, index) => {
        tile.innerHTML = cp;
        handleResult();
        playerChange();
    }

    tiles.forEach((tile) => {
        tile.addEventListener('click', ()=>userAction(tile));
    });

});