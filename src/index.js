import { Dictionary } from "./logic/Dictionary";


var dicHira = new Dictionary("hiragana");

dicHira.initialize();
dicHira.display();

// var characterImg = document.getElementById("character");
var dicH = dicHira.getDictionary();
// document.getElementById("character").src = dicH[dicHira.randomSelectKey()].imgSrc;

document.getElementById("characterImg").src = "../src/pictures/hiragana/chi-chi-h.png";


/*console.log(`//////////`);
let dicH = dicHira.getDictionary();
let rKeyH = dicHira.randomSelectKey();
console.log(`new Rng key select:${dicH[rKeyH].romaji}`);
*/

// console.log(dicHira.getKeyArr());
// console.log(dicKata.getKeyArr());

// dicHira.randomSelectKey();
// dicKata.randomSelectKey();


