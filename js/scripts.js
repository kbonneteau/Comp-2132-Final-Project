// =======================================================
// CONSTANT VARIABLES
// =======================================================


const popOutput     = document.getElementById('pop-out');
const p1RoundScore  = document.getElementById("p1-round");
const p1TotalScore  = document.getElementById("p1-total");
const p2RoundScore  = document.getElementById("p2-round");
const p2TotalScore  = document.getElementById("p2-total");
const btnRollDice   = document.getElementById("btn-roll");
const btnNewGame    = document.getElementById("btn-new");


// =======================================================
// DICE OBJECT
// =======================================================

class Dice {

    constructor() {
        this.values = [1,2,3,4,5,6];
    }
    describeSelf(){
        return `${this.values[0]}`;
    }
    rollDice(){

        let a, b, i;
        //loop through the array
        for (i = this.values.length - 1; i > 0; i--) {
            //randomly select a dice value
            a = Math.floor(Math.random() * (i + 1));
            b = this.values[i];
            //resort array values
            this.values[i] = this.values[a];
            this.values[a] = b;
        }
        //return the randomly sorted array
        return this.values[0];  

    };
    assignImage(diceValue){
        const imageNumber = diceValue;
        return `images/dice-${imageNumber}`;
    }
};

// test
const diceTest = new Dice();
diceTest.rollDice();
popOutput.innerHTML = `<p> Test results: ${diceTest.describeSelf()}</p>`;


// Player 1's dice
const p1dice1 = new Dice();
const p1dice2 = new Dice();

// Player 2's dice
const p2dice1 = new Dice();
const p2dice2 = new Dice();



// =======================================================
// PLAYER OBJECT
// =======================================================

function Player(name){
    this.name = name;
    this.score = 0;
    this.die = [];
}
Player.prototype.addDice = function(dice1, dice2){
    this.die.push(dice1);
    this.die.push(dice2);
}
Player.prototype.addToScore = function(score){
    this.score = score;
}
Player.prototype.describeSelf = function(){
    let description = `<p>${this.name}'s current dice roll is ${this.die[0]} and ${this.die[1]}.<br>Current score: ${this.score}</p>`
    
    return description;
};


const player1 = new Player("Challenger");
const player2 = new Player("Opponent");



// =======================================================
// POPUP EVENT LISTENERS
// =======================================================

const btnOk     = document.getElementById("btn-ok");
const btnClose  = document.getElementById("btn-close");
const popup     = document.getElementById("pop-up");

btnOk.addEventListener("click",closePopup);
btnClose.addEventListener("click",closePopup);


// =======================================================
// GAMEPLAY LOGIC
// =======================================================

let numRoundsPlayed = 0;

let p1CurrentRoundScore;
let p1GameScore = 0;

let p2CurrentRoundScore;
let p2GameScore = 0;

btnNewGame.addEventListener("click",function(){
    refreshGame();
});

btnRollDice.addEventListener("click",function(e){
    counter = 0;
    
    if (numRoundsPlayed > 2){
        e.preventDefault();
    }else{
        diceAnimationHandler = requestAnimationFrame(changeDiceImage);
        setTimeout(playGame,300);
        numRoundsPlayed++;
        if(numRoundsPlayed == 3){
            setTimeout(function(){
                popOutput.innerHTML = `<p>${determineWinner(p1GameScore,p2GameScore)}</p>`;},300);
        };
    };

});


// =======================================================
// ANIMATION
// =======================================================


const p1Image1 = document.getElementById("dice-image-1");
const p1Image2 = document.getElementById("dice-image-2");
const p2Image1 = document.getElementById("dice-image-3");
const p2Image2 = document.getElementById("dice-image-4");

let diceAnimationHandler;
const maxImageNumber = 6;
let currentImageNumber = 1;

const limit = 10;
let counter = 0;


function changeDiceImage(){

    counter++;
    if(counter > limit){

        cancelAnimationFrame(diceAnimationHandler);
    }else{
        if(currentImageNumber > maxImageNumber){
            currentImageNumber = 1;
        };

        p1Image1.setAttribute(`src`,`images/dice-${currentImageNumber}.png`);
        p1Image2.setAttribute(`src`,`images/dice-${currentImageNumber}.png`);
        p2Image1.setAttribute(`src`,`images/dice-${currentImageNumber}.png`);
        p2Image2.setAttribute(`src`,`images/dice-${currentImageNumber}.png`);

        currentImageNumber++;

        setTimeout (function(){
            diceAnimationHandler = requestAnimationFrame(changeDiceImage);
            p1Image1.setAttribute(`src`,`images/dice-${p1dice1.describeSelf()}.png`);
            p1Image2.setAttribute(`src`,`images/dice-${p1dice2.describeSelf()}.png`);
            p2Image1.setAttribute(`src`,`images/dice-${p2dice1.describeSelf()}.png`);
            p2Image2.setAttribute(`src`,`images/dice-${p2dice2.describeSelf()}.png`);
        }, 25);
    };

};


// =======================================================
// FUNCTIONS
// =======================================================

function calculateRoundScore(dice1, dice2){
    let roundScore;
    if(dice1 == 1 || dice2 == 1){
        roundScore = 0;
    }else if(dice1 === dice2){
        roundScore = ((+dice1 + +dice2)*2);
    }else{
        roundScore = (+dice1 + +dice2);
    };
    return roundScore;
};


function calculateTotalScore(totalScore,roundScore){    
    totalScore = +totalScore + +roundScore;    
    return totalScore;
};


function playGame(){
    // Player 1 rolls
    p1dice1.rollDice();
    p1dice2.rollDice();
    // Player 2 rolls
    p2dice1.rollDice();
    p2dice2.rollDice();
    // call function to calculate round score & total score
    // Player 1
    p1CurrentRoundScore = calculateRoundScore(p1dice1.describeSelf(),p1dice2.describeSelf());
    p1GameScore = calculateTotalScore(p1GameScore,p1CurrentRoundScore);
    // Player 2
    p2CurrentRoundScore = calculateRoundScore(p2dice1.describeSelf(),p2dice2.describeSelf());
    p2GameScore = calculateTotalScore(p2GameScore,p2CurrentRoundScore);
    // display scores
    p1RoundScore.innerHTML = `${p1CurrentRoundScore}`
    p1TotalScore.innerHTML = `${p1GameScore}`
    p2RoundScore.innerHTML = `${p2CurrentRoundScore}`
    p2TotalScore.innerHTML = `${p2GameScore}`
};


// Displays popup advising how player1 did
function determineWinner(p1TotalScore,p2TotalScore) {
    popup.style.opacity = "1";

    if (p1TotalScore > p2TotalScore){
        return `You win!`;
    }else if(p1TotalScore < p2TotalScore){
        return `You lost! Try again`;
    }else{
        return `It's a tie!`;
    };

};

function refreshGame(){
    // Re-initialize scores
    numRoundsPlayed = 0;
    p1CurrentRoundScore = 0;
    p1GameScore = 0;
    p2CurrentRoundScore = 0;
    p2GameScore = 0;
    // Remove scores from the display
    p1RoundScore.innerHTML = "";
    p1TotalScore.innerHTML = "";
    p2RoundScore.innerHTML = "";
    p2TotalScore.innerHTML = "";
    // Re-initialize dice images
    p1Image1.setAttribute(`src`,`images/dice-1.png`);
    p1Image2.setAttribute(`src`,`images/dice-1.png`);
    p2Image1.setAttribute(`src`,`images/dice-1.png`);
    p2Image2.setAttribute(`src`,`images/dice-1.png`);
};

function closePopup(){
    popup.style.opacity = "0";
};