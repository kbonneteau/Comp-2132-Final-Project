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
        return this.values;  

    }

};


const diceTest = new Dice();
diceTest.rollDice();
popOutput.innerHTML = `<p> Test results: ${diceTest.describeSelf()}</p>`;





