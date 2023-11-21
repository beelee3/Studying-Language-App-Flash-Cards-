// import {Dictionary} from "./Dictionary.js";
const Dictionary = require('./Dictionary');


var dicHira = new Dictionary("hiragana");
var dicKata = new Dictionary("katakana");


dicHira.initialize();
dicHira.display();

dicKata.initialize();
dicKata.display();

console.log(dicKata.getKeyArr());
console.log(dicHira.getKeyArr());

dicKata.randomSelectKey();
dicHira.randomSelectKey();


console.log(`//////////`);
let dicH = dicHira.getDictionary();

console.log(`new Rng key select:${dicH[ dicHira.randomSelectKey()].romaji}`);

// dicHira.randomSelectKey();
// dicKata.randomSelectKey();


