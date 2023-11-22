// import { Dictionary } from "../src/logic/Dictionary";
const Dictionary = require('../src/logic/Dictionary');
// const Dictionary = require('../src/logic/Dictionary.js');


var dictHira = new Dictionary("hiragana");

dictHira.initialize();
dictHira.display();

const dicH = dictHira.getDictionary();
const dicHKeyArr = dictHira.getKeyArr();
var iterator = 0;


function decrement(){
    if(iterator-1 >= 0)
        iterator--;

    displayInfo();
    console.log(`--`);

}

function random(){
    var rngKey = dictHira.randomSelectKey();
    document.getElementById("characterImg").src = dicH[rngKey].imgSrc;
}

function increment(){
    if(iterator+1 <= dicHKeyArr.length-1)
        iterator++;

    displayInfo();
    console.log(`++`);
}

function displayInfo(iterator){
    document.getElementById("characterImg").src = dicH[dicHKeyArr[iterator]].imgSrc;
}

// document.getElementById("back").addEventListener("click", decrement);
// document.getElementById("random").addEventListener("click", random);
// document.getElementById("next").addEventListener("click", increment);




