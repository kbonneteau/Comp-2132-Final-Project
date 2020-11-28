// =======================================================
// OUTPUT VARIABLES
// =======================================================


const popOutput = document.getElementById('pop-out');
const p1RoundScore = document.getElementById("p1-round");
const p1TotalScore = document.getElementById("p1-total");
const p2RoundScore = document.getElementById("p2-round");
const p2TotalScore = document.getElementById("p2-total");


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
// Player.prototype.stateDice = function(){
//     return this.die;
// }
Player.prototype.addToScore = function(score){
    this.score = score;
}
Player.prototype.describeSelf = function(){
    let description = `<p>${this.name}'s current dice roll is ${this.die[0]} and ${this.die[1]}.<br>Current score: ${this.score}</p>`
    
    return description;
}
// Player.prototype.displayScore = function(){
//     return this.score;
// }


// Instantiate two players. Add dice to their possession.


const player1 = new Player("Challenger");
p1dice1.rollDice();
p1dice2.rollDice();
player1.addDice(p1dice1.describeSelf(),p1dice2.describeSelf());
player1.addToScore(calculateRoundScore(p1dice1.describeSelf(),p1dice2.describeSelf()));

const player2 = new Player("Opponent");
// p2dice1.rollDice();
// p2dice2.rollDice();
player2.addDice(p2dice1.describeSelf(),p2dice2.describeSelf());


// player1.addToScore(p1dice1.rollDice());


// test
popOutput.innerHTML = `<p> Test results: ${player1.describeSelf()}<br>${player2.describeSelf()}</p>`;








// =======================================================
// EVENT LISTENERS
// =======================================================

const btnRollDice = document.getElementById("btn-roll");
const btnNewGame = document.getElementById("btn-new");
let currentRoundScore;

btnNewGame.addEventListener("click",function(){
    popOutput.innerHTML = `</p>You clicked New Game</p>`
});

btnRollDice.addEventListener("click",function(){
    popOutput.innerHTML = `</p>You clicked Roll Dice</p>`
});






// =======================================================
// GAMEPLAY LOGIC
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



/*

function

math function for adding up calculateRoundScore 

if dice1 = 1 OR dice2 = 1
    then Score = 0
else if dice1 === dice2
    then Score = (dice1.value+dice2.value)*2
else (
    Score = dice1.value+dice2.value
)

return Score




currentRoundScore = calculateRoundScore();

*/