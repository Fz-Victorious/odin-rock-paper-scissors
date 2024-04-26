
let comScore = 0;
let userScore = 0;
let round = 0;
let comScoreElement = document.querySelector(".computer-score");
let userScoreElement = document.querySelector(".user-score");
let roundsTitle = document.querySelector(".rounds-title");
let roundResult = document.querySelector(".round-result");
let text;

roundsTitle.innerText = `Round ${round}`;
comScoreElement.setAttribute("com-score", "0");
userScoreElement.setAttribute("user-score", "0");


function checkRounds(){
    if (round === 5)
    {
        document.querySelector('#final-result-popup').style.display = "block";
        if (userScore > comScore)
            document.querySelector('.text').innerText = "You Win 🥳";
        else if (userScore < comScore)
            document.querySelector('.text').innerText = "You Lose 😞";
        else
            document.querySelector('.text').innerText = "It's Tiie";
    }
}

function playRound(userChoice, compChoice)
{
    round++;
    roundsTitle.innerText = `Round ${round}`;
    compChoice = compChoice.split("-");
    compChoice= compChoice[0];
    if (userChoice===compChoice)
    {
        text = "It's Tie!!!";
        roundResult.style="color:white; font-size:30px";
    }
    else if ((userChoice==="paper" && compChoice==="rock") 
    || (userChoice==="scissors" && compChoice==="paper") 
    || (userChoice==="rock" && compChoice==="scissors"))
    {
        string = "Great job !";
        roundResult.style="color:#4ade80; font-size:30px";
        text = string + ` ${userChoice} beats ${compChoice}!`;
        userScore++;
        userScoreElement.setAttribute("user-score", `${userScore}`);
    }
    else{
        string = `Oops !`;
        roundResult.style="color:#ef4444; font-size:30px";
        text = string + ` ${compChoice} beats ${userChoice}!`
        comScore++;
        comScoreElement.setAttribute("com-score", `${comScore}`);
    }
    roundResult.innerText = text;
    checkRounds();
}

document.querySelector("button").onclick = ()=>{
    document.querySelector('#final-result-popup').style.display = "none";
    comScore = 0;
    userScore= 0;
    round = 0;
    roundResult.innerText = "";
    roundsTitle.innerText = `Round ${round}`;
    comScoreElement.setAttribute("com-score", "0");
    userScoreElement.setAttribute("user-score", "0");
    let i = 0;
    let allChoices = document.querySelectorAll('.player-icon');
    while(i < 6)
    {
        allChoices[i].style="";
        i++;
    }
}

function getComputerChoice()
{
    let rand = Math.floor(Math.random() * 3);
    let choiceString = ["paper-com", "rock-com", "scissors-com"];
    let comChoice = document.querySelector(`.${choiceString[rand]}`);
    comChoice.style = "width:80px; border: 6px solid #1d4ed8";
    let counter = 0;
    while(counter <3){
        if (counter != rand)
        {
            let lastChoice = document.querySelector(`.${choiceString[counter]}`);
            lastChoice.style = "";
        }
        counter++;
    }
    return choiceString[rand];
}

let userChoices = document.querySelectorAll(".user-icon");
userChoices.forEach((userChoice)=>{
    userChoice.style = "";
    userChoice.addEventListener("click", (e)=>{
        for(let index=0; index < 3; index++){
            if (userChoices[index] !== userChoice){
                userChoices[index].style = "";
            }
        }
        e.target.style = "width:80px; border: 5px solid green";
        let userChoiceName = userChoice.getAttribute("class").split(" ");
        let compChoice = getComputerChoice();
        playRound(userChoiceName[2], compChoice);  
    })
})
