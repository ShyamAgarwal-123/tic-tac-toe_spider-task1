alert('!!!Instructions!!!!!');
alert('1.Type Your Name In input Pop-up Boxes And Accordingly you will get X or O'+"\n"+
    '2.Each Player Will get 5 sec to Choose a place to fill'+"\n"+
    '3.If not Choosen then the turn of the Current player will be Skiped'+"\n"+
   '4.After a Successful Entry The player can\'t modify their Entry')
alert('!!All the Best!!');

let X = prompt("Name Of player X");
let O = prompt("Name of Player O");
let a = 0;
let b = 0;
let c = 0;
if(X == null || X =="" || O == null || O == ""){
    X ="playerX";
    O = "playerO";
}
let newGameButton = document.querySelector("#New-game")
let playButtons = document.querySelectorAll(".box");
let para = document.querySelector(".container .info p");
let restartButton = document.querySelector("#Restart-button");
let turnOfX = true; // true--> X fasle---> O
let gameNotOver = true;
let winPosition =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
para.innerText = `Its ${X} Turn Now!`;
playButtons.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turnOfX){
            box.innerText = "X";
            box.disabled = true;
        }
        else{
            box.innerText = "O";
            box.disabled = true;
        }
        checkPattern();
        if(!gameNotOver && b === 9 && c === 0 ){
            playButtons.forEach((box)=>{
                box.disabled = true;
            })
            para.innerText = "OPPS GAME IS OVER AND IT'S A DRAW!";
            clearInterval(timer);
        }
        else if(gameNotOver){
            if(turnOfX){para.innerText = `Its ${O} Turn Now!`}
            else{para.innerText = `Its ${X} Turn Now!`}
            turnOfX = !(turnOfX);
            resetTimer();
        }
        
    })

})
const checkPattern = ()=>{
    c = 0;
    a =0;
    playButtons.forEach((box)=>{
        if(box.innerText !== ""){ a++ };
    })
    if(a === 9){
        gameNotOver = !gameNotOver;
        b = 9;
    }
    for(position of winPosition){
        let text1 = playButtons[position[0]].innerText;
        let text2 = playButtons[position[1]].innerText;
        let text3 = playButtons[position[2]].innerText;
        if (text1 !== "" && text2 !== "" && text3 !== ""){
            if(text1 === text2  && text2 === text3){
                if(turnOfX){
                    playButtons[position[0]].innerHTML ='<p style="color: #ff2b0f;font-size: 10vmin; font-weight:bold;">X</p>';
                    playButtons[position[1]].innerHTML ='<p style="color: #ff2b0f;font-size: 10vmin; font-weight:bold;">X</p>';
                    playButtons[position[2]].innerHTML ='<p style="color: #ff2b0f;font-size: 10vmin; font-weight:bold;">X</p>';
                    para.innerText = `${X} Is The WINNER!`;
                    playButtons.forEach((box)=>{
                        box.disabled = true;
                        c = 1;
                    })
                }
                else{
                    playButtons[position[0]].innerHTML ='<p style="color: #ff2b0f;font-size: 10vmin; font-weight:bold;">O</p>';
                    playButtons[position[1]].innerHTML ='<p style="color: #ff2b0f;font-size: 10vmin; font-weight:bold;">O</p>';
                    playButtons[position[2]].innerHTML ='<p style="color: #ff2b0f;font-size: 10vmin; font-weight:bold;">O</p>';
                    para.innerText = `${O} Is The WINNER!`;
                    playButtons.forEach((box)=>{
                        box.disabled = true;
                        c = 1;
                    })
                }
                if(gameNotOver){
                    gameNotOver = !gameNotOver;
                }
                clearInterval(timer);
            }
        }   
    }
}
// set every thing back to normal without refresh i.e retaining the playerX and playerO info
restartButton.addEventListener("click",() =>{
    playButtons.forEach((box)=>{
        box.innerText = "";
        box.disabled = false;  
    })
    turnOfX = true;
    para.innerText = `Its ${X} Turn Now!`;
    gameNotOver = true;
    b = 0;
    resetTimer();
})
// refresh the game
newGameButton.addEventListener("click",() =>{
    document.location.reload();
})
// CountDown Function
let time = 5;
const countDown = document.querySelector('#count-down p');
let timer = setInterval(updateTime,1000);
function updateTime(){

    if (time>=0) {
        countDown.textContent = time;
        time--;
    }
    else{
        setTime();
    }
}
// reset the timer buy clearing the previous setInterval function and Creating a new one
function resetTimer() {
    clearInterval(timer);
    time = 5;
    countDown.textContent = time;
    timer = setInterval(updateTime, 1000);
}

// it is setting the time back to 10sec after a cycle of of countdown is completed and skiping the current player turn
function setTime(){
    if (time<0) {
        if(gameNotOver){
            if(turnOfX){para.innerText = `Its ${O} Turn Now!`}
            else{para.innerText = `Its ${X} Turn Now!`}
            turnOfX = !(turnOfX);
        }
    }
    time = 5;
    countDown.textContent = time;
}