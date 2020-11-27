const popOutput = document.getElementById('pop-out');



// =======================================================
// DICE OBJECT
// =======================================================

class Dice {

    constructor() {
        this.values = [1,2,3,4,5,6];
    }
    describeSelf(){
        return `Dice value ${this.values[0]}`;
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
    this.score = [];
}
Player.prototype.addToScore = function(score){
    this.score = score;
}
Player.prototype.describeSelf = function(){
    let description = `<p>${this.name}'s current dice roll is ${this.score}</p>`
    
    return description;
}

const player1 = new Player("Challenger");
player1.addToScore(p1dice1.rollDice());


// test
popOutput.innerHTML = `<p> Test results: ${player1.describeSelf()}</p>`;



// =======================================================
// EVENT LISTENERS
// =======================================================

const btnRollDice = document.getElementById("btn-roll");
const btnNewGame = document.getElementById("btn-new");

btnNewGame.addEventListener("click",function(){
    popOutput.innerHTML = `</p>You clicked New Game</p>`
})

btnRollDice.addEventListener("click",function(){
    popOutput.innerHTML = `</p>You clicked Roll Dice</p>`
})