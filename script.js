
const allBtns = document.querySelectorAll('.eachBtn');

const arr=Array.from(allBtns);

let turnO = true;
let turnX = false;
let isGameOver = false;
let shouldContinue = true;


function checkingChance(arr,turnO,turnX){
    arr.map((i,index)=>{
        i.addEventListener('click',e=>{
            if(!shouldContinue){
                return;
            }
            
            if(turnO && i.innerText == ''){
                i.innerText='O';
                turnO = false;
                turnX=true;
                document.getElementById('displayTurn_win').innerText = "X turn";
            }
            else if(turnX && i.innerText == ''){
                i.innerText='X';
                turnO = true;
                turnX=false;
                document.getElementById('displayTurn_win').innerText = "O turn";
            }

            if(!isGameOver){
                wining();
            }
            else{
                shouldContinue = false;
            }
        })
    })
}

checkingChance(arr,turnO,turnX);

// new game
function playNewGame(){
    const newGameButton = document.getElementById("newGame");
    newGameButton.addEventListener('click',()=>{
        arr.forEach(element=>{
            element.innerText = "";
            isGameOver=false;
            shouldContinue = true;
        })
        newGameButton.classList.add('newGameBtn');
    })
}

// wining logic
function wining(){    
    const winChance = [
        [0,1,2],
        [3,4,5],
        [6,7,8],

        [0,3,6],
        [1,4,7],
        [2,5,8],
        
        [0,4,8],
        [2,4,6],
        
    ];

    function ChangeContentTurnWinTieBtn (){
        const newGameButton = document.getElementById("newGame");
        newGameButton.innerText = "New Game";
        newGameButton.classList.remove('newGameBtn');
        playNewGame();
    }

    let someOneWin = false;
    const eachBtn = document.getElementsByClassName("eachBtn");
    // console.log(i);
    winChance.forEach((e,ind)=>{
        // console.log(eachBtn[e[0]].innerText, eachBtn[e[1]].innerText, eachBtn[e[2]].innerText);
        if((eachBtn[e[0]].innerText == eachBtn[e[1]].innerText) && (eachBtn[e[1]].innerText == eachBtn[e[2]].innerText) && 
            (eachBtn[e[0]].innerText != "") && (eachBtn[e[1]].innerText != "") && (eachBtn[e[2]].innerText != ""))
        {
            isGameOver=true;
            shouldContinue = false;
            document.getElementById('displayTurn_win').innerText = "Congrats, "+eachBtn[e[0]].innerText + " won the round";
            ChangeContentTurnWinTieBtn();
            someOneWin = true;
        }
    })
    if(!someOneWin){
        var isNonEmpty = arr.some(function(button) {
            return button.innerText.trim() === '';
        });
        if(!isNonEmpty){
            document.getElementById('displayTurn_win').innerText = "Game Tie";
            isGameOver=true;
            shouldContinue = false;
            ChangeContentTurnWinTieBtn();
        }
    }
}
